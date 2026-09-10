# 第 4 章：Ubuntu 初始化、用户与更新

**建议学时：2 小时｜状态：命令只读部分本机实测**

## 学习目标

- 完成 Ubuntu 首次启动；
- 理解 Linux 用户、密码盲输和 sudo；
- 正确更新包索引与已安装软件。

## 概念图

~~~text
Ubuntu 首启 → Linux 用户/主目录 → APT 更新 → 普通用户日常工作
~~~

## 首次启动

从开始菜单打开 Ubuntu。首次启动会解压文件并要求创建 Linux 用户名和密码。该账号独立于 Windows 账号；输入密码时屏幕不会显示星号或字符，这是正常的“盲输”。

进入 **Ubuntu Bash** 后：

~~~bash
whoami
id
echo "$HOME"
pwd
cat /etc/os-release
~~~

预期：<code>whoami</code> 是你创建的 Linux 用户；主目录类似 <code>/home/name</code>。

## 更新 Ubuntu

~~~bash
sudo apt update
sudo apt upgrade
~~~

第一条刷新“有哪些版本可用”的索引；第二条升级已安装包。先阅读变更清单，再确认。Windows Update 不会替你升级 Ubuntu 包。

## sudo 的正确心态

<code>sudo</code> 只应放在确实需要系统权限的命令前。创建自己主目录中的文件不需要 sudo：

~~~bash
mkdir -p ~/linux-learning-lab
touch ~/linux-learning-lab/hello.txt
~~~

如果普通操作频繁提示权限不足，先查看 <code>ls -ld</code> 和所有者，不要用 <code>sudo</code> 掩盖错误路径。

## 忘记密码

在 **PowerShell** 中以 root 进入目标发行版：

~~~powershell
wsl -d Ubuntu -u root
~~~

随后在该 **Ubuntu root Shell** 中：

~~~bash
passwd YOUR_LINUX_USERNAME
exit
~~~

替换用户名，设置新密码。不要使用 <code>wsl --unregister</code>：注销会删除该发行版的数据。

## 实验：建立安全练习区

~~~bash
mkdir -p ~/linux-learning-lab/{notes,tmp,backup}
printf 'started=%s\n' "$(date -Iseconds)" > ~/linux-learning-lab/notes/progress.txt
ls -la ~/linux-learning-lab
cat ~/linux-learning-lab/notes/progress.txt
~~~

预期看到三个子目录和包含时间的进度文件。这证明当前用户能写入自己的主目录，不证明系统包已经全部升级。

## 故障分支

- sudo 密码反复失败：确认输入的是 Linux 用户密码，并注意盲输。
- APT 被锁定：先确认是否有正常更新进程，不删除不理解的锁文件。
- 创建文件权限不足：运行 <code>pwd</code>、<code>whoami</code>、<code>ls -ld</code> 检查是否误入系统目录。

## 自测

1. Ubuntu 密码输入时为什么看不到字符？
2. <code>apt update</code> 与 <code>apt upgrade</code> 各做什么？
3. 忘记密码时最危险的错误操作是什么？

答案见[答案索引](answers.md#第-4-章)。

## 官方来源

[Microsoft：设置 WSL 开发环境](https://learn.microsoft.com/windows/wsl/setup/environment) · [Microsoft：Linux with WSL](https://learn.microsoft.com/windows/wsl/tutorials/linux)
