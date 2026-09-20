---
title: Docker 常用命令
tags: [Docker, 命令行]
lang: shell
date: 2026-08-12
---

# Docker 常用命令

## 清理空间 {#cleanup}

```bash
docker system df          # 查看磁盘占用
docker system prune -a    # 清理所有无用镜像/容器/网络
```

## 进入容器与看日志 {#exec}

```bash
docker exec -it <container> sh
docker logs -f --tail 100 <container>
```

## 导出与导入镜像 {#save}

```bash
docker save -o app.tar myimage:latest
docker load -i app.tar
```
