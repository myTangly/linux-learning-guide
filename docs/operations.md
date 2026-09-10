# 外部操作记录

本文件记录教材制作过程中对工作区以外环境的授权操作。不得记录密码、令牌或其他敏感值。

## 2026-09-10：只读环境核验

- **授权范围**：读取 Windows、WSL、Ubuntu、Docker Desktop 和 Codex 的版本与可用状态。
- **外部位置**：Windows 系统信息、WSL 发行版信息、Docker 引擎状态、已安装应用信息。
- **结果**：Windows 11 家庭版 Build 26100；WSL 2.7.13；Ubuntu 26.04.1 LTS；Docker Desktop 4.89.0；Docker Engine 29.7.2；Docker Compose 5.5.0；VS Code 1.137.0；Codex 桌面版 26.903.8094.0。
- **修改**：无。没有安装、升级、重启、拉取镜像或创建容器。
- **恢复方法**：不适用。

## 待授权验证

如需真实运行综合项目，将记录镜像名、容器名、执行结果和清理方式。默认不执行。

## 2026-09-10：GitHub Pages 公开发布

- **授权范围**：创建公开 GitHub 仓库、推送教材、启用 GitHub Actions Pages、设置自定义域名并发起域名所有权验证。
- **外部位置**：GitHub 仓库 <code>myTangly/linux-learning-guide</code> 与 GitHub Pages 设置。
- **结果**：仓库已创建并推送；Pages 发布源已设为 GitHub Actions；默认站点 <code>https://mytangly.github.io/linux-learning-guide/</code> 已成功发布并完成首页、深层章节、静态资源、站点地图和 404 实际访问检查。<code>linux.tangmy.top</code> 的公共 CNAME 已指向 <code>mytangly.github.io</code>，但 <code>tangmy.top</code> 所有权验证仍等待用户在阿里云添加 TXT 记录，因此仓库中的自定义域名暂未重新绑定。
- **恢复处置**：首次 Pages 初始化长期停留在 <code>updating_pages</code> 并阻塞后续运行。依据 GitHub Pages 官方接口，先取消该残留部署；确认取消状态后删除并重建尚未成功发布的 Pages 站点配置。仓库、提交和 DNS 记录均未删除。重建后的工作流第 8 次运行成功。
- **未操作**：未登录或修改阿里云；未改动其他域名记录；未安装 GitHub CLI；未写入个人邮箱、令牌或密码。
- **恢复方法**：可在仓库 Pages 设置中移除自定义域名或停用 Pages；DNS 回退由域名所有者删除 <code>linux</code> 的 CNAME。仓库删除属于难以恢复操作，不作为常规回退。
