# 第 18 章：容器生命周期、端口、日志、卷与网络

**建议学时：2.5 小时｜状态：命令已静态核对；创建资源需用户授权**

## 学习目标

- 使用 run、ps、logs、exec、stop 和 rm；
- 理解端口发布与挂载；
- 按证据顺序排查容器。

## 概念图

~~~text
Image → run → Container → logs/exec/HTTP → stop → rm
~~~

## 生命周期

~~~bash
docker pull nginx:alpine
docker run --name linux-learning-web -d -p 8080:80 nginx:alpine
docker container ls
docker logs linux-learning-web
curl http://localhost:8080
docker exec -it linux-learning-web sh
docker stop linux-learning-web
docker rm linux-learning-web
~~~

这些命令会拉取镜像并改变 Docker 外部状态，仅在你明确同意实验后执行。退出容器 Shell 用 <code>exit</code>；不要在容器里手工修改后把它当成可复现配置。

## 端口

<code>-p 8080:80</code> 发布主机 8080 到容器 80。若 8080 占用，先查所有者：

~~~bash
ss -lnt '( sport = :8080 )'
docker container ls --format 'table {{.Names}}\t{{.Ports}}'
~~~

不要随意结束未知进程；可以为本课程选择一个未占用的高位端口，并同步更新访问命令。

## 绑定挂载

~~~bash
docker run --rm -p 8080:80 \
  --mount type=bind,src="$PWD/site",dst=/usr/share/nginx/html,readonly \
  nginx:alpine
~~~

绑定挂载直接暴露主机路径。使用只读挂载能降低容器误改源文件的风险。确认 <code>$PWD/site</code> 是预期目录。

## 排障顺序

~~~bash
docker version
docker container ls --all
docker inspect CONTAINER
docker logs --tail 100 CONTAINER
docker exec CONTAINER wget -qO- http://127.0.0.1/
curl -v http://localhost:8080/
~~~

顺序对应：引擎 → 容器状态 → 配置 → 应用日志 → 容器内部 → 主机访问。

## 实验

在获得授权后运行临时 Nginx，确认 HTTP 内容，然后 stop/rm 专属容器。记录镜像、容器名、端口、验证结果和清理状态，不触碰其他资源。

预期容器运行时 HTTP 成功，停止后端口不再响应。

## 故障分支

- 容器立即退出：查看 all 状态和日志，不反复 run。
- 端口冲突：识别占用者或改用明确的新端口。
- bind mount 页面为空：确认源目录、大小写和容器内目标路径。

## 自测

1. stop 与 rm 有何区别？
2. 绑定挂载为什么应优先加 readonly？
3. HTTP 访问失败时第一步为何不是重装 Docker？

答案见[答案索引](answers.md#第-18-章)。

## 官方来源

[Docker：入门](https://docs.docker.com/get-started/) · [Docker：绑定挂载](https://docs.docker.com/engine/storage/bind-mounts/)
