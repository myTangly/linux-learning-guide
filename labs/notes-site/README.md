# 综合实验：容器化学习笔记站

这是一个零编程依赖的静态 Nginx 项目，用来串联 Linux、Git、Docker Compose 和 Codex。

## 项目结构

~~~text
notes-site/
├─ AGENTS.md
├─ Dockerfile
├─ compose.yaml
├─ .dockerignore
├─ verify.sh
└─ site/
   ├─ index.html
   └─ styles.css
~~~

## 复制到 WSL 主目录

当前教材工作区位于 Windows D 盘时，在 **Ubuntu Bash**：

~~~bash
mkdir -p ~/projects
cp -a /mnt/d/path/to/LearningLinux/labs/notes-site \
  ~/projects/linux-learning-notes
cd ~/projects/linux-learning-notes
pwd
~~~

如果教材来自 Git 仓库，也可以直接在 <code>~/projects</code> 下 clone。确认最终路径不是 <code>/mnt/c</code> 或 <code>/mnt/d</code>。

## 静态验证

~~~bash
chmod u+x verify.sh
./verify.sh
docker compose config
~~~

这一步不会启动容器。<code>docker compose config</code> 成功只表示 YAML 能解析。

## 真实运行（会修改 Docker 外部状态）

确认你愿意创建镜像和容器后：

~~~bash
docker compose build
docker compose up -d
docker compose ps
curl --fail http://localhost:8080/
./verify.sh --running
docker compose logs --tail 100
~~~

浏览器打开 <http://localhost:8080>。完成后：

~~~bash
docker compose down
~~~

<code>down</code> 删除本项目容器和默认网络，但保留已构建镜像。不要运行全局 prune。

## Git 练习

~~~bash
git init
git add .
git diff --staged
git commit -m "feat: add containerized learning notes"
~~~

修改页面后先 <code>git diff</code>，再重新构建、启动和验证。

## Codex 练习

把以下内容放入 **Codex 输入框**：

~~~codex
先只读检查这个项目，并解释 Dockerfile、compose.yaml 和 verify.sh 的数据流。
不要修改文件，不要安装软件，不要运行 Docker。
列出你认为的三个验收步骤，并说明每一步能证明什么、不能证明什么。
~~~

确认解释正确后，再给一个有范围的修改任务：

~~~codex
只修改 site/index.html 和 site/styles.css，新增一张“下一步”卡片。
保持中文、UTF-8、现有视觉风格和 8080 端口，不新增依赖。
修改后运行 ./verify.sh，并展示 git diff；不要启动 Docker。
~~~

## 成功标准

- <code>./verify.sh</code> 输出 <code>static_status=ok</code>；
- Compose 服务名为 <code>web</code>，主机端口为 8080；
- <code>docker compose ps</code> 最终显示 healthy；
- HTTP 返回成功且页面包含“Linux 学习笔记”；
- <code>git diff</code> 中只有你预期的文件；
- <code>docker compose down</code> 后项目容器不再运行。
