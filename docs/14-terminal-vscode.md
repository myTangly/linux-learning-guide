# 第 14 章：Windows Terminal 与 VS Code WSL

**建议学时：2 小时｜状态：流程按 Microsoft Learn 核对**

## 学习目标

- 用 Windows Terminal 管理不同 Shell；
- 从 Ubuntu 打开 VS Code WSL 窗口；
- 判断编辑器、终端和项目真正运行在哪个系统。

## 概念图

~~~text
Windows VS Code UI ⇄ WSL 扩展/Server ⇄ Ubuntu 项目与终端
~~~

## Windows Terminal

建议为 PowerShell 和 Ubuntu 分别保留标签页，并在动手前运行：

~~~powershell
$PSVersionTable.PSVersion
~~~

~~~bash
echo "$WSL_DISTRO_NAME"
pwd
~~~

不要仅凭窗口颜色判断 Shell。

## VS Code 安装位置

VS Code 应安装在 Windows，而不是再次安装完整 Linux 桌面版。安装 Microsoft 的 WSL 扩展后，在 **Ubuntu Bash**：

~~~bash
mkdir -p ~/projects/linux-learning-notes
cd ~/projects/linux-learning-notes
code .
~~~

首次运行可能按需安装 VS Code Server。成功后，左下角应显示类似 <code>WSL: Ubuntu</code>；集成终端路径应为 <code>/home/...</code>。

## 三项核验

在 VS Code 集成的 **Ubuntu Bash**：

~~~bash
echo "$WSL_DISTRO_NAME"
pwd
command -v git
~~~

如果路径是 <code>C:\...</code> 或 PowerShell 提示符，当前窗口并未以 WSL 模式打开。使用命令面板的 “WSL: Reopen Folder in WSL”。

## 扩展安装位置

部分扩展运行在 Windows UI 侧，语言工具和终端相关扩展可能需安装到 WSL。VS Code 会显示 “Install in WSL” 提示。不要无差别在两侧重复安装。

## 实验

在 WSL 窗口创建 <code>where-am-i.txt</code>，写入 <code>pwd</code> 和 <code>uname -a</code> 的结果；再用 <code>explorer.exe .</code> 从 Windows 看到同一文件。

预期结果：VS Code 左下角显示 WSL/Ubuntu 环境，集成终端路径位于 Linux 主目录，并且资源管理器能看到同一个 <code>where-am-i.txt</code>。

## 故障分支

- <code>code: command not found</code>：从 Windows VS Code 安装 WSL 集成，重新打开终端。
- 扩展装了但不工作：确认它装在 Local 还是 WSL。
- 大项目很慢：确认项目不在 <code>/mnt/c</code>，并检查杀毒/索引等外部因素。

## 自测

1. 为什么 VS Code 主程序装在 Windows？
2. 怎样确认当前集成终端确实是 WSL？
3. 扩展为什么可能显示 Local 和 WSL 两个位置？

答案见[答案索引](answers.md#第-14-章)。

## 官方来源

[Microsoft：VS Code with WSL](https://learn.microsoft.com/windows/wsl/tutorials/wsl-vscode) · [VS Code：Remote Development with WSL](https://code.visualstudio.com/docs/remote/wsl)
