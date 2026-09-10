# 第 7 章：文本、通配符、查找、管道与重定向

**建议学时：2 小时｜状态：本机可复现**

## 学习目标

- 阅读、筛选和查找文本；
- 理解标准输入、标准输出和标准错误；
- 避免误用覆盖重定向。

## 概念图

~~~text
文件/标准输入 → grep/find → 管道 → sort/wc → 屏幕或受控输出文件
~~~

## 常用工具

~~~bash
cd ~/linux-learning-lab
printf 'INFO start\nWARN disk\nERROR network\nINFO stop\n' > notes/app.log
cat notes/app.log
head -n 2 notes/app.log
tail -n 2 notes/app.log
grep -n 'ERROR' notes/app.log
wc -l notes/app.log
~~~

使用 <code>less notes/app.log</code> 分页阅读；按 <code>/ERROR</code> 搜索，按 <code>n</code> 跳到下一个，按 <code>q</code> 退出。

## 管道

~~~bash
grep -E 'WARN|ERROR' notes/app.log | sort | tee notes/problems.txt
~~~

管道 <code>|</code> 把左侧标准输出交给右侧；<code>tee</code> 同时显示并保存。每个阶段都应可单独运行，这样失败时容易定位。

## 重定向

~~~bash
printf 'first\n' > notes/output.txt
printf 'second\n' >> notes/output.txt
ls missing 2> notes/error.txt
~~~

- <code>></code> 创建或覆盖；
- <code>&gt;&gt;</code> 追加；
- <code>2></code> 重定向错误输出。

覆盖前用 <code>test -e FILE</code> 或 <code>ls -l FILE</code> 检查目标。不要把不可信变量直接用于输出路径。

## 通配符与 find

~~~bash
printf '%s\n' notes/*.txt
find ~/linux-learning-lab -type f -name '*.txt' -print
grep -RIn --include='*.txt' 'ERROR' ~/linux-learning-lab
~~~

通配符由 Shell 展开；没有匹配时行为可能不是你预期的，因此批量修改前先用 <code>printf</code> 展示匹配结果。

## 实验

从 <code>app.log</code> 中提取 WARN/ERROR，写入 <code>problems.txt</code>，并验证：

~~~bash
test "$(wc -l < notes/problems.txt)" -eq 2
echo "$?"
~~~

预期退出码为 0，表示筛选结果恰好两行。

## 故障分支

- 输出为空：分别运行管道每一段，检查匹配文本和大小写。
- 原文件被覆盖：停止继续写入，检查备份或 Git。
- 通配符异常：先用 <code>printf</code> 展示 Shell 实际展开结果。

## 自测

1. <code>&gt;</code> 和 <code>&gt;&gt;</code> 的风险差异是什么？
2. 管道传递的是默认哪类数据流？
3. 批量命令前怎样预览通配符匹配？

答案见[答案索引](answers.md#第-7-章)。

## 官方来源

[Microsoft：Linux with WSL](https://learn.microsoft.com/windows/wsl/tutorials/linux)
