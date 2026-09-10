# 第 12 章：网络、DNS、端口与 HTTP

**建议学时：2 小时｜状态：诊断命令可复现**

## 学习目标

- 区分 IP、DNS、端口、监听地址和 HTTP；
- 从低到高定位网络失败；
- 理解主机端口与容器端口映射。

## 概念图：四层诊断

1. **接口/IP**：系统是否有网络接口和地址？
2. **DNS**：名称能否解析为地址？
3. **TCP/端口**：目标端口是否有进程监听？
4. **应用协议**：HTTP 是否返回预期状态和内容？

在 **Ubuntu Bash**：

~~~bash
ip addr
ip route
cat /etc/resolv.conf
getent hosts example.com
ss -lnt
curl -I https://example.com
~~~

不要只用 ping 判断互联网是否正常：目标可能禁用 ICMP，但 HTTPS 仍可用。

## 端口与监听地址

<code>127.0.0.1:8080</code> 表示本机回环地址的 8080 端口；<code>0.0.0.0:8080</code> 表示在所有 IPv4 接口监听。Docker 的 <code>8080:80</code> 表示“主机 8080 → 容器 80”。

查看 8080 是否占用：

~~~bash
ss -lnt '( sport = :8080 )'
~~~

在 **PowerShell**：

~~~powershell
Get-NetTCPConnection -LocalPort 8080 -ErrorAction SilentlyContinue
~~~

## DNS/代理故障顺序

记录完整错误与时间 → 检查 Windows 是否联网 → 比较域名解析与直接 IP → 检查代理/VPN/校园网 → 查 WSL/Docker 专属日志。不要同时修改 DNS、代理、hosts 和防火墙，否则无法知道哪一步有效。

## 实验：读取 HTTP

~~~bash
curl -sS -o /dev/null -w 'status=%{http_code}\n' https://example.com
~~~

预期为有效 HTTP 状态。网络受限时，记录错误即可，不关闭安全软件绕过。

## 故障分支

- 名称不能解析：聚焦 DNS、代理和网络策略。
- 容器内部成功但主机失败：检查端口发布和主机监听。
- curl 成功但浏览器失败：检查 URL、代理、跳转和浏览器缓存。

## 自测

1. DNS 成功能否证明 HTTP 服务正常？
2. <code>8080:80</code> 两个端口分别属于谁？
3. 为什么排障时每次只改一个变量？

答案见[答案索引](answers.md#第-12-章)。

## 官方来源

[Microsoft：WSL 网络](https://learn.microsoft.com/windows/wsl/networking) · [Docker：端口发布](https://docs.docker.com/get-started/docker-concepts/running-containers/publishing-ports/)
