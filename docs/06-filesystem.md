# 第 6 章：Linux 目录、文件与路径

**建议学时：2 小时｜状态：本机可复现**

## 学习目标

- 使用绝对路径、相对路径和主目录；
- 安全创建、复制、移动和删除实验文件；
- 理解 Linux 大小写敏感和“万物皆文件”的工作方式。

## 概念图：路径地图

| 路径 | 用途 |
|---|---|
| <code>/</code> | 文件系统根，不是 root 用户的主目录 |
| <code>/home/name</code> | 普通用户主目录 |
| <code>/etc</code> | 系统配置 |
| <code>/var</code> | 日志、缓存和变化数据 |
| <code>/tmp</code> | 临时数据，不能当永久存储 |
| <code>/mnt/c</code> | WSL 中看到的 Windows C 盘 |

在 **Ubuntu Bash**：

~~~bash
cd ~/linux-learning-lab
pwd
ls -lah
mkdir -p files/source files/archive
printf 'alpha\n' > files/source/a.txt
cp files/source/a.txt files/source/b.txt
mv files/source/b.txt files/archive/
find files -maxdepth 3 -type f -print
~~~

<code>.</code> 是当前目录，<code>..</code> 是上级，<code>~</code> 是当前用户主目录。Linux 通常区分 <code>Notes.md</code> 与 <code>notes.md</code>，Windows 工具未必如此，跨系统项目应统一命名规则。

## 安全删除

先确认精确目标，再删除：

~~~bash
cd ~/linux-learning-lab
realpath files/archive/b.txt
rm -- files/archive/b.txt
~~~

<code>--</code> 表示后续是路径，不再解释成选项。不要在 <code>~</code> 或 <code>/</code> 下练习 <code>rm -rf</code>；本教材不需要它。

## 实验：创建目录快照

~~~bash
cd ~/linux-learning-lab
find . -maxdepth 3 -printf '%y %p\n' | sort > notes/tree.txt
cat notes/tree.txt
~~~

预期结果：输出列出实验目录中的文件类型和相对路径，并生成 <code>notes/tree.txt</code>；若输出指向其他位置，先用 <code>pwd</code> 纠正目录。

## 故障分支

- <code>No such file or directory</code>：先 <code>pwd</code>，再逐段 <code>ls</code>。
- <code>Permission denied</code>：检查 <code>ls -ld PATH</code>，不要立即加 sudo。
- 文件名含空格：使用引号，如 <code>cd "My Notes"</code>。

## 自测

1. <code>/</code>、<code>/root</code> 和 <code>~</code> 有何区别？
2. 删除前为什么先运行 <code>realpath</code>？
3. 相对路径以什么为起点？

答案见[答案索引](answers.md#第-6-章)。

## 官方来源

[Microsoft：Linux with WSL](https://learn.microsoft.com/windows/wsl/tutorials/linux) · [Microsoft：跨 Windows/Linux 文件系统工作](https://learn.microsoft.com/windows/wsl/filesystems)
