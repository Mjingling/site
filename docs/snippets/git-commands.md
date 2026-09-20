---
title: Git 常用命令
tags: [Git, 命令行]
lang: shell
date: 2026-08-20
---

# Git 常用命令

## 撤销与回退 {#undo}

```bash
git restore <file>            # 丢弃工作区改动
git restore --staged <file>   # 取消暂存（保留工作区改动）
git reset --soft HEAD^        # 撤销上一次提交，改动保留在暂存区
```

## 分支操作 {#branch}

```bash
git switch -c feature/x          # 新建并切换分支
git branch -d feature/x          # 删除本地分支
git push origin --delete feature/x  # 删除远程分支
```

## 常用别名 {#alias}

```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.lg "log --oneline --graph --all"
```
