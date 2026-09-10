# 项目协作规则

- 默认使用简体中文和 UTF-8。
- 这是静态 Nginx 教学项目，不新增 Node.js、Python、数据库或前端构建依赖。
- 默认只修改 `site/index.html`、`site/styles.css`、`Dockerfile`、`compose.yaml`、`.dockerignore`、`verify.sh` 和本 README。
- 保持 Compose 服务名 `web`、容器名 `linux-learning-notes-web`、主机端口 `8080` 和容器端口 `80`。
- 不写入密码、令牌、Cookie、真实邮箱或其他个人信息。
- 修改前先读取相关文件；修改后至少运行 `./verify.sh` 和 `docker compose config`。
- `docker compose build/up/down` 会改变工作区外的 Docker 状态，执行前明确说明影响并取得用户授权。
- 不运行 `docker system prune`、`docker volume prune` 或删除其他项目的镜像、容器、网络、卷。
- 分别报告静态检查、容器运行、HTTP 访问和浏览器可见结果；前一步成功不能代替后一步。

