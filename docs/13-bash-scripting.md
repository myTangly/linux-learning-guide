# 第 13 章：Bash 脚本与可重复自动化

**建议学时：2 小时｜状态：脚本为工作区实验，不修改系统**

## 学习目标

- 编写带参数、退出码和严格模式的简单脚本；
- 让检查可重复；
- 避免脚本对未知路径执行破坏操作。

## 概念图

~~~text
参数 → 输入验证 → 命令序列 → 退出码 → 可重复验收
~~~

## 第一个检查脚本

在 **Ubuntu Bash**：

~~~bash
cd ~/linux-learning-lab
cat > tmp/check-lab.sh <<'SCRIPT'
#!/usr/bin/env bash
set -euo pipefail

lab_dir="$HOME/linux-learning-lab"
if [ "$#" -gt 0 ]; then
  lab_dir="$1"
fi
printf 'user=%s\n' "$(whoami)"
printf 'directory=%s\n' "$lab_dir"
test -d "$lab_dir"
test -w "$lab_dir"
printf 'status=ready\n'
SCRIPT
chmod u+x tmp/check-lab.sh
./tmp/check-lab.sh
~~~

<code>set -euo pipefail</code> 能让常见失败更早暴露，但不是魔法：条件判断、管道和预期失败仍需明确处理。

## 参数与验证

~~~bash
./tmp/check-lab.sh "$HOME/linux-learning-lab"
./tmp/check-lab.sh /definitely-missing
printf 'exit=%s\n' "$?"
~~~

始终引用路径变量。任何删除脚本都应解析绝对路径、验证它位于专用实验目录，并先提供预览；本课程不编写递归清理脚本。

## shellcheck 思维

即使未安装 ShellCheck，也要人工检查：

- 变量是否加双引号；
- 命令失败是否被发现；
- 输入路径是否验证；
- 临时文件是否使用专用目录；
- 是否输出足够的成功/失败信息。

## 实验

扩展脚本，使其检查 <code>git</code> 和 <code>docker</code> 是否在 PATH 中，但不要安装它们：

~~~bash
command -v git >/dev/null || { echo 'git missing' >&2; exit 1; }
command -v docker >/dev/null || { echo 'docker missing' >&2; exit 1; }
~~~

预期两个工具存在时脚本继续，否则给出明确错误并非 0 退出。

## 故障分支

- Permission denied：确认执行位或使用 <code>bash script.sh</code>。
- 出现 <code>bash\r</code>：转换为 LF，不是 chmod 问题。
- 严格模式意外退出：用 <code>bash -x</code> 在实验脚本中跟踪失败行。

## 自测

1. 为什么路径变量要加双引号？
2. 脚本应怎样报告“工具不存在”？
3. 严格模式能否替代输入验证？

答案见[答案索引](answers.md#第-13-章)。

## 官方来源

[Ubuntu 26.04：Bash 手册页](https://manpages.ubuntu.com/manpages/resolute/en/man1/bash.1.html) · [Microsoft：Linux with WSL](https://learn.microsoft.com/windows/wsl/tutorials/linux)
