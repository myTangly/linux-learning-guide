# 第 9 章：APT、环境变量、归档与压缩

**建议学时：2 小时｜状态：查询命令可复现；不替用户安装软件**

## 学习目标

- 理解软件源、索引、包和升级；
- 临时设置与查看环境变量；
- 创建并验证 tar.gz 归档。

## 概念图

~~~text
软件源 → apt update 索引 → apt install 包 → 可执行文件进入 PATH
~~~

## APT 四步法

~~~bash
sudo apt update
apt search PACKAGE_NAME
apt show PACKAGE_NAME
sudo apt install PACKAGE_NAME
~~~

先更新索引、搜索并查看包，再安装。删除时区分 <code>remove</code> 与 <code>purge</code>；不要为了“清理”盲目执行自动删除。查询已安装包无需 sudo：

~~~bash
apt list --installed 2>/dev/null | less
dpkg -l | head
~~~

## 环境变量与 PATH

~~~bash
printenv HOME
printf '%s\n' "$PATH" | tr ':' '\n'
export COURSE_NAME="Linux Basics"
printf '%s\n' "$COURSE_NAME"
command -v git
type -a git
~~~

<code>export</code> 只影响当前 Shell 及其子进程。写入 <code>~/.bashrc</code> 才会持久化，但修改前应备份并理解内容。本章不做持久修改。

## 归档

~~~bash
cd ~/linux-learning-lab
tar -czf backup/notes.tar.gz notes
tar -tzf backup/notes.tar.gz
mkdir -p tmp/restore
tar -xzf backup/notes.tar.gz -C tmp/restore
diff -r notes tmp/restore/notes
~~~

先用 <code>tar -t</code> 查看内容，再解压到空的专用目录，避免覆盖现有文件。

## 实验

创建 notes 归档、列出内容、恢复到 <code>tmp/restore</code>，再用 <code>diff -r</code> 比较。预期 diff 无输出且退出码为 0，说明内容一致；它不证明归档可在所有系统版本恢复。

## 故障分支

- <code>Unable to locate package</code>：核对拼写和 <code>apt update</code>，不要下载陌生脚本替代。
- 命令装了却找不到：用 <code>command -v</code>、<code>type -a</code> 和 PATH 定位。
- 解压覆盖风险：永远先列出归档并指定空目标目录。

## 自测

1. 为什么安装前先运行 <code>apt update</code>？
2. 当前 Shell 的 export 会永久保存吗？
3. 解压未知归档前应做什么？

答案见[答案索引](answers.md#第-9-章)。

## 官方来源

[Microsoft：Linux with WSL](https://learn.microsoft.com/windows/wsl/tutorials/linux) · [Ubuntu：软件包管理](https://documentation.ubuntu.com/server/how-to/software/package-management/)
