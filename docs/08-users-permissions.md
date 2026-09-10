# 第 8 章：用户、组、权限与 sudo

**建议学时：2 小时｜状态：本机可复现；不修改系统账号**

## 学习目标

- 读懂所有者、组和 rwx 权限；
- 在实验目录中使用 chmod；
- 判断何时真正需要 sudo。

## 概念图

~~~text
进程身份（用户/组） + 文件所有者 + rwx → 内核允许或拒绝
~~~

~~~bash
whoami
id
umask
cd ~/linux-learning-lab
printf '#!/usr/bin/env bash\necho hello\n' > tmp/hello.sh
ls -l tmp/hello.sh
chmod u+x tmp/hello.sh
ls -l tmp/hello.sh
./tmp/hello.sh
~~~

权限分成所有者（user）、组（group）和其他人（other）；每组可有读 <code>r</code>、写 <code>w</code>、执行 <code>x</code>。对目录来说，<code>x</code> 表示能够穿越目录，不只是“执行目录”。

## 符号写法优先

~~~bash
chmod u+x file
chmod go-w file
chmod u=rw,go=r file
~~~

新手先用符号写法，能清楚表达目的。数字写法中 4=读、2=写、1=执行；例如 644 是所有者读写、其他人只读。不要把 777 当作修复按钮。

## 所有权

~~~bash
stat tmp/hello.sh
ls -ld ~/linux-learning-lab
~~~

<code>chown</code> 通常需要 sudo，但本教材不要求改变系统目录所有权。若你曾用 sudo 创建项目文件，先确认目标，再用精确路径修复所有者，禁止递归指向宽泛目录。

## sudo 检查清单

执行前回答：

1. 命令为什么需要系统权限？
2. 精确修改哪个文件或服务？
3. 有没有普通用户目录内的替代方案？
4. 如何验证和恢复？

## 实验

创建 <code>tmp/private.txt</code>，设为仅自己读写（600），再用 <code>stat</code> 验证。不要修改 <code>/etc</code>。

预期所有者权限为读写，组和其他人没有权限。

## 故障分支

- chmod 后仍失败：检查父目录、挂载类型和文件所有者。
- 文件属于 root：查明它为何由 sudo 创建，只对精确实验路径修复。
- Windows 挂载盘权限异常：查 WSL 挂载文档，不用 777 强行绕过。

## 自测

1. 目录的执行权限表示什么？
2. 600 与 644 有何区别？
3. 为什么权限错误不应先运行 <code>chmod 777</code>？

答案见[答案索引](answers.md#第-8-章)。

## 官方来源

[Microsoft：WSL 文件权限](https://learn.microsoft.com/windows/wsl/file-permissions) · [Microsoft：WSL 开发环境](https://learn.microsoft.com/windows/wsl/setup/environment)
