# 故障索引

先判断失败层，再做最小改动。保留完整命令、错误文本、时间和已经尝试的步骤。

## 一页诊断顺序

~~~text
Windows/虚拟化
  ↓
WSL 应用与 WSL 2
  ↓
Ubuntu 用户空间与网络
  ↓
Docker Desktop 引擎和发行版集成
  ↓
镜像/容器/Compose
  ↓
容器内部应用
  ↓
主机端口与浏览器内容
  ↓
Codex 的工作区、沙盒与审批
~~~

## 命令输错 Shell

**现象**：PowerShell 报找不到 <code>sudo</code>，Bash 报找不到 <code>Get-Location</code>。

**检查**：

~~~powershell
$PSVersionTable.PSVersion
~~~

~~~bash
echo "$SHELL"
echo "$WSL_DISTRO_NAME"
~~~

**处理**：切换正确标签页；在 PowerShell 用 <code>wsl COMMAND</code> 临时调用 Linux 命令。

## WSL 安装停在 0.0% 或显示帮助

**检查**：

~~~powershell
wsl --version
wsl --status
wsl --list --online
wsl --list --verbose
~~~

若 WSL 已存在，<code>wsl --install</code> 显示帮助不等于损坏。按 Microsoft 文档指定发行版；下载确实停滞时才考虑 <code>--web-download</code>。检查网络、代理、系统时间和 Windows Update，不叠加多套手工安装。

## 虚拟化不可用

确认 Windows 版本、任务管理器虚拟化状态和 <code>HypervisorPresent</code>。公司设备联系管理员。修改 BIOS/UEFI 前确认厂商步骤、BitLocker 恢复密钥和数据备份；本教材不提供通用固件开关值。

## 忘记 Ubuntu 密码

在 PowerShell：

~~~powershell
wsl -d Ubuntu -u root
~~~

在进入的 Linux root Shell：

~~~bash
passwd YOUR_LINUX_USERNAME
exit
~~~

不要注销发行版；<code>wsl --unregister</code> 会删除数据。

## APT 或 WSL 网络/DNS 故障

~~~bash
ip route
cat /etc/resolv.conf
getent hosts archive.ubuntu.com
curl -I https://archive.ubuntu.com
~~~

先比较 Windows 网络与 WSL 网络。代理、VPN、校园网和公司证书都可能影响结果。不要同时修改 resolv.conf、hosts、代理和防火墙。

## Docker 命令不存在

~~~bash
echo "$WSL_DISTRO_NAME"
command -v docker
~~~

打开 Docker Desktop → Settings → Resources → WSL Integration，确认目标 Ubuntu 已启用。不要在 WSL 中再装另一套 Docker Engine 与 Desktop 争用。

## 只有 Docker Client，没有 Server

~~~bash
docker version
docker context show
~~~

等待 Docker Desktop 引擎就绪，核对 WSL Integration。客户端版本输出不代表 Server 可用。

## Docker Desktop 无法启动

先保存 Docker Desktop 诊断信息，核对 WSL 2、虚拟化、磁盘空间和系统要求。不要先恢复出厂设置；该操作可能影响已有镜像、容器、卷和配置。

## 8080 端口占用

~~~bash
ss -lnt '( sport = :8080 )'
docker container ls --format 'table {{.Names}}\t{{.Ports}}'
~~~

~~~powershell
Get-NetTCPConnection -LocalPort 8080 -ErrorAction SilentlyContinue
~~~

识别所有者，不终止未知进程。为课程临时换端口时，要同步修改 Compose、文档和验收命令。

## Compose 能解析但网站打不开

~~~bash
docker compose ps
docker compose logs --tail 100
docker inspect linux-learning-notes-web
docker exec linux-learning-notes-web wget -qO- http://127.0.0.1/
curl -v http://localhost:8080/
~~~

逐层判断：容器是否运行/健康 → 内部 Nginx 是否响应 → 端口是否发布 → 主机 HTTP 是否成功。

## 页面还是旧内容

~~~bash
git diff
docker compose build --no-cache
docker compose up -d --force-recreate
curl -s http://localhost:8080/ | grep 'Linux 学习笔记'
~~~

先确认源文件真的改变。无缓存构建和强制重建会改变 Docker 状态，仅针对本项目使用；最后考虑浏览器缓存。

## 权限不足

~~~bash
pwd
whoami
id
ls -ld PATH
namei -l PATH
~~~

确认路径、所有者和父目录权限。不要直接 sudo 或 chmod 777。若文件由之前的 sudo 操作创建，精确修复目标所有者。

## CRLF 导致脚本无法运行

**典型错误**：<code>/usr/bin/env: ‘bash\r’: No such file or directory</code>。

~~~bash
file verify.sh
sed -n '1l' verify.sh
~~~

在编辑器把行尾改为 LF，再运行 <code>chmod u+x verify.sh</code>。权限与换行是两类问题。

## 项目路径不对或性能慢

~~~bash
pwd
realpath .
stat -f -c '%T' .
~~~

WSL/Linux 工具为主时将仓库放 <code>~/projects</code>；不要误以为 <code>/mnt/c</code> 属于 Linux 原生文件系统。迁移前先确认 Git 状态和备份，避免两份仓库并行修改。

## Codex 没有按预期操作

1. 明确任务是只读分析还是实施修改。
2. 明确允许修改的文件和禁止的外部动作。
3. 检查当前项目、智能体环境和集成终端是否为预期系统。
4. 查看审批请求的精确命令与路径。
5. 修改后检查 <code>git diff</code> 和验证输出。

Codex 表示“已完成”不是证据；文件、命令、HTTP 和浏览器结果必须分别验证。

## Codex CLI 在 WSL 中找不到

~~~bash
command -v codex || echo 'codex not found'
printf '%s\n' "$PATH" | tr ':' '\n'
~~~

重新核对 [OpenAI Docs 的 WSL 指南](https://learn.chatgpt.com/docs/windows/wsl)。安装脚本会写入用户环境；未经授权不要自动执行。Windows 桌面版已安装不代表 WSL 中也存在 CLI。

## 何时停止自行排障

- 操作涉及 BIOS/UEFI、BitLocker、企业策略或未知磁盘；
- 准备重置 Docker Desktop、注销 WSL 发行版或删除卷；
- 错误可能涉及凭据泄露；
- 不确定命令的精确目标；
- 同一故障在记录证据后重复三次仍无新信息。

此时保留日志和当前状态，向设备管理员、官方支持或有经验的人员求助。

