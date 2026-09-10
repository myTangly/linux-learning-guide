# 第 1 章：先看懂五层关系

**建议学时：1.5 小时｜状态：概念经官方资料核对**

## 学习目标

- 区分 Linux、WSL、Ubuntu、Docker Desktop 和 Codex；
- 判断一条命令应在哪一层运行；
- 理解“安装成功”和“最终功能可用”不是一回事。

## 概念图

~~~text
物理电脑
└─ Windows 11：管理硬件、桌面应用与 WSL
   ├─ PowerShell：执行 wsl.exe 等 Windows 命令
   ├─ WSL 2：运行真实 Linux 内核的轻量环境
   │  └─ Ubuntu：Bash、APT、Linux 文件系统和工具
   │     └─ Docker CLI：请求 Docker 引擎创建容器
   ├─ Docker Desktop：提供并管理容器引擎
   └─ Codex：在授权范围内读文件、改文件、运行命令
~~~

Linux 是内核，不等同于 Ubuntu；Ubuntu 是围绕 Linux 内核组织的软件发行版。WSL 2 不是 Ubuntu，也不是传统双系统，它让 Windows 同时使用 Linux 环境。Docker 容器不是一台完整虚拟机：容器共享宿主 Linux 内核，却拥有隔离的进程、网络和文件视图。Codex 更不是“另一个 Linux”，它是使用这些环境和工具完成任务的智能体。

## 命令该放在哪里

| 需求 | 正确位置 | 示例 |
|---|---|---|
| 查看 WSL 发行版 | PowerShell | <code>wsl --list --verbose</code> |
| 更新 Ubuntu 包索引 | Ubuntu Bash | <code>sudo apt update</code> |
| 查看容器 | Ubuntu Bash | <code>docker container ls</code> |
| 在容器内部看系统 | 容器 Shell | <code>cat /etc/os-release</code> |
| 请智能体解释差异 | Codex 输入框 | “只解释当前改动，不修改文件” |

## 实验：识别四种提示符

在 **PowerShell**：

~~~powershell
Get-Location
wsl pwd
~~~

进入 **Ubuntu Bash**：

~~~bash
pwd
echo "$SHELL"
uname -s
~~~

预期：PowerShell 路径类似 <code>D:\...</code>；Ubuntu 路径以 <code>/</code> 开头；<code>uname -s</code> 输出 <code>Linux</code>。同一个窗口里能调用 WSL，不代表当前 Shell 已经变成 Bash。

## 故障分支

- <code>wsl</code> 找不到：停在 Windows/WSL 层，转第 3 章。
- <code>docker</code> 找不到：WSL 可能正常，只是 Docker Desktop 集成未启用，转第 17 章。
- Codex 能打开但不能写文件：先检查工作区和审批边界，不要先使用管理员权限。

## 自测

1. Ubuntu 与 WSL 2 的关系是什么？
2. 为什么“Docker Desktop 已启动”不能单独证明网站可访问？
3. <code>wsl --status</code> 应在哪个 Shell 执行？

答案见[答案索引](answers.md#第-1-章)。

## 官方来源

[Microsoft：什么是 WSL](https://learn.microsoft.com/training/modules/wsl-introduction/) · [Microsoft：Windows 容器概览](https://learn.microsoft.com/windows/dev-environment/docker/overview) · [OpenAI Docs：Codex quickstart](https://learn.chatgpt.com/docs/quickstart)

