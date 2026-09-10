# 第 10 章：进程、任务、信号、日志与服务

**建议学时：2 小时｜状态：普通用户实验可复现**

## 学习目标

- 查看和停止自己启动的进程；
- 理解前台、后台、PID 与信号；
- 使用 journalctl/systemctl 读取服务状态。

## 概念图

~~~text
命令 → 进程/PID → 状态与信号 → 标准输出/日志 → 退出码
~~~

## 进程

~~~bash
ps -ef | head
ps aux | head
sleep 300 &
job_pid=$!
printf 'pid=%s\n' "$job_pid"
jobs
ps -p "$job_pid" -o pid,ppid,stat,cmd
kill "$job_pid"
wait "$job_pid" 2>/dev/null
~~~

<code>&</code> 把命令放到后台；<code>$!</code> 是最近后台进程 PID。默认 <code>kill</code> 发送 TERM，请进程正常退出。不要一开始就用 KILL（<code>-9</code>），它不给进程清理机会。

## 交互控制

- <code>Ctrl+C</code>：向前台进程发送中断；
- <code>Ctrl+Z</code>：暂停；
- <code>bg</code>：在后台继续；
- <code>fg</code>：调回前台。

## 服务与日志

现代 WSL 支持 systemd，但发行版配置可能不同：

~~~bash
ps -p 1 -o comm=
systemctl --no-pager --failed
journalctl -b --priority=warning --no-pager | tail -n 30
~~~

读取状态通常不需要 sudo；启动、停止系统服务会改变环境，本章不执行。Docker Desktop 引擎也不是由 Ubuntu 中普通 systemctl 命令管理的。

## 实验：从 PID 到日志思维

启动一个短任务，将输出和错误分别保存，然后验证退出码：

~~~bash
(printf 'start\n'; sleep 1; printf 'done\n') > notes/job.log 2> notes/job.err
status=$?
printf 'exit=%s\n' "$status"
cat notes/job.log
~~~

预期结果：显示 <code>exit=0</code>，<code>job.log</code> 包含 <code>start</code> 与 <code>done</code>，而 <code>job.err</code> 为空。

## 故障分支

- 进程“杀不掉”：先确认 PID 和所有者；不要杀不认识的系统进程。
- <code>systemctl</code> 报 systemd 未运行：检查 PID 1 和 WSL 配置，不安装随机替代工具。
- 日志为空：确认时间范围、服务名和当前启动周期。

## 自测

1. TERM 与 KILL 的区别是什么？
2. <code>$!</code> 表示什么？
3. 为什么 Docker Desktop 不应直接当成 Ubuntu systemd 服务？

答案见[答案索引](answers.md#第-10-章)。

## 官方来源

[Microsoft：WSL systemd](https://learn.microsoft.com/windows/wsl/systemd)
