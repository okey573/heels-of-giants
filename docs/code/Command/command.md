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

#### 更新已经推送的 commit 信息

先执行下面的脚本

```shell
#!/bin/sh

git filter-branch -f --env-filter '

an="$GIT_AUTHOR_NAME"
am="$GIT_AUTHOR_EMAIL"
cn="$GIT_COMMITTER_NAME"
cm="$GIT_COMMITTER_EMAIL"


oldName="ruifeng.kuang"
oldEmail="ruifeng.kuang@vipshop.com"
newName="okey573"
newEmail="854647481@qq.com"

if [ "$GIT_COMMITTER_EMAIL" = "$oldEmail" ]
then
    cn="$newName"
    cm="$newEmail"
fi

if [ "$GIT_COMMITTER_NAME" -eq "$oldName" ]
then
    cn="$newName"
    cm="$newEmail"
fi


if [ "$GIT_AUTHOR_EMAIL" = "$oldEmail" ]
then
    an="$newName"
    am="$newEmail"
fi

if [ "$GIT_AUTHOR_NAME" -eq "$oldName" ]
then
    an="$newName"
    am="$newEmail"
fi

export GIT_AUTHOR_NAME="$an"
export GIT_AUTHOR_EMAIL="$am"
export GIT_COMMITTER_NAME="$cn"
export GIT_COMMITTER_EMAIL="$cm"
'
```

然后强制推送

```shell
git push --force --tags origin 'refs/heads/*'
```
