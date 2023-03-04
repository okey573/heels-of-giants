---
title: 一些命令
outline: [2,6]
---

用到过但是不常用的命令

## shell

#### 获取时间戳

```shell
current=`date "+%Y-%m-%d %H:%M:%S"`
timeStamp=`date -d "$current" +%s`
currentTimeStamp=$((timeStamp*1000+10#`date "+%N"`/1000000)) #将current转换为时间戳，精确到毫秒
echo ${currentTimeStamp}
```

## git

#### 获取上一次的commit message

```shell
git log --pretty=format:"%s" -1
```

#### 导出单个文件或文件夹

```shell
git archive [--format=<fmt>] [--list] [--prefix=<prefix>/] [<extra>]
              [-o <file> | --output=<file>] [--worktree-attributes]
              [--remote=<repo> [--exec=<git-upload-archive>]] <tree-ish>
              [<path>...]
```
