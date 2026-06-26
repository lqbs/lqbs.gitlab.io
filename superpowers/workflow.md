# 核心工作流

> **本节目标**:在 10 分钟内把"我有一个想法"和"代码合入主分支"中间的整条 Superpowers 流水线看明白。

Superpowers 把软件开发拆成 7 个相互衔接的阶段,每个阶段都有对应的强制 Skill。Agent 在开始任何任务前**必须**先检查有没有 Skill 适用。

## 全景图

```text
 1. brainstorming          想法 → 对齐设计(写文档)
        ↓
 2. using-git-worktrees    隔离工作分支(可选,推荐)
        ↓
 3. writing-plans          设计 → 2-5 分钟可执行任务清单
        ↓
 4. subagent-driven-development  或  executing-plans
    派子 Agent 执行 + 两阶段审查    批量执行 + 人工检查点
        ↓
 5. test-driven-development  写失败测试 → 最小实现 → 重构
        ↓
 6. requesting-code-review  关键节点拉审查(spec → quality)
        ↓
 7. finishing-a-development-branch  合并 / PR / 保留 / 丢弃
```

::: warning 不要跳过 brainstorming
"这个项目太简单,直接写就行"是 Superpowers **最常被违反**的规则。Agent 内部有一条硬门禁:

> 没有用户批准的设计,不许进入实现阶段。

简单项目的设计可以只有几行话,但**必须有**。
:::

## 阶段 1:brainstorming(对齐设计)

**触发**:Agent 看到你描述一个"想做什么"的需求。

**Agent 行为**:

1. 加载 `using-superpowers` Skill,再加载 `brainstorming` Skill。
2. 探查项目当前状态(`ls`、看 README、看 git log),理解你所在的环境。
3. **一次一个问题**问你,优先用选择题。
4. 提 2-3 个候选方案,带权衡与推荐。
5. 分段呈现设计,**每段单独请你看**,不要一次甩一大坨。
6. 设计批准后,写到 `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md`,并 commit。
7. 自检(占位符、矛盾、范围、歧义),然后请你最终 review 一次。

**产出**:`docs/superpowers/specs/...` 下的设计文档。

## 阶段 2:using-git-worktrees(隔离分支)

**触发**:设计获批后,如果当前工作目录不是干净的状态(或者你希望并行多个想法)。

**Agent 行为**:

1. 创建新分支(从最新 main)。
2. 切到 worktree 目录。
3. 跑项目 setup(依赖、迁移)。
4. 跑一遍现有测试,确认 **基线干净** —— 后续测试失败才有意义。

**产出**:一个干净的工作分支 + 验证过的基线。

::: tip
不需要每次都开 worktree。小修改、文档、一次性脚本可以跳过这一步。
:::

## 阶段 3:writing-plans(写实施计划)

**触发**:设计文档已通过用户最终审批。

**Agent 行为**:

1. 把设计拆成 **2-5 分钟一个**的小任务。
2. 每个任务写明:
   - **精确的文件路径**(要新建/修改的每一个文件)
   - **完整代码**(可以原样粘贴的)
   - **验证步骤**(跑哪个命令、期望什么输出)
3. 输出到 `docs/superpowers/plans/YYYY-MM-DD-<topic>.md`。
4. commit。

**产出**:一份"对照抄就能执行"的任务清单。

::: details 好的计划 vs 坏的计划

<Bad>

```text
任务 1:实现用户认证
任务 2:写测试
任务 3:搞定前端
```

- 没有文件路径
- 没有可粘贴代码
- 没有验证步骤
- 任务粒度太大(不是 2-5 分钟)
</Bad>

<Good>

```text
任务 1:在 src/auth/login.ts 新增 login(email, password) 函数
  - 接受 email/password
  - 校验 email 格式
  - 返回 { ok: true, token } 或 { ok: false, error }
  验证:npm test src/auth/login.test.ts 应当失败(尚未实现)

任务 2:为 login 写第一个失败测试(RED)
  - 新建 src/auth/login.test.ts
  - 验证:npm test,期望看到 "FAIL: expected token"
...
```

- 路径精确
- 代码完整
- 验证明确
- 粒度 2-5 分钟
</Good>
:::

## 阶段 4:执行(选一个)

`writing-plans` 完成后,Agent 会问你选哪种执行模式:

| 模式 | Skill | 适合 |
| --- | --- | --- |
| **subagent-driven-development(SDD)** | `subagent-driven-development` | 默认。Agent 为每个任务派一个**全新的子 Agent** 做实现,自己先审 spec compliance,再审 code quality。迭代快、上下文干净。 |
| **executing-plans** | `executing-plans` | 偏好人工节奏。Agent 一次执行一批任务,到达人工检查点停下,等你确认后再继续。 |

::: tip
第一次用 Superpowers 推荐 **executing-plans**。熟悉流程后再切到 SDD,可以观察子 Agent 怎么工作。
:::

## 阶段 5:test-driven-development(每个任务里)

**触发**:Agent 开始动手写实现代码的那一刻。

**铁律**:

```text
没有失败的测试,就没有生产代码。
```

如果 Agent 不小心先把代码写出来,会被 Skill 要求**删掉**重写。**这是 TDD 的精髓,不是仪式**。

### RED-GREEN-REFACTOR 三步

| 步骤 | 做什么 | 关键动作 |
| --- | --- | --- |
| **RED** | 写一个会失败的测试,描述期望行为 | 跑 `npm test`,**亲眼看到失败** |
| **GREEN** | 写**最小**代码让测试通过 | 跑 `npm test`,看到通过 |
| **REFACTOR** | 清理重复、改名、抽函数 | 测试保持绿 |

### 完整示例:写一个 retry 函数

**RED**(先写测试,看到它失败):

```ts
// src/util/retry.test.ts
test('retries failed operations 3 times', async () => {
  let attempts = 0;
  const op = () => {
    attempts++;
    if (attempts < 3) throw new Error('fail');
    return 'ok';
  };
  const result = await retry(op, { max: 3 });
  expect(result).toBe('ok');
  expect(attempts).toBe(3);
});
```

跑测试:

```bash
$ npm test src/util/retry.test.ts
FAIL  Cannot find module './retry'
```

**GREEN**(写最小实现):

```ts
// src/util/retry.ts
export async function retry<T>(op: () => Promise<T>, opts: { max: number }): Promise<T> {
  let lastErr: unknown;
  for (let i = 0; i < opts.max; i++) {
    try {
      return await op();
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
}
```

跑测试:

```bash
$ npm test src/util/retry.test.ts
PASS
```

**REFACTOR**(本例已经够简洁,可跳过)。

## 阶段 6:requesting-code-review(关键节点)

**触发**:每个任务完成后、合并前。

Agent 调 `requesting-code-review` Skill 做**两阶段审查**:

1. **Spec compliance** —— 实现是否覆盖计划任务里的每条要求?有没有漏?
2. **Code quality** —— 测试是否真的有效(不是 mock 套 mock)?有没有过度设计?边界条件?

**关键问题(按严重度上报)**:

- 🔴 Critical:阻塞。安全漏洞、丢失功能、测试假装通过。
- 🟠 Important:必须修。明显的错误、未处理的错误路径。
- 🟡 Minor:本任务里修。命名、注释、抽函数。
- ⚪ Nit:不阻塞。下次顺手改。

Critical 不修完,任务不算 done。

## 阶段 7:finishing-a-development-branch(收尾)

**触发**:所有任务 done。

Agent 调 `finishing-a-development-branch` Skill,做:

1. 跑全量测试,确认**没有**回归。
2. 给你四个选项:
   - **Merge** —— 合并到 main
   - **PR** —— 推到远端开 PR
   - **Keep** —— 保留分支,稍后再说
   - **Discard** —— 整个分支丢掉

3. 清理 worktree 目录。

## 一图流

| 阶段 | 入口 Skill | 强制? | 产出 |
| --- | --- | --- | --- |
| 1. 设计 | `brainstorming` | 强制(简单项目也要) | `docs/superpowers/specs/...` |
| 2. 隔离 | `using-git-worktrees` | 可选 | worktree 目录 + 干净基线 |
| 3. 计划 | `writing-plans` | 强制 | `docs/superpowers/plans/...` |
| 4. 执行 | `subagent-driven-development` 或 `executing-plans` | 强制(二选一) | 跑通测试的代码 |
| 5. TDD | `test-driven-development` | 强制(每个任务内) | 红 → 绿 → 重构 |
| 6. 审查 | `requesting-code-review` | 强制(任务之间) | Critical 已修 |
| 7. 收尾 | `finishing-a-development-branch` | 强制(收尾时) | merge / PR / keep / discard |

## 下一步

按需查阅 [Skills 速查表](/superpowers/skills),或者跳到 [设计哲学与常见问题](/superpowers/philosophy) 了解 Superpowers 为什么这样设计。
