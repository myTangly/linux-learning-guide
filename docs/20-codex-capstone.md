# 第 20 章：Codex 协作与容器化学习笔记站

**建议学时：4 小时｜状态：Codex 内容按 2026-09-10 OpenAI Docs 核对**

## 学习目标

- 选择 Windows 原生或 WSL 智能体路线；
- 用清晰任务、AGENTS.md、审批和差异审阅控制 Codex；
- 完成学习笔记站的构建、验证与交付。

## 概念图

~~~text
用户目标 → Codex 计划 → 审批边界 → 文件差异 → 静态检查 → Docker/HTTP → 人工验收
~~~

## 先选执行环境

| 路线 | 项目位置 | 适合场景 |
|---|---|---|
| Windows 原生智能体 | Windows 文件系统 | 主要使用 PowerShell/Windows 工具 |
| WSL 智能体 | <code>~/projects</code> | 主要使用 Linux、Docker 和 WSL 工具 |
| WSL 内 Codex CLI | <code>~/projects</code> | 终端优先工作流 |

本综合项目采用 WSL 路线。Codex 桌面版中把 Agent environment 改为 WSL 后需要重启应用；集成终端选择与智能体环境是两项独立设置。

## 打开项目

在文件选择器输入 <code>\\wsl$\</code>，进入 Ubuntu 的 <code>home/用户名/projects/linux-learning-notes</code>。或者在 **Ubuntu Bash** 中用 <code>code .</code> 打开 WSL 窗口。

如果桌面版保持 Windows 原生智能体，OpenAI Docs 建议把项目放 Windows 文件系统。不要一边把智能体留在 Windows，一边假设所有命令都在 Linux 中运行。

## CLI 可选路线

官方当前提供的 **Ubuntu Bash** 安装方式为：

~~~bash
curl -fsSL https://chatgpt.com/codex/install.sh | sh
codex
~~~

安装脚本会下载并写入 WSL 用户环境，执行前应重新核对 OpenAI Docs 并取得外部写入授权。本机尚未安装 Codex CLI，所以本教材不宣称已实测安装。

Windows 桌面版与 WSL CLI 默认使用各自主目录，不自动共享配置、缓存身份验证和会话。新手建议先保持隔离，不要为了省一次登录而同步整个 <code>.codex</code>。

## 高质量任务格式

在 **Codex 输入框**：

~~~codex
目标：修改学习笔记站首页，增加“我学会了什么”区域。
范围：只修改 site/index.html 和 site/styles.css。
约束：保留现有中文内容；不新增依赖；不改变 8080 端口。
验证：先说明计划，修改后展示 git diff，并运行静态检查。
权限：不要安装软件、拉取镜像或启动容器；这些步骤由我确认后执行。
~~~

把“只读分析”和“实施修改”分开。Codex 接受任务、创建文件或运行进程都不是最终成功；必须检查差异、命令退出码和用户可见结果。

## AGENTS.md

项目自带规则要求：

- 中文、UTF-8；
- 只修改项目内明确文件；
- 禁止加入凭据；
- Docker 外部状态操作前提示；
- 修改后运行规定验证；
- 区分静态检查、容器运行和浏览器结果。

规则能减少歧义，但不能代替人工审阅。

## 审批与沙盒

Codex 的沙盒限制命令技术上能访问什么；审批策略决定何时暂停请求同意。默认工作区写入并不意味着可以修改注册表、安装系统软件或访问所有网络。遇到审批时检查：精确命令、目标路径、外部影响、必要性和恢复方式。

不要使用绕过沙盒与审批的危险模式完成本课程。

## 综合验收

复制或克隆[配套项目](../labs/notes-site/README.md)到 <code>~/projects/linux-learning-notes</code> 后：

~~~bash
git status
docker compose config
docker compose build
docker compose up -d
docker compose ps
curl --fail http://localhost:8080/
docker compose logs --tail 100
docker compose down
~~~

浏览器访问 <code>http://localhost:8080</code>，确认标题和三张知识卡可见。随后让 Codex 做一次受限内容修改，审阅 <code>git diff</code>，重新构建并验证变化。

## 实验

完成一次“只读解释”和一次“限定两文件修改”的 Codex 任务。预期前者不产生差异，后者仅出现预期文件；容器验收必须同时具备 healthy、HTTP 成功和浏览器内容正确。

## 故障分支

- Codex 在错误 Shell 执行：检查 Agent environment 与 Integrated terminal，它们是独立设置。
- 请求修改了范围外文件：停止、审阅 diff，保留用户已有改动并要求按范围修正。
- CLI 与桌面历史不同：这是默认隔离，不要直接复制整个状态目录。
- Codex 说完成但页面未变：沿静态文件、镜像、容器、HTTP、浏览器顺序验证。

## 毕业标准

- 能解释五层关系和项目所在系统；
- 能在正确 Shell 中运行命令；
- 能定位 WSL、Docker 引擎、容器或 HTTP 哪一层失败；
- 能读 Dockerfile/Compose 和 Git diff；
- 能约束 Codex 的范围、审批动作并验证真实结果。

## 自测

1. Codex 沙盒与审批各解决什么问题？
2. WSL CLI 与 Windows 桌面版默认共享会话吗？
3. Codex 输出“完成”后还需哪些证据？

答案见[答案索引](answers.md#第-20-章)。

## 官方来源

[OpenAI Docs：Windows app](https://learn.chatgpt.com/docs/windows/windows-app) · [OpenAI Docs：WSL](https://learn.chatgpt.com/docs/windows/wsl) · [OpenAI Docs：审批与安全](https://learn.chatgpt.com/docs/agent-approvals-security) · [OpenAI Docs：AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
