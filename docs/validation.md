# 教材验证报告

验证日期：**2026-09-10**

## 已通过

- 章节数量：20。
- 章节结构：每章均包含学习目标、概念图、实验、预期结果、故障分支、自测和官方来源。
- Markdown：本地相对链接目标存在，代码围栏成对。
- HTML：生成 32 个公开页面（入口、20 章、8 个参考页、2 个综合实验页、404 页），另附实验站点源码；均声明 <code>zh-CN</code> 与 UTF-8。
- 发布元数据：生成正式域名 canonical、Open Graph、<code>robots.txt</code> 与 <code>sitemap.xml</code>。
- HTML 站内导航：相对链接、资源路径和锚点均存在；所有命令框都带有环境/文件类型标签。
- 离线边界：运行时远程 CSS、JavaScript 和图片为 0；页面脚本只提供目录、筛选和复制功能，不执行教程命令。
- 外部链接：35 个唯一 HTTPS 地址完成可达性检查，来源集中于 Microsoft、Docker、OpenAI、Ubuntu、Git、VS Code 与课程内公开测试端点。
- 安全扫描：未发现疑似 API Key、AWS Key 或私钥正文。
- 隐私扫描：HTML 与随书实验文件未命中用户名、个人目录、工作区专用路径或本机厂商名称。
- JavaScript：生成器、页面脚本和验证脚本均通过 <code>node --check</code>。
- Bash：<code>labs/notes-site/verify.sh</code> 通过 <code>bash -n</code>。
- 项目静态验收：输出 <code>static_status=ok</code>。
- Compose：在当前 Ubuntu/Docker CLI 中通过 <code>docker compose config --quiet</code>。

## 本机只读环境证据

| 项目 | 结果 |
|---|---|
| Windows | Windows 11 家庭中文版，Build 26100，64 位 |
| 虚拟化 | HypervisorPresent=True |
| WSL | 2.7.13，默认 Ubuntu，WSL 2 |
| Ubuntu | 26.04.1 LTS |
| Docker Desktop | 4.89.0 |
| Docker Engine | Client/Server 29.7.2，linux，overlayfs |
| Docker Compose | 5.5.0 |
| VS Code | 1.137.0 |
| Windows Git | 2.55.0.5 |
| Ubuntu Git | 2.53.0 |
| Codex | Windows 桌面版 26.903.8094.0 |
| Ubuntu 内 Codex CLI | 未安装 |

## 未执行与开放门

- 未执行 <code>docker compose build</code>、<code>up</code>、HTTP 实际访问或 <code>down</code>，因为这些操作会创建镜像、容器和网络。
- 未安装 Codex CLI、Node.js 或任何 Ubuntu 包。
- 未重装、重置、注销或关闭 WSL/Ubuntu。
- 未通过浏览器做页面视觉验收。

因此当前结论是：**HTML 教材、站内导航、来源链接和实验配置已通过文件级与静态验证；按“只作文件指导”的约束，没有创建镜像或容器。综合项目的真实容器运行与浏览器可见结果仍留给学习者在明确同意后完成。**
