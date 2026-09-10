# 学习地图

## 你将建立的心智模型

~~~text
Windows 11
├─ PowerShell：管理 WSL、Windows 应用和主机配置
├─ WSL 2：提供 Linux 内核与虚拟化边界
│  └─ Ubuntu：提供 Bash、APT、Linux 用户空间和项目目录
├─ Docker Desktop：管理 Linux 容器引擎并接入 Ubuntu
│  └─ notes-site 容器：运行 Nginx 和你的静态页面
└─ Codex 桌面版
   ├─ Windows 原生智能体：适合 Windows 文件系统项目
   └─ WSL 智能体/CLI：适合位于 Linux 主目录的项目
~~~

## 四个阶段

1. **建立环境（第 1–4 章）**：能说清每一层，确认 WSL 2 与 Ubuntu 可用。
2. **掌握 Linux（第 5–13 章）**：能独立操作文件、权限、包、进程和网络，并写简单脚本。
3. **建立开发工作流（第 14–19 章）**：使用 VS Code、Git 和 Docker Desktop完成可复现的容器工作。
4. **与 Codex 协作（第 20 章）**：让智能体先解释和计划，再修改、验证与交付。

## 每章通过规则

- 能用自己的话解释核心概念；
- 能在正确的 Shell 中执行实验；
- 能根据预期输出判断成功或失败；
- 能回答章末自测；
- 能说明本章操作修改了什么、如何恢复。

## 安全边界

- 不在 <code>~</code>、<code>/</code>、<code>C:\</code> 等宽泛目录练习递归删除。
- 不把 <code>chmod 777</code> 当成权限问题的通用答案。
- 不复制不理解的管理员命令。
- 不把密码、令牌或 API Key 写入教材、Git 或截图。
- Codex 给出命令并不代表命令已经成功；必须检查实际结果。

