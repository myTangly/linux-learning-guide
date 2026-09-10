# 第 5 章：Terminal、Shell、命令与帮助

**建议学时：2 小时｜状态：Ubuntu Bash 命令可在本机复现**

## 学习目标

- 区分终端窗口与 Shell；
- 看懂命令、选项、参数、引号和退出码；
- 在求助前先阅读帮助。

## 概念图

~~~text
键盘输入 → Terminal → Shell 解析 → 程序运行 → 输出与退出码
~~~

Windows Terminal 是窗口；PowerShell 和 Bash 是解释命令的 Shell。同一终端可以开多个标签页，每个标签页使用不同 Shell。

## 命令结构

~~~text
command  options  arguments
ls       -la      ~/linux-learning-lab
~~~

在 **Ubuntu Bash**：

~~~bash
type ls
command -v ls
ls --help | head
man ls
~~~

按 <code>q</code> 退出 <code>man</code> 或 <code>less</code>。<code>type</code> 能告诉你名称是别名、内建命令还是可执行文件。

## 引号与变量

~~~bash
name="Linux learner"
printf 'literal: $name\n'
printf "expanded: $name\n"
printf '%s\n' "$name"
~~~

单引号通常保持字面值；双引号允许变量展开；引用 <code>"$name"</code> 可以避免空格被拆成多个参数。

## 退出码

~~~bash
test -d ~/linux-learning-lab
echo "$?"
test -d ~/definitely-missing
echo "$?"
~~~

约定上 0 表示成功，非 0 表示某种失败。命令没有输出不等于失败，必须结合退出码或实际结果。

## 历史与补全

- <code>Tab</code> 补全文件和命令；
- 上下方向键浏览历史；
- <code>history</code> 查看编号；
- <code>Ctrl+C</code> 请求停止当前前台命令；
- <code>Ctrl+D</code> 在空行发送文件结束，常用于退出 Shell。

## 实验：安全地观察失败

~~~bash
mkdir -p ~/linux-learning-lab/tmp
cd ~/linux-learning-lab/tmp
pwd
ls missing-file
printf 'exit=%s\n' "$?"
~~~

预期：<code>ls</code> 报文件不存在，退出码非 0。练习读错误信息，而不是看到红字就重装软件。

## 故障分支

- 命令不存在：用 <code>type</code> 和 <code>command -v</code> 判断是拼写、PATH 还是未安装。
- 引号未闭合：按 <code>Ctrl+C</code> 取消续行提示，重新输入。
- 手册无法打开：最小环境可能未安装 man pages，可先使用 <code>--help</code>。

## 自测

1. Windows Terminal 与 Bash 谁负责解释命令？
2. 为什么变量通常写成 <code>"$name"</code>？
3. 怎样判断一条“没有输出”的命令是否成功？

答案见[答案索引](answers.md#第-5-章)。

## 官方来源

[Microsoft：Linux with WSL](https://learn.microsoft.com/windows/wsl/tutorials/linux) · [Ubuntu 26.04：Bash 手册页](https://manpages.ubuntu.com/manpages/resolute/en/man1/bash.1.html)
