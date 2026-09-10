# 命令速查表

## PowerShell：管理 Windows 与 WSL

~~~powershell
wsl --version
wsl --status
wsl --list --verbose
wsl --update
wsl --shutdown
wsl -d Ubuntu
~~~

## Ubuntu Bash：文件与文本

~~~bash
pwd
ls -la
cd ~/linux-learning-lab
mkdir -p demo
cp source.txt copy.txt
mv old.txt new.txt
rm -- file.txt
cat file.txt
less file.txt
grep -n "word" file.txt
find . -type f -name "*.md"
~~~

## Ubuntu Bash：系统

~~~bash
whoami
id
uname -a
cat /etc/os-release
df -h
free -h
ps aux
ss -lnt
ip addr
getent hosts example.com
~~~

## Git

~~~bash
git status
git diff
git add README.md
git commit -m "docs: update notes"
git log --oneline --decorate -5
git restore --staged FILE
git restore FILE
~~~

## Docker 与 Compose

~~~bash
docker version
docker info
docker image ls
docker container ls --all
docker logs CONTAINER
docker exec -it CONTAINER sh
docker compose config
docker compose build
docker compose up -d
docker compose ps
docker compose logs
docker compose down
~~~

## 看到错误时先收集

~~~powershell
wsl --status
wsl --list --verbose
~~~

~~~bash
pwd
whoami
git status
docker version
docker compose ps
docker compose logs --tail 100
ss -lnt
~~~

