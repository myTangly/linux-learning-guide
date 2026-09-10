# 第 11 章：存储、挂载与 WSL 文件边界

**建议学时：2 小时｜状态：路径模型按 Microsoft Learn 核对**

## 学习目标

- 查看磁盘和挂载；
- 从 WSL 访问 Windows，从 Windows 访问 WSL；
- 根据工具所在系统选择项目存储位置。

## 概念图

~~~text
Windows NTFS（D:\） ⇄ /mnt/d      Linux 文件系统 ⇄ \\wsl$\Ubuntu
~~~

在 **Ubuntu Bash**：

~~~bash
df -h
findmnt
ls -ld /mnt/c
cd ~
explorer.exe .
~~~

WSL 通常把 Windows C 盘挂载为 <code>/mnt/c</code>。反过来，Windows 可通过 <code>\\wsl$\Ubuntu\home\用户名</code> 访问 Linux 文件。<code>explorer.exe .</code> 会让资源管理器打开当前 Linux 目录。

## 核心选择

- 主要使用 Linux 工具、Docker 和 WSL 智能体：项目放 <code>~/projects</code>。
- 主要使用 Windows 原生工具和 Codex Windows 原生智能体：项目放 Windows 文件系统，再从 WSL 通过 <code>/mnt/d/...</code> 访问。
- 不要把同一仓库在两个系统中各复制一份后同时修改；Git 历史、换行和权限会变得难以判断。

微软通常建议 Linux 命令行工具处理的项目放在 WSL 文件系统，以获得更好的性能并减少权限差异。OpenAI Docs 同时指出：若继续使用 Windows 原生 Codex 智能体，将项目放在 Windows 文件系统更可靠。两条建议并不冲突，关键是让**主要执行工具与文件处于同一系统**。

## 实验：比较路径身份

~~~bash
mkdir -p ~/projects/linux-learning-notes
cd ~/projects/linux-learning-notes
pwd
realpath .
stat -f -c '%T' .
stat -f -c '%T' /mnt/c
~~~

不要用一次简单计时得出绝对性能结论；本实验只观察它们属于不同文件系统。

预期结果：项目路径位于 Linux 主目录；项目目录与 <code>/mnt/c</code> 显示不同的文件系统类型，说明二者跨越 WSL 文件系统边界。

## 故障分支

- 资源管理器看不到发行版：先运行 <code>wsl --list --verbose</code> 并启动 Ubuntu。
- Linux 工具访问挂载盘很慢：评估迁到 <code>~/projects</code>，迁移前先备份。
- 同名文件大小写冲突：停止双向复制，用 Git 状态和明确命名规则整理。

## CRLF 与权限

Windows 常用 CRLF，Linux 常用 LF。脚本出现 <code>/usr/bin/env: bash\r</code> 时，先检查：

~~~bash
file script.sh
sed -n '1l' script.sh
~~~

不要用 chmod 掩盖换行问题。

## 自测

1. Linux 工具为主的项目为什么建议放 <code>~/projects</code>？
2. Windows 如何访问 Ubuntu 主目录？
3. Windows 原生 Codex 智能体与 WSL 智能体如何影响存储选择？

答案见[答案索引](answers.md#第-11-章)。

## 官方来源

[Microsoft：跨文件系统工作](https://learn.microsoft.com/windows/wsl/filesystems) · [Microsoft：WSL 开发环境](https://learn.microsoft.com/windows/wsl/setup/environment) · [OpenAI Docs：Windows app](https://learn.chatgpt.com/docs/windows/windows-app)
