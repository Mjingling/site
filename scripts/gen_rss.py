#!/usr/bin/env python3
"""
RSS 生成脚本（零依赖，仅用 Python 标准库）

扫描 docs/ 下所有带 title 和 date frontmatter 的 Markdown 页面，
按日期倒序取最新 20 篇，生成 Atom 格式的 docs/public/feed.xml。

⚠️ 部署后请把下方「站点配置」改成你的真实信息。
"""
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from xml.sax.saxutils import escape

# ========== 站点配置（部署后请替换） ==========
SITE_URL = "https://mjingling.github.io/site"  # 站点完整地址，不带末尾斜杠；换仓库名/自定义域名时记得同步修改
SITE_TITLE = "小枫学幽默的小站"
SITE_AUTHOR = "小枫学幽默"
SITE_DESCRIPTION = "个人介绍、小工具、代码片段与捐赠"
MAX_ITEMS = 20
# ============================================

ROOT = Path(__file__).resolve().parent.parent
DOCS_DIR = ROOT / "docs"
OUT_FILE = DOCS_DIR / "public" / "feed.xml"


def parse_frontmatter(text):
    """解析 --- 包裹的 frontmatter，返回 dict（仅支持 key: value 一行式）。"""
    m = re.match(r"^---\r?\n(.*?)\r?\n---", text, re.DOTALL)
    if not m:
        return {}
    data = {}
    for line in m.group(1).splitlines():
        kv = re.match(r"^([A-Za-z_-]+):\s*(.*)$", line)
        if not kv:
            continue
        value = kv.group(2).strip()
        if len(value) >= 2 and value[0] == value[-1] and value[0] in "\"'":
            value = value[1:-1]
        data[kv.group(1)] = value
    return data


def strip_frontmatter(text):
    m = re.match(r"^---\r?\n.*?\r?\n---", text, re.DOTALL)
    return text[m.end():] if m else text


def first_paragraph(text):
    """取正文第一个非结构性段落，做轻度清洗后作为摘要。"""
    for block in re.split(r"\n\s*\n", strip_frontmatter(text)):
        stripped = block.strip()
        if not stripped or stripped.startswith(("#", "!", "<", "```", "---", "|", ">")):
            continue
        cleaned = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", stripped)  # 链接只留文字
        cleaned = re.sub(r"[*`]", "", cleaned)
        cleaned = " ".join(cleaned.split())
        if cleaned:
            return cleaned[:140]
    return ""


def page_url(md_path):
    """docs/index.md → SITE_URL；docs/snippets/foo.md → SITE_URL/snippets/foo.html"""
    rel = md_path.relative_to(DOCS_DIR).with_suffix(".html")
    if rel.name == "index.html":
        rel = rel.parent
        posix = rel.as_posix().strip("./")
        return f"{SITE_URL.rstrip('/')}/{posix}" if posix else SITE_URL
    return f"{SITE_URL.rstrip('/')}/{rel.as_posix()}"


def main():
    pages = []
    for md in sorted(DOCS_DIR.rglob("*.md")):
        if ".vitepress" in md.parts:
            continue
        text = md.read_text(encoding="utf-8")
        meta = parse_frontmatter(text)
        title, date = meta.get("title"), meta.get("date")
        if not title or not date:
            continue  # RSS 只收录同时带 title 和 date 的页面
        try:
            dt = datetime.strptime(date, "%Y-%m-%d").replace(tzinfo=timezone.utc)
        except ValueError:
            print(f"⚠️ 跳过 {md.relative_to(ROOT)}：date 不是 YYYY-MM-DD 格式（{date}）", file=sys.stderr)
            continue
        summary = meta.get("description") or first_paragraph(text)
        pages.append((dt, title, md, summary))

    pages.sort(key=lambda p: p[0], reverse=True)
    pages = pages[:MAX_ITEMS]
    updated = pages[0][0] if pages else datetime.now(timezone.utc)

    entries = []
    for dt, title, md, summary in pages:
        url = page_url(md)
        stamp = dt.strftime("%Y-%m-%dT%H:%M:%SZ")
        entries.append(
            "  <entry>\n"
            f"    <title>{escape(title)}</title>\n"
            f'    <link href="{escape(url)}"/>\n'
            f"    <id>{escape(url)}</id>\n"
            f"    <published>{stamp}</published>\n"
            f"    <updated>{stamp}</updated>\n"
            f'    <summary type="html">{escape(summary)}</summary>\n'
            "  </entry>"
        )

    feed = (
        '<?xml version="1.0" encoding="utf-8"?>\n'
        '<feed xmlns="http://www.w3.org/2005/Atom">\n'
        f"  <title>{escape(SITE_TITLE)}</title>\n"
        f"  <subtitle>{escape(SITE_DESCRIPTION)}</subtitle>\n"
        f"  <id>{escape(SITE_URL.rstrip('/') + '/')}</id>\n"
        f'  <link href="{escape(SITE_URL.rstrip("/") + "/")}"/>\n'
        f'  <link href="{escape(SITE_URL.rstrip("/") + "/feed.xml")}" rel="self"/>\n'
        f"  <updated>{updated.strftime('%Y-%m-%dT%H:%M:%SZ')}</updated>\n"
        f"  <author>\n    <name>{escape(SITE_AUTHOR)}</name>\n  </author>\n"
        + "\n".join(entries)
        + "\n</feed>\n"
    )

    OUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    OUT_FILE.write_text(feed, encoding="utf-8")
    print(f"✅ RSS 已生成：{OUT_FILE.relative_to(ROOT)}（{len(pages)} 篇）")


if __name__ == "__main__":
    main()
