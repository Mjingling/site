---
title: Python 文件读写
tags: [Python, IO]
lang: python
date: 2026-09-05
---

# Python 文件读写

## 逐行读取大文件 {#read-lines}

迭代文件对象，不会一次性读入内存：

```python
with open("big.txt", encoding="utf-8") as f:
    for line in f:
        process(line.rstrip("\n"))
```

## 安全写文件 {#write}

`pathlib` 一行搞定，自动处理编码：

```python
from pathlib import Path

Path("out.txt").write_text("hello", encoding="utf-8")
```

## pathlib 常用操作 {#pathlib}

```python
from pathlib import Path

p = Path("./data")
p.mkdir(parents=True, exist_ok=True)  # 递归建目录
list(p.glob("*.csv"))                 # 通配查找
Path("a/b/c.txt").resolve()           # 转绝对路径
```
