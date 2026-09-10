# 第 19 章：Dockerfile、Compose、健康检查与最小安全

**建议学时：3 小时｜状态：配套文件已生成并完成静态检查**

## 学习目标

- 读懂并构建简单 Dockerfile；
- 用 Compose 管理服务；
- 使用健康检查和最小权限思维验收结果。

## 概念图

~~~text
源文件 + Dockerfile + 构建上下文 → Image → Compose → Container → Health/HTTP
~~~

## Dockerfile

综合项目使用：

~~~dockerfile
FROM nginx:alpine
COPY site/ /usr/share/nginx/html/
HEALTHCHECK --interval=10s --timeout=3s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
~~~

<code>FROM</code> 选择基础镜像；<code>COPY</code> 把受版本控制的页面复制进镜像；健康检查从容器内部验证 HTTP。生产环境应进一步固定已审核版本或 digest，并建立更新策略；教学项目保留易读标签。

## Compose

~~~yaml
services:
  web:
    build:
      context: .
    ports:
      - "8080:80"
    restart: "no"
~~~

在 **Ubuntu Bash**：

~~~bash
docker compose config
docker compose build
docker compose up -d
docker compose ps
docker compose logs --tail 100
curl --fail http://localhost:8080/
docker compose down
~~~

<code>config</code> 先解析配置，但不证明构建或运行成功。<code>up -d</code> 返回也不证明健康；需要结合 <code>ps</code>、HTTP 和页面内容。

## 构建上下文

Docker 会把构建上下文中的可见文件发送给构建器。<code>.dockerignore</code> 应排除 <code>.git</code>、日志、临时文件和秘密文件。不要把凭据写进 Dockerfile、Compose 或镜像层。

## 可复现变更

修改页面 → <code>git diff</code> → <code>docker compose build</code> → <code>up -d</code> → HTTP 验证 → Git 提交。不要进入容器手工改文件作为最终方案。

## 实验

进入配套项目，先运行 <code>./verify.sh</code> 和 <code>docker compose config</code>。得到 <code>static_status=ok</code> 且 Compose 无解析错误后，才在获得授权时执行 build/up/HTTP/down。

预期结果：静态脚本输出 <code>static_status=ok</code>，Compose 配置能够展开且服务名仍为 <code>web</code>；这还不能证明镜像已构建或网页可访问。

## 故障分支

- YAML 解析失败：先 <code>docker compose config</code>。
- 构建找不到文件：确认 context、COPY 相对路径和大小写。
- 容器 running 但 unhealthy：看健康检查输出和容器日志。
- 页面仍旧：确认镜像是否重建、容器是否替换、浏览器缓存是否影响。

## 自测

1. Compose config 成功能证明网站可访问吗？
2. .dockerignore 为什么是安全边界的一部分？
3. 为什么不直接在运行容器里修页面？

答案见[答案索引](answers.md#第-19-章)。

## 官方来源

[Dockerfile reference](https://docs.docker.com/reference/dockerfile/) · [Compose file reference](https://docs.docker.com/reference/compose-file/) · [Docker build context](https://docs.docker.com/build/concepts/context/)
