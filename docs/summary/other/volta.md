---
title: Volta
---

# Volta

> Volta，"无忧的JavaScript工具管理器"，是一个简化JavaScript环境管理的开源项目。

## 理解

- Volta 不光可以管理 node npm pnpm 这些包管理器，其他的二进制包也可以管理
- 当前执行目录下，如果没有明确指定，则会使用默认的 node 及其他包管理器版本（通过 PIN 命令来指定）
- 和使用 NVM 不用，切换 node 版本或 npm 版本之后，之前全局安装的包也可以继续使用。实际上在 Volta 里是不存在切换 node 或 npm 等包的版本这一概念

## 常用的命令

#### 查看当前已安装的包的版本

```bash
volta list node 
```

#### 查看所有已安装的包

```bash
volta list all 
```

#### 切换默认版本

```bash
# 其实就是重新安装一遍，安装时会设置成默认版本
volta install node@20.15.0 
```

#### 指定版本运行

```bash
# 还有其他参数，具体可以用 help 命令查看: volta run --help
volta run --node 10.16.0 node -v
```

## 参考链接

- [Volta](https://volta.sh/)
