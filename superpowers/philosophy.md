# 设计哲学与常见问题

> 这一章解释 **为什么** Superpowers 长这样 —— 4 条铁律,12 个常见疑问。

## 4 条哲学

### 1. Test-Driven Development —— 先写测试,永远

| 反模式 | 为什么错 |
| --- | --- |
| "写完代码再补测试" | 写完再补的测试一跑就过,等于没测。 |
| "我手动测过了" | 没记录、不可重跑、容易漏。 |
| "TDD 太教条" | TDD 比调试快。"教条"是省时间的工具。 |
| "这个太简单,不用测试" | 简单代码也会坏。写测试 30 秒。 |

**原则**:`Production code → test exists and failed first`。

### 2. Systematic over ad-hoc —— 系统化,不靠灵光一现

Agent 写代码最大的诱惑是"先写一点试试看"。Superpowers 用 Skill 强制:

- brainstorming → 设计
- writing-plans → 计划
- test-driven-development → 验证
- requesting-code-review → 复审

每一步都有明确入口和出口。看起来慢,实际上比"边想边写"快 —— 因为方向错了,中途发现比合并后发现便宜 10 倍。

### 3. Complexity reduction —— 简单是主要目标

YAGNI(You Aren't Gonna Need It)是 Superpowers 计划阶段的口号。

| 诱惑 | 反例 |
| --- | --- |
| 提前抽象 | 写 3 处重复再考虑抽函数,不要"先抽再填"。 |
| 提前配置 | 默认值能用就别加配置项。 |
| 提前扩展 | YAGNI:你不会需要它。 |
| 过度泛化 | 一个具体问题不要解决"一类问题"。 |

### 4. Evidence over claims —— 证据比声明重要

Superpowers 不接受:

> "应该修好了。"

只接受:

> "跑了 `npm test`,输出 `12 passed`,Bug 复现步骤现在不再触发。"

`verification-before-completion` Skill 是这条哲学的执行者。

## 12 个常见问题

### 1. Superpowers 和 Cursor / Copilot 的"rules"有什么区别?

`rules` 是静态的提示注入;Superpowers 是**程序化的 Skill 触发**。区别:

- **触发时机**:rules 永远在场,Superpowers 按需加载(节省上下文)。
- **结构**:Superpowers Skill 是带强制流程的 SOP,不只是几句话。
- **可验证**:Superpowers 的 Skill 配套 drill eval harness,可以测 Agent 是否真的按 Skill 行事。

### 2. 一定要 TDD 吗?我的项目不适合。

3 个 TDD 例外(必须**问过你的搭档**,不是自己拍板):

- 一次性 throwaway prototype
- 生成的代码
- 配置文件

否则:RED → GREEN → REFACTOR。Superpowers 会要求"先写测试,看到失败,再写实现"。

### 3. 用 SDD 还是 EP?

- **SDD**(默认):子 Agent + 自动审查。适合**信任度已建立**之后,需要长时间自主推进。
- **EP**:人工检查点。适合**第一次**用、复杂项目、不想放手。

可以混用:小改动用 EP,大批量改动用 SDD。

### 4. brainstorming 太烦,能跳过吗?

能 —— **但必须**在对话里显式说"跳过 brainstorming"。Agent 不会自作主张跳过。简单项目 1-2 轮问完,不必担心"耽误时间"。

### 5. 我只想要 brainstorming 怎么办?

只装 brainstorming Skill 不可能(它是 Superpowers 整体的一部分)。但你可以**只触发这一个 Skill** —— 在对话里说"只用 brainstorming,不要写实现"。

### 6. Superpowers 会偷我的代码吗?

不会。Skills 是文本文件,在你本地加载。`brainstorming` 的视觉伴侣会从 `primeradiant.com` 拉一个 logo 用于统计(只含版本号),可以用 `SUPERPOWERS_DISABLE_TELEMETRY=1` 关掉。

### 7. 怎么升级?

多数 Agent 在新会话启动时自动检查插件更新。也可以手动:

- Claude Code:`/plugin update superpowers`
- Gemini CLI:`gemini extensions update superpowers`
- 其它:重新跑安装命令。

### 8. 升级会破坏我的工作流吗?

Superpowers 的设计哲学保持稳定(4 条铁律不变),新版本**只**新增 Skill,不会偷偷改行为。阅读 [RELEASE-NOTES](https://github.com/obra/superpowers/blob/main/RELEASE-NOTES.md) 了解新 Skill。

### 9. 怎么贡献新 Skill?

不开放。Superpowers 官方**不**接受新 Skill 贡献:

- 跨 10+ Agent 维护成本太高
- 已有 Skills 覆盖大多数场景

可以:

- 提 issue 描述场景
- Fork 写自己的 Skills(参考 `writing-skills` Skill)
- 提交改进现有 Skill 的 PR

### 10. 跑不起来 / Agent 不响应

按这个顺序排查:

1. 重新 [安装](/superpowers/install),确认命令拼写。
2. **新开一个会话**(已有会话不会重载 Skill)。
3. 问:"请用 using-superpowers skill 自我介绍一下。" —— 如果不回答,插件没生效。
4. 检查 Agent 版本是否在支持列表。
5. 查 [GitHub Issues](https://github.com/obra/superpowers/issues)。

### 11. 怎么知道 Agent 在"装"还是真懂?

Superpowers 鼓励 Agent 显式说"Using X to Y"。如果它藏着不说,直接问:

> 你在用哪些 Skill?为什么?

它会列出。如果列不出来,说明 Skills 没正确加载。

### 12. 我能不能只用 Superpowers 的 TDD 部分?

技术上能,实际上不推荐 —— TDD 的"先写测试"在 brainstorming 之后最有效。直接 TDD 的项目经常:

- 测了不该测的实现细节
- 漏了真正的边界条件
- 设计没法 TDD(因为没设计)

完整流程跑一遍,5 分钟脑暴,后面省一小时。

## 什么时候**不**用 Superpowers

诚实地说:

| 不适合 | 原因 |
| --- | --- |
| **30 秒一次性脚本** | 完整流程 25 分钟 > 价值 |
| **纯调研 / 学习** | 没东西要实现,流程跑不起来 |
| **纯前端像素级调整** | "设计"是 mockup,不是 brainstorm |
| **对话调试** | 用 IDE 的 chat 即可,装插件过重 |

Superpowers 的甜蜜区:**有清晰边界的、值得写测试的、能跑子 Agent 的项目**。

## 进一步阅读

- 原文 README:[github.com/obra/superpowers](https://github.com/obra/superpowers)
- 作者博客:[blog.fsck.com/2025/10/09/superpowers](https://blog.fsck.com/2025/10/09/superpowers/)
- Discord:[discord.gg/35wsABTejz](https://discord.gg/35wsABTejz)
- 发行说明:[RELEASE-NOTES.md](https://github.com/obra/superpowers/blob/main/RELEASE-NOTES.md)

## 教程结束

回到 [首页](/superpowers/) 重新选择章节,或继续探索本项目其它教程。
