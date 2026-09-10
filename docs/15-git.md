# 第 15 章：Git 基础、差异与恢复意识

**建议学时：2 小时｜状态：命令按本地独立仓库设计**

## 学习目标

- 初始化仓库并配置身份；
- 理解工作区、暂存区和提交；
- 在恢复前先查看差异和状态。

## 概念图

~~~text
工作区 → git add → 暂存区 → git commit → 本地历史
~~~

## 初始化

在 **Ubuntu Bash** 的综合项目目录：

~~~bash
cd ~/projects/linux-learning-notes
git init
git status
git config user.name "Your Name"
git config user.email "you@example.invalid"
~~~

使用示例域名不会发送邮件。若你要公开提交，填写愿意公开的身份。

## 三个区域

~~~text
工作区 --git add--> 暂存区 --git commit--> 历史
~~~

~~~bash
git status
git diff
git add README.md
git diff --staged
git commit -m "docs: add project introduction"
git log --oneline --decorate -5
~~~

提交前先看 <code>git diff --staged</code>。提交成功不证明应用运行，仍需功能验证。

## 安全恢复

~~~bash
git restore --staged FILE
git restore FILE
~~~

第一条取消暂存，保留工作区内容；第二条丢弃未提交的文件修改。执行第二条前必须确认差异。不要把 <code>git reset --hard</code> 或 <code>git clean -fd</code> 当作普通清理命令。

## .gitignore

忽略可重建产物，不忽略重要源文件：

~~~gitignore
.DS_Store
*.log
.env
~~~

真正的密钥即使被忽略也不应长期明文保存。若密钥已提交，删除文件不能撤销泄露，必须轮换密钥。

## 实验

完成两次小提交：第一次加入说明，第二次修改标题。使用 <code>git show --stat</code> 和 <code>git diff HEAD~1</code> 比较，不回滚。

预期结果：<code>git log --oneline</code> 至少显示两次提交，<code>git diff HEAD~1</code> 只展示第二次练习中预期的变化。

## 故障分支

- Git 不知道身份：只在当前仓库配置教学身份，避免无意修改全局配置。
- add 了错误文件：用 <code>git restore --staged</code> 取消暂存并保留内容。
- 准备丢弃改动：先保存 status 和 diff，确认没有他人工作。

## 自测

1. <code>git diff</code> 和 <code>git diff --staged</code> 看哪里？
2. 为什么恢复前先查看 status/diff？
3. Git 提交成功是否等于网站功能成功？

答案见[答案索引](answers.md#第-15-章)。

## 官方来源

[Microsoft：Git on WSL](https://learn.microsoft.com/windows/wsl/tutorials/wsl-git) · [Git 官方教程](https://git-scm.com/docs/gittutorial)
