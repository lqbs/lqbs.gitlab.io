# Skills 速查表

> Superpowers 把每个工作流的关键动作都封装成独立的 **Skill**。Agent 收到任务时,**必须**先扫一遍 Skills 决定用哪个 —— 即便只有 1% 可能适用,也要先调用再判断。

## 总览:Skills 分类

| 类别 | Skills |
| --- | --- |
| Meta | `using-superpowers`, `writing-skills` |
| Testing | `test-driven-development` |
| Debugging | `systematic-debugging`, `verification-before-completion` |
| 协作 / 流程 | `brainstorming`, `writing-plans`, `executing-plans`, `dispatching-parallel-agents`, `requesting-code-review`, `receiving-code-review`, `using-git-worktrees`, `finishing-a-development-branch`, `subagent-driven-development` |

## Meta

### `using-superpowers`

- **何时触发**:任何会话开始时(子 Agent 例外)。
- **做什么**:建立 Skill 加载与优先级规则。用户指令 > Superpowers Skills > 系统默认。
- **常见误用**:Agent 跳过这个直接回答问题 —— 这通常说明插件没装好。

### `writing-skills`

- **何时触发**:你想给 Superpowers 增加或修改 Skill。
- **做什么**:给出 Skill 编写的最佳实践 + 测试方法(drill eval harness)。
- **重要提示**:Superpowers 官方**不**接受新 Skill 贡献,只接受改进。修改的 Skill 必须能跨所有支持 Agent 工作。

## Testing

### `test-driven-development`

- **何时触发**:任何实现代码、新功能、Bug 修复、refactor 之前。
- **做什么**:RED-GREEN-REFACTOR 铁律。
- **关键约束**:
  - 没有失败测试前不许写实现
  - 测试必须"真"测试行为(不是测 mock)
  - 写代码前忘了测试? **删掉重写**。

## Debugging

### `systematic-debugging`

- **何时触发**:出现非预期行为、测试失败、运行时错误。
- **做什么**:4 阶段根因分析(根因追溯、防御性深度、条件式等待)。
- **重要提示**:**不要**跳过根因分析直接修症状。

### `verification-before-completion`

- **何时触发**:在宣布"Bug 修好"或"任务完成"之前。
- **做什么**:要求亲眼看到测试通过 / 用户复现成功,**不接受**"应该没问题"。

## 协作 / 流程

### `brainstorming`

- **何时触发**:任何创造性工作(新功能、新组件、改行为)。
- **做什么**:一次一个问题,探明意图;提 2-3 个方案;分段呈现设计;写 spec。
- **硬门禁**:没拿到用户批准的设计,**不许**进入实现。

### `using-git-worktrees`

- **何时触发**:设计批准后,工作目录不干净 / 想并行多个想法。
- **做什么**:新建分支 + 跑 setup + 验证测试基线干净。
- **跳过条件**:纯文档改动、一次性脚本。

### `writing-plans`

- **何时触发**:设计文档已获批。
- **做什么**:把设计拆成 2-5 分钟一个的任务,每个任务含**完整代码** + **验证步骤**。
- **输出文件**:`docs/superpowers/plans/YYYY-MM-DD-<topic>.md`。

### `subagent-driven-development`(SDD)

- **何时触发**:开始执行计划时,选了 SDD 模式。
- **做什么**:每个任务派一个**新**子 Agent 做实现,Agent 自己做两阶段审查。
- **优势**:上下文干净,迭代快;可以自主推进几小时。
- **注意**:子 Agent **只**接收单个任务,所以每个任务必须自包含。

### `executing-plans`

- **何时触发**:开始执行计划时,选了 EP 模式。
- **做什么**:批量执行任务,到达人工检查点停下等确认。
- **适合**:想保持人工节奏 / 第一次用 Superpowers。

### `dispatching-parallel-agents`

- **何时触发**:有多个**互不依赖**的任务。
- **做什么**:并发派子 Agent,而不是串行。
- **风险**:如果任务之间有共享状态,并行可能引入竞态。Skill 本身会要求确认任务独立。

### `requesting-code-review`

- **何时触发**:任务完成、合并前。
- **做什么**:两阶段审查(spec compliance → code quality),按严重度上报。
- **严重度**:🔴 Critical(阻塞) / 🟠 Important(必须修) / 🟡 Minor(本任务修) / ⚪ Nit(下次)。

### `receiving-code-review`

- **何时触发**:别人(或另一个 Agent)对你的代码给了反馈。
- **做什么**:教你怎么**响应**反馈 —— 区分事实 vs 偏好,礼貌但坚定地保留合理异议。

### `finishing-a-development-branch`

- **何时触发**:所有任务 done,准备收尾。
- **做什么**:跑全量测试;给你 Merge / PR / Keep / Discard 四选项;清理 worktree。

## 怎么知道 Agent 加载了哪个 Skill

Agent 在回复中通常会显式声明:

```text
Using brainstorming to 探索你的想法。
Using test-driven-development to 实现 retry 函数。
```

如果 Agent **没**说 "Using ...",你可以在回复里追问:

> 你刚才用了哪些 Skill?

## 优先级冲突怎么办

> **用户指令 > Superpowers Skills > 系统默认**

例:

- 你的 `AGENTS.md` 写"这个项目不用 TDD" → Agent 听你的,不强制 TDD。
- Skill 说"必须 TDD" + 默认提示说"快速做" → Skill 胜出。
- 你直接说"跳过 brainstorming,直接写" → Agent 听你的,但会确认一句"确定?"。

## 自定义 Skill

要写新 Skill,先读 `writing-skills`(这是 Skill 内部的 Skill)。

测试用 [superpowers-evals](https://github.com/prime-radiant-inc/superpowers-evals/) 的 drill eval harness,clone 到 `evals/` 目录。基础设施测试在 `tests/`,跑 `npm test`。

## 下一步

继续 [设计哲学与常见问题](/superpowers/philosophy) 了解 Superpowers 的"为什么"。
