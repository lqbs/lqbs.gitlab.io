# 安装与快速开始

Superpowers 是一个插件(Plugin)/ 扩展(Extension)/ 包(Package),具体形态取决于你使用的编码 Agent(harness)。本文按 Agent 给出最短安装路径,并在最后用一个真实例子走完第一次"需求 → 计划 → 跑通"。

## 前置条件

- 你已经在用至少一个支持的编码 Agent:Claude Code、Antigravity、Codex App / CLI、Cursor、Factory Droid、Gemini CLI、GitHub Copilot CLI、Kimi Code、OpenCode 或 Pi。
- 你使用多个 Agent 时,需要在每个 Agent 里**单独安装一次**。Superpowers 的 Skills 跟随 Agent 的会话启动钩子加载,不会跨 Agent 同步。
- 网络可以访问 `github.com/obra/superpowers`。

## 选你的 Agent

::: tip 不知道选哪个?
**Claude Code 用户最多** —— Superpowers 走 Anthropic 官方插件市场。如果你只是试试,推荐 Claude Code。
:::

| Agent | 安装命令 | 安装后入口 | 详细文档 |
| --- | --- | --- | --- |
| Claude Code | `/plugin install superpowers@claude-plugins-official` | 在新会话里直接描述需求 | [官方市场页](https://claude.com/plugins/superpowers) |
| Antigravity | `agy plugin install https://github.com/obra/superpowers` | 启动时自动激活 | — |
| Codex App | 在 Codex 侧栏的 **Plugins → Coding** 找到 Superpowers,点 `+` | 新会话 | — |
| Codex CLI | `/plugins` → 搜索 `superpowers` → Install | 新会话 | — |
| Cursor | 在 Agent 对话框 `/add-plugin superpowers` | 新会话 | — |
| Factory Droid | `droid plugin marketplace add https://github.com/obra/superpowers` 然后 `droid plugin install superpowers@superpowers` | 新会话 | — |
| Gemini CLI | `gemini extensions install https://github.com/obra/superpowers` | 新会话 | [Gemini 文档](https://github.com/obra/superpowers/blob/main/docs/README.gemini.md) |
| GitHub Copilot CLI | `copilot plugin marketplace add obra/superpowers-marketplace` 然后 `copilot plugin install superpowers@superpowers-marketplace` | 新会话 | — |
| Kimi Code | `/plugins` → Marketplace → Superpowers | 新会话 | [Kimi 文档](https://github.com/obra/superpowers/blob/main/docs/README.kimi.md) |
| OpenCode | 让 OpenCode 拉取并执行 `https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.opencode/INSTALL.md` | 新会话 | [OpenCode 文档](https://github.com/obra/superpowers/blob/main/docs/README.opencode.md) |
| Pi | `pi install git:github.com/obra/superpowers` | 新会话 | — |

## 第一次对话:5 分钟过完最小闭环

安装完成后,**新开一个会话**,对 Agent 说一句普通的需求。下面以 Claude Code 为例,其它 Agent 行为一致。

### 1. 触发 brainstorming

::: info Agent 会做什么
当你说出"我想做一个 X"这种带意图的需求时,Agent 会自动加载 `brainstorming` Skill,然后**一次一个问题**地问你:

- 目标用户是谁?
- 成功标准是什么?
- 有没有已知的约束?
:::

试试这样开口:

> 我想做一个 CLI 工具,把当前目录里所有 `.md` 文件的标题提取出来,输出成 `outline.json`。

Agent 应当:
- 调用 `brainstorming` Skill(在它的回复里你会看到一句 `Using brainstorming to ...`);
- 问你 1-3 个澄清问题,**不会**直接开始写代码。

### 2. 写计划

Brainstorming 收尾后,Agent 会自动过渡到 `writing-plans` Skill。它会把工作拆成 2-5 分钟一个的小任务,每个任务包含**精确的文件路径**、**完整代码**、**验证步骤**。

计划文件通常保存为 `docs/superpowers/plans/YYYY-MM-DD-<topic>.md`,并在 git 里 commit。

### 3. 实现 + TDD

你确认计划(`go` / `开始`)后,Agent 切换到 `test-driven-development` + `subagent-driven-development`:

- **每个任务**先写一个**会失败**的测试,看到失败,再写最小实现让它过。
- 完成后 Agent 会自己用 `requesting-code-review` 做两阶段审查(spec compliance → code quality)。
- 重要节点 Agent 会停下来同步进度,而不是一口气跑到底。

### 4. 完成分支

所有任务 `done` 后,Agent 调用 `finishing-a-development-branch` Skill,给你四个选项:

- 合并到主分支
- 开 PR
- 保留分支
- 丢弃

## 验证 Superpowers 真的装上了

打开一个新会话,只问一句:

> 请使用 using-superpowers skill 自我介绍一下。

Agent 应当输出类似:

```text
Using using-superpowers to 自我介绍一下。

1. Skill 加载机制:Claude Code 用 Skill 工具调用,Copilot 用 skill 工具,Pi 用 native skills ...
2. 优先级:用户指令 > Superpowers Skills > 默认系统提示 ...
3. Red Flags 表格:看到 1% 适用的 skill 就该调用,不要理性化 ...
```

如果 Agent 回答"我不知道什么是 superpowers",说明插件没有生效。回到 [选你的 Agent](#选你的-agent),确认命令拼写和 Agent 版本。

## 升级与卸载

| 动作 | 命令 |
| --- | --- |
| 升级(Claude Code) | `/plugin update superpowers` 或重新运行安装命令 |
| 升级(Gemini CLI) | `gemini extensions update superpowers` |
| 卸载 | 通过对应 Agent 的插件管理界面移除 |

升级通常是**自动**的 —— 大多数 Agent 在新会话启动时会检查插件更新。

## 关闭可选的视觉伴侣遥测

Superpowers 的 `brainstorming` Skill 附带一个"视觉伴侣"(Visual Companion)浏览器视图。默认会从 Prime Radiant 网站加载一个 logo 用作使用统计(只含 Superpowers 版本号,不含你的项目信息)。

如果你不想要,设置环境变量:

```bash
export SUPERPOWERS_DISABLE_TELEMETRY=1
```

它同时尊重 `DISABLE_TELEMETRY` 与 Claude Code 的 `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`。

## 装好了,接下来?

继续阅读 [核心工作流](/superpowers/workflow) 看一遍完整闭环,或跳到 [Skills 速查表](/superpowers/skills) 按需查阅。
