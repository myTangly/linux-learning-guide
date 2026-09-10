# 第 16 章：容器、镜像、仓库、卷与网络

**建议学时：1.5 小时｜状态：概念按 Microsoft 与 Docker Docs 核对**

## 学习目标

- 区分镜像、容器、Registry、卷和网络；
- 解释容器与虚拟机的差异；
- 理解“容器可删除，重要数据需另存”。

## 概念图：对象关系

~~~text
Dockerfile --build--> Image --run--> Container
                               ├─ Network：与主机或其他容器通信
                               └─ Volume/Bind mount：持久化或共享文件
Registry <----pull/push---- Image
~~~

- **镜像**：只读分层模板。
- **容器**：镜像的运行实例，拥有可写层。
- **Registry**：镜像分发服务，不是正在运行的服务器。
- **卷**：由 Docker 管理的持久数据。
- **绑定挂载**：把明确的主机路径映射进容器。
- **网络**：控制容器间和对外连接。

## 与虚拟机比较

虚拟机通常包含独立客户机内核；Linux 容器共享 Docker 主机的 Linux 内核。WSL 2 提供 Linux 内核环境，Docker Desktop 在此基础上运行 Linux 容器。容器隔离不等于绝对安全边界，仍需最小权限和可信镜像。

## 不变与会变

删除容器通常会删除其可写层。镜像、命名卷和主机文件可能仍存在。发布应用时应能从 Dockerfile 和源文件重建容器，而不是依赖“我手工进入容器改过”。

## 实验：画出对象生命周期

不运行 Docker，先回答：

1. 修改 <code>index.html</code> 后是否需要重新构建镜像？
2. 停止容器与删除容器有何区别？
3. <code>8080:80</code> 与镜像层是否相关？

随后查看现有状态：

~~~bash
docker image ls
docker container ls --all
docker volume ls
docker network ls
~~~

预期结果：这些只读列表命令能够分别展示镜像、容器、卷和网络；列表为空也不代表 Docker 损坏，只表示该类对象尚未创建。

这些是只读列表，不要删除不属于本课程的资源。

## 故障分支

- 把镜像当容器：看命令操作的是 <code>docker image</code> 还是 <code>docker container</code>。
- 容器删除后数据丢失：确认数据原本是否只在可写层。
- 看到多个网络或卷：先识别归属，不做全局清理。

## 自测

1. 镜像和容器是什么关系？
2. 为什么不应在容器可写层保存唯一数据？
3. Registry 与正在运行的容器有什么区别？

答案见[答案索引](answers.md#第-16-章)。

## 官方来源

[Microsoft：Windows 容器概览](https://learn.microsoft.com/windows/dev-environment/docker/overview) · [Docker：容器概念](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/)
