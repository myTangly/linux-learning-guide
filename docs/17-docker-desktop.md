# 第 17 章：Docker Desktop 与 WSL Integration

**建议学时：2 小时｜状态：本机引擎只读实测；安装界面按官方文档核对**

## 学习目标

- 安装或核验 Docker Desktop；
- 确认使用 WSL 2 Linux 引擎；
- 让目标 Ubuntu 发行版使用 docker CLI。

## 概念图

~~~text
Ubuntu docker CLI → WSL Integration → Docker Desktop Linux Engine → 容器
~~~

## 安装路线

从 Docker 官方 Windows 安装页下载安装器，安装时选择 WSL 2 后端。组织或商业环境先核对 Docker Desktop 许可条款。安装器、管理员权限、重启和服务启动都会改变系统，本教材不自动执行。

## 核验路线

1. 打开 Docker Desktop，等待界面显示引擎正在运行。
2. Settings → General：确认使用 WSL 2 based engine。
3. Settings → Resources → WSL Integration：启用默认发行版或明确选择 Ubuntu。
4. Apply/Restart 后在 **Ubuntu Bash**：

~~~bash
command -v docker
docker version
docker info --format 'Server={{.ServerVersion}} Driver={{.Driver}} OSType={{.OSType}}'
docker context show
~~~

成功必须同时看到客户端和服务端。仅有 <code>docker --version</code> 只证明客户端文件存在。

## 本机基准

2026-09-10 只读核验：Ubuntu 中 <code>/usr/bin/docker</code> 可用；客户端与服务端均为 29.7.2；Compose 为 5.5.0；Server Driver 为 overlayfs，OSType 为 linux；context 为 default。本机 Windows 11 家庭版按 Linux containers + WSL 2 backend 路线工作。

## 实验

依次运行 <code>command -v docker</code>、<code>docker version</code> 和格式化的 <code>docker info</code>。预期同时得到 Client/Server 和 linux OSType；不要在本实验中拉取镜像。

## 故障分支

- <code>docker: command not found</code>：先检查目标发行版的 WSL Integration。
- <code>Cannot connect to the Docker daemon</code>：客户端存在，但引擎未就绪或集成断开。
- 只有 Client 无 Server：不是完整成功。
- Docker Desktop 无法启动：依次检查 WSL 2、虚拟化、版本要求和诊断日志，不直接重置数据。
- 公司代理拉取失败：核对 Docker Desktop 代理设置和组织证书策略。

## 关于 wslc

Microsoft 新版 WSL 文档包含内置 Linux 容器支持与 <code>wslc</code> 路线。本教材按用户目标使用 Docker Desktop；不要在同一实验中混用两套 CLI 和生命周期。

## 自测

1. <code>docker --version</code> 为什么不足以证明引擎可用？
2. WSL Integration 应对哪个发行版启用？
3. Docker 启动失败时为什么不先点“恢复出厂设置”？

答案见[答案索引](answers.md#第-17-章)。

## 官方来源

[Microsoft：Docker remote containers on WSL 2](https://learn.microsoft.com/windows/wsl/tutorials/wsl-containers) · [Docker：安装 Windows Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) · [Docker：WSL 2 backend](https://docs.docker.com/desktop/features/wsl/)
