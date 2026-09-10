# 第 2 章：Windows 11 与虚拟化准备

**建议学时：1.5 小时｜状态：本机只读实测 + 安装流程静态核对**

## 学习目标

- 核对 Windows 版本、架构、内存和虚拟化；
- 知道哪些步骤需要管理员权限或重启；
- 在安装前区分“缺少条件”和“组件损坏”。

## 概念图

~~~text
硬件虚拟化 → Windows 可选组件/WSL → Linux 内核 → Ubuntu
~~~

## 最低准备

微软当前的一键安装流程适用于 Windows 10 2004（Build 19041）及以上或 Windows 11；本教材主流程使用 Windows 11。Docker Desktop 还会受处理器架构、虚拟化、组织策略和许可条款影响，安装前必须查看 Docker 官方系统要求。本机为 Windows 11 家庭版，按 Docker 官方说明只使用 Linux 容器，不教授 Windows 容器。

在 **PowerShell**：

~~~powershell
winver
Get-ComputerInfo | Select-Object WindowsProductName, WindowsVersion, OsBuildNumber, OsArchitecture
Get-CimInstance Win32_ComputerSystem |
  Select-Object Manufacturer, Model, HypervisorPresent, TotalPhysicalMemory
~~~

预期：64 位 Windows 11；<code>HypervisorPresent</code> 为 <code>True</code>，或任务管理器“性能 → CPU”显示虚拟化已启用。

## 四类前置条件

1. **系统**：受支持的 Windows，能够正常更新。
2. **固件**：CPU 虚拟化在 BIOS/UEFI 中开启。
3. **资源**：为 Ubuntu、镜像和容器预留充足磁盘；建议初学阶段至少保留 20 GB 空闲空间。
4. **权限与网络**：能够执行一次管理员安装、重启，并访问 Microsoft Store/官方安装源。

不要因为 <code>HypervisorPresent=False</code> 就直接修改 BIOS。先确认机型说明、BitLocker 恢复密钥与组织管理策略；固件改动属于本教材之外的高影响操作。

## 实验：制作准备清单

在学习笔记中记录：

~~~text
Windows 版本：
Build：
CPU 架构：
虚拟化状态：
系统盘可用空间：
是否有管理员权限：
是否允许重启：
网络是否受代理/校园网/公司策略控制：
~~~

## 本机基准

2026-09-10 只读核验：Windows 11 家庭中文版、Build 26100、64 位、31.4 GB 内存、HypervisorPresent=True。它证明本机满足当前运行条件，不代表所有读者都必须拥有相同硬件。

## 故障分支

- 版本过旧：先走 Windows Update；不要套用本文命令强行绕过要求。
- 虚拟化不可用：查设备厂商和组织管理员，不盲改固件。
- 公司设备禁止 Store 或安装器：使用微软文档的离线/企业路径，并取得管理员许可。

## 自测

1. 哪些信息能在不修改系统的情况下提前核对？
2. 为什么安装 WSL 前要确认可重启？
3. 虚拟化不可用时为什么不应直接照抄 BIOS 操作？

答案见[答案索引](answers.md#第-2-章)。

## 官方来源

[Microsoft：安装 WSL](https://learn.microsoft.com/windows/wsl/install) · [Docker：Windows 安装要求](https://docs.docker.com/desktop/setup/install/windows-install/)
