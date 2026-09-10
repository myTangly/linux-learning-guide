# Linux、WSL、Docker Desktop 与 Codex 零基础联合教材

> 面向第一次接触 Linux 和容器的 Windows 11 用户。建议按顺序学习，总用时约 38–42 小时。

本教材把五个容易混淆的概念放进同一条工作流：

<code>Windows 11（主机） → WSL 2（Linux 运行层） → Ubuntu（发行版） → Docker Desktop（容器平台） → Codex（协作智能体）</code>

最终成果是一个运行在 Docker 中的静态学习笔记站。你会亲手完成环境核验、Linux 文件操作、Git 版本记录、镜像构建、Compose 启停、日志排错和 Codex 协作审阅。

## HTML 版入口

完成本地构建后，直接打开 <code>dist/index.html</code> 即可离线阅读。HTML 页面只展示文字、链接和可复制的命令，不会执行安装、系统设置或 Docker 操作。

在线版入口：[立即阅读](https://linux.tangmy.top)

> 在线版首次发布日期为 2026-09-10。软件版本、安装界面和官方命令可能继续变化；执行安装前请同时查看每章末尾的官方来源与核对日期。

## 使用方法

1. 先阅读[学习地图](docs/course-map.md)，完成第 1–4 章的环境核验。
2. 每章至少完成一个实验和自测，不要只复制命令。
3. 严格确认命令框标题：**PowerShell**、**Ubuntu Bash**、**容器 Shell**或**Codex 输入框**。
4. 所有练习文件放在 <code>~/linux-learning-lab</code> 或综合项目目录，不要在真实个人目录中练习删除和权限修改。
5. 遇到问题先查[故障索引](docs/troubleshooting.md)，再对照“预期输出”定位停在哪一层。

## 快速诊断

在 **PowerShell** 中运行：

~~~powershell
winver
wsl --version
wsl --status
wsl --list --verbose
~~~

在 **Ubuntu Bash** 中运行：

~~~bash
cat /etc/os-release
uname -r
pwd
whoami
docker version
~~~

成功标准：

- Windows 11 正常运行且硬件虚拟化可用；
- Ubuntu 的 WSL 版本为 2；
- Linux 内核信息可读取；
- Docker 同时显示 Client 和 Server；
- 你能解释当前提示符属于 PowerShell 还是 Ubuntu。

## 章节导航

| 章 | 主题 | 建议学时 |
|---|---|---:|
| [01](docs/01-five-layers.md) | 五层关系与边界 | 1.5 |
| [02](docs/02-windows-readiness.md) | Windows 与虚拟化准备 | 1.5 |
| [03](docs/03-wsl2.md) | 安装或核验 WSL 2 | 2 |
| [04](docs/04-ubuntu-first-run.md) | Ubuntu 初始化与更新 | 2 |
| [05](docs/05-shell-basics.md) | Terminal、Shell 与帮助 | 2 |
| [06](docs/06-filesystem.md) | 目录、文件与路径 | 2 |
| [07](docs/07-text-pipes.md) | 文本、查找、管道与重定向 | 2 |
| [08](docs/08-users-permissions.md) | 用户、组、权限与 sudo | 2 |
| [09](docs/09-packages-environment.md) | APT、环境变量与归档 | 2 |
| [10](docs/10-processes-services.md) | 进程、任务、日志与服务 | 2 |
| [11](docs/11-storage-wsl-files.md) | 存储、挂载与跨系统文件 | 2 |
| [12](docs/12-networking.md) | 网络、DNS、端口与 HTTP | 2 |
| [13](docs/13-bash-scripting.md) | Bash 脚本与自动化 | 2 |
| [14](docs/14-terminal-vscode.md) | Windows Terminal 与 VS Code WSL | 2 |
| [15](docs/15-git.md) | Git 基础与恢复意识 | 2 |
| [16](docs/16-containers-concepts.md) | 容器核心概念 | 1.5 |
| [17](docs/17-docker-desktop.md) | Docker Desktop 与 WSL Integration | 2 |
| [18](docs/18-docker-operations.md) | 容器生命周期、卷、网络与日志 | 2.5 |
| [19](docs/19-dockerfile-compose.md) | Dockerfile、Compose 与安全 | 3 |
| [20](docs/20-codex-capstone.md) | Codex 协作与综合项目 | 4 |

## 配套资料

- [命令速查表](docs/cheatsheet.md)
- [术语表](docs/glossary.md)
- [故障索引](docs/troubleshooting.md)
- [自测答案](docs/answers.md)
- [来源台账](docs/sources.md)
- [验证报告](docs/validation.md)
- [综合实验](labs/notes-site/README.md)
- [外部操作记录](docs/operations.md)
- [综合项目](labs/notes-site/README.md)

## 验证状态

- **本机只读实测**：Windows 11 家庭版 24H2 Build 26100、WSL 2.7.13、Ubuntu 26.04.1 LTS、Docker Desktop 4.89.0、Docker Engine 29.7.2、Docker Compose 5.5.0、VS Code 1.137.0、Codex 桌面版 26.903.8094.0。
- **官方资料核对**：全新安装、CLI 安装和故障分支根据 2026-09-10 可访问的 Microsoft Learn、Docker Docs 与 OpenAI Docs 编写。
- **未声称完成**：没有重装或重置 WSL/Ubuntu；没有替用户安装 Codex CLI；没有为了验证而创建、拉取或删除 Docker 资源。
