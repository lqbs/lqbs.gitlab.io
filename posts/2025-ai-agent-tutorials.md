---
title: "26 个必知 AI Agent 开源项目教程"
date: 2025-06-26T00:00:00+08:00
draft: false
tags: ["AI", "Agent", "教程"]
categories: ["AI"]
---

2025~2026 年，AI Agent 领域涌现了大量高质量开源项目。本文系统梳理 25 个关键项目，按用途分类讲解。

<!--more-->

## 目录

- [一、Agent 运行时与操作系统](#一agent-运行时与操作系统)
- [二、Agent 技能与最佳实践](#二agent-技能与最佳实践)
- [三、规范驱动开发 (SDD)](#三规范驱动开发-sdd)
- [四、知识图谱与代码理解](#四知识图谱与代码理解)
- [五、记忆与上下文管理](#五记忆与上下文管理)
- [六、提示工程与文档获取](#六提示工程与文档获取)
- [七、Token 优化](#七token-优化)
- [八、学习教程](#八学习教程)
- [九、资源合集](#九资源合集)

---

## 一、Agent 运行时与操作系统

### 1. ECC — Agent Harness 性能优化系统

**仓库**: [affaan-m/ECC](https://github.com/affaan-m/ECC) ⭐ 211K+

**定位**: 跨 Agent 运行时的完整操作系统级工具集。提供技能(skills)、本能(instincts)、记忆优化、持续学习、安全扫描等功能。支持 Claude Code、Codex、OpenCode、Cursor、Gemini、Zed、GitHub Copilot 等几乎所有主流 AI 编码 Agent。

**核心概念**:

- **Harness**（运行框架）：Agent 运行的环境，提供工具、知识、权限控制
- **Skills**：可复用的工作流，以 `SKILL.md` 格式定义
- **Hooks**：生命周期钩子（SessionStart、PostToolUse 等）
- **Instincts**：基于经验积累的"直觉"，随使用自动进化

**快速安装**:

```bash
# 克隆仓库
git clone https://github.com/affaan-m/ECC.git
cd ECC
npm install

# 安装到 Claude Code
/plugin marketplace add https://github.com/affaan-m/ECC
/plugin install ecc@ecc

# 或手动安装部分规则
mkdir -p ~/.claude/rules/ecc
cp -R rules/common ~/.claude/rules/ecc/
```

**核心命令**:

| 命令 | 用途 |
|------|------|
| `/plan` | 规划和架构设计 |
| `/tdd` | 测试驱动开发 |
| `/code-review` | 代码审查 |
| `/security-scan` | 安全扫描 |
| `/harness-audit` | 评估 Agent 环境健康度 |

**核心哲学**: Agent 的智能来自模型训练，但 Agent 产品需要高质量的 Harness。ECC 就是这样一个为各种 Agent 提供统一 Harness 的系统。

---

### 2. gstack — Garry Tan 的虚拟工程团队

**仓库**: [garrytan/gstack](https://github.com/garrytan/gstack) ⭐ 116K+

**定位**: YC CEO Garry Tan 的个人 Claude Code 配置，将单个 Agent 变成包含 CEO、设计师、工程师经理、QA、安全官等角色的完整虚拟工程团队。

**核心理念**: 从前端向导到 Reddit 社区忍者，每个 Agent 都是有角色、有流程的专业人士。

**快速安装**:

```bash
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
cd ~/.claude/skills/gstack && ./setup
```

**典型工作流**:

```
/office-hours     → YC 式产品深度访谈
/plan-ceo-review  → CEO 视角战略审核
/plan-eng-review  → 技术架构锁定
/design-shotgun   → 生成多个设计方案
/review           → 代码审查 + 自动修复
/qa               → 浏览器端 QA 测试
/ship             → 生成 PR
/retro            → 周度回顾
```

**关键特点**:
- 23 个专业技能 + 8 个工具命令
- 完整的"思考→规划→构建→审查→测试→发布→回顾"流程
- 支持 10 种 AI 编码 Agent
- 设计 → HTML 的无缝管线
- 浏览器集成 QA

---

### 3. agency-agents — AI 机构角色库

**仓库**: [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) ⭐ 116K+

**定位**: 一个庞大的 AI Agent 角色集合（116+ Agent），涵盖工程、设计、营销、销售、安全、项目管理等 16 个部门。

**安装**:

```bash
# 安装所有 Agent
./scripts/install.sh --tool claude-code

# 只安装特定部门
./scripts/install.sh --tool claude-code --division engineering,security
```

**Agent 示例**:

| 部门 | Agent | 专长 |
|------|-------|------|
| 💻 工程部 | 前端开发者、后端架构师、DevOps 自动化师 | React、API 设计、CI/CD |
| 🎨 设计部 | UI 设计师、品牌守护者、乐趣注入师 | 设计系统、品牌一致性、互动体验 |
| 📢 市场部 | 增长黑客、内容创作者、SEO 专家 | 用户获取、内容策略、搜索引擎优化 |
| 💰 付费媒体 | PPC 策略师、搜索查询分析师 | Google Ads、关键词研究 |
| 🔒 安全部 | 安全架构师、渗透测试员、事件响应员 | 威胁建模、安全审计、事件响应 |

**特色**: 每个 Agent 包含身份特征、核心任务、技术交付物、成功指标和沟通风格。

---

### 4. oh-my-openagent — 多模型 Agent 编排引擎

**仓库**: [code-yeongyu/oh-my-openagent](https://github.com/code-yeongyu/oh-my-openagent) ⭐ 63.7K+

**定位**: 专为 OpenCode 和 Codex CLI 设计的多模型 Agent 编排系统。支持 Sisyphus、Hephaestus、Oracle、Librarian 等多个专业 Agent 协同工作。

**安装**:

```bash
# Ultimate 版（OpenCode）
bunx oh-my-openagent install

# Light 版（Codex CLI）
npx lazycodex-ai install
```

**核心特性**:

- **ultrawork/ulw**: 一行命令激活所有 Agent，自动完成直到结束
- **Team Mode**: 1 个主导 + 最多 8 个并行成员，实时 tmux 可视化
- **Hashline**: 基于内容哈希的编辑工具，零过期行错误
- **IntentGate**: 分析真实用户意图后再分类执行
- **内置 MCP**: Exa（网络搜索）、Context7（文档）、Grep.app（GitHub 代码搜索）

**Agent 模型映射**:

| Agent | 模型 | 用途 |
|-------|------|------|
| Sisyphus | Opus / Kimi K2.6 / GLM 5.1 | 主编排器、规划与委派 |
| Hephaestus | GPT-5.5 | 自主深度工作 |
| Prometheus | Opus / Kimi K2.6 | 战略规划 |

---

### 5. Goose — 通用开源 AI Agent

**仓库**: [aaif-goose/goose](https://github.com/aaif-goose/goose) ⭐ 50.2K+

**定位**: Linux 基金会下的通用 AI Agent，支持桌面应用、CLI 和 API。不限于代码——可用于研究、写作、自动化、数据分析等。

**安装**:

```bash
# CLI 安装
curl -fsSL https://github.com/aaif-goose/goose/releases/download/stable/download_cli.sh | bash

# 或下载桌面应用
# 访问 https://goose-docs.ai/docs/getting-started/installation
```

**核心特性**:

- **多 Provider 支持**: Anthropic、OpenAI、Google、Ollama、OpenRouter、Azure、Bedrock 等 15+ 提供商
- **70+ 扩展**: 通过 MCP 协议连接
- **Rust 开发**: 高性能、跨平台
- **桌面应用 + CLI + API**: 多种使用方式

---

## 二、Agent 技能与最佳实践

### 6. Superpowers — 强制纪律的软件开发方法论

**仓库**: [obra/superpowers](https://github.com/obra/superpowers) ⭐ 239K+

**定位**: 一套由可组合 Skills 驱动的完整软件开发方法论。装上之后，Agent 不再上来就写代码，而是先想清楚再动手。跑在 Claude Code / Codex / Cursor / OpenCode 等 10+ 编码 Agent 之上。

**核心理念**: Agent 拿到需求不再直接写代码，而是先通过 Brainstorming 对齐设计、出计划、写测试、跑子 Agent 实现——一次"开工"能自主推进几小时不跑偏。

**快速安装**:

```bash
# Claude Code（官方市场）
/plugin install superpowers@claude-plugins-official

# Antigravity
agy plugin install https://github.com/obra/superpowers

# Gemini CLI
gemini extensions install https://github.com/obra/superpowers

# OpenCode
# 让 Agent 执行: https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.opencode/INSTALL.md

# Pi
pi install git:github.com/obra/superpowers
```

**7 阶段工作流**:

```text
1. brainstorming         想法 → 对齐设计（写文档）
        ↓
2. using-git-worktrees   隔离工作分支（可选）
        ↓
3. writing-plans         设计 → 2-5 分钟可执行任务清单
        ↓
4. subagent-driven-development  或 executing-plans
   派子 Agent 执行 + 两阶段审查     批量执行 + 人工检查点
        ↓
5. test-driven-development  写失败测试 → 最小实现 → 重构
        ↓
6. requesting-code-review  关键节点拉审查（spec → quality）
        ↓
7. finishing-a-development-branch  合并 / PR / 保留 / 丢弃
```

**4 条哲学**:

| 原则 | 核心 |
|------|------|
| **TDD** | 先写测试，永远。没有失败测试前不许写生产代码 |
| **系统化 > 即兴** | Brainstorming → Plan → TDD → Review，每一步有明确出入口 |
| **复杂度降低** | YAGNI：提前抽象/配置/扩展都是诱惑 |
| **证据 > 声明** | 不接受"应该修好了"，只接受"跑了 `npm test` 输出 12 passed" |

**Skills 列表**:

| 类别 | Skills |
|------|--------|
| Meta | `using-superpowers`, `writing-skills` |
| 测试 | `test-driven-development` |
| 调试 | `systematic-debugging`, `verification-before-completion` |
| 协作/流程 | `brainstorming`, `writing-plans`, `executing-plans`, `dispatching-parallel-agents`, `requesting-code-review`, `receiving-code-review`, `using-git-worktrees`, `finishing-a-development-branch`, `subagent-driven-development` |

**硬门禁**: 没有用户批准的设计，不许进入实现阶段。Agent 必须显式声明"Using X to Y"，让你知道它在用什么 Skill。

**完美场景**: 有清晰边界的、值得写测试的、能跑子 Agent 的项目。不适合 30 秒一次性脚本、纯调研、纯前端像素调整。

---

### 7. andrej-karpathy-skills — Karpathy 式编码指南

**仓库**: [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) ⭐ 182K+

**定位**: 基于 Andrej Karpathy 对 LLM 编码陷阱的观察，提炼为四个原则的单一 `CLAUDE.md` 文件。

**四个原则**:

| 原则 | 解决的问题 | 核心要求 |
|------|-----------|---------|
| **Think Before Coding** | 错误假设、隐藏困惑 | 明确假设、呈现多解释、困惑时提问 |
| **Simplicity First** | 过度复杂化 | 不需要的功能不做、单次使用代码不抽象 |
| **Surgical Changes** | 无关修改 | 只改必须改的、不"改进"相邻代码 |
| **Goal-Driven Execution** | 指示式 vs 声明式 | 定义成功标准、验证循环 |

**安装**:

```bash
# 在 Claude Code 中
/plugin marketplace add forrestchang/andrej-karpathy-skills
/plugin install andrej-karpathy-skills@karpathy-skills

# 或直接下载 CLAUDE.md
curl -o CLAUDE.md https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md
```

---

### 8. Matt Pocock Skills — 真正工程师的技能

**仓库**: [mattpocock/skills](https://github.com/mattpocock/skills) ⭐ 147K+

**定位**: 解决 AI Agent 开发的四种常见失败模式：误解意图、过度啰嗦、代码无法工作、代码复杂化。

**核心技能**:

| 命令 | 用途 |
|------|------|
| `/grill-me` | 在开始编码前进行详细需求追问 |
| `/grill-with-docs` | 追问 + 构建领域模型、术语表 |
| `/tdd` | 测试驱动开发的红-绿-重构循环 |
| `/diagnosing-bugs` | 系统化调试循环 |
| `/improve-codebase-architecture` | 扫描并改善代码架构 |
| `/handoff` | 生成交接文档 |
| `/to-prd` | 将对话转化为 PRD |

**安装**:

```bash
npx skills@latest add mattpocock/skills
# 务必选择 /setup-matt-pocock-skills
```

---

### 9. Addy Osmani Agent Skills — 生产级工程技能

**仓库**: [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) ⭐ 66.9K+

**定位**: 来自 Google 工程师 Addy Osmani 的 24 个技能包，覆盖从定义、规划、构建、验证、审查到发布的完整开发生命周期。

**8 个斜杠命令**:

| 阶段 | 命令 | 原则 |
|------|------|------|
| 定义 | `/spec` | 先写规范再写代码 |
| 规划 | `/plan` | 小、原子化任务 |
| 构建 | `/build` | 一次一个切片 |
| 验证 | `/test` | 测试即证明 |
| 审查 | `/review` | 改善代码健康 |
| 性能 | `/webperf` | 先测量再优化 |
| 简化 | `/code-simplify` | 清晰胜过聪明 |
| 发布 | `/ship` | 越快越安全 |

**安装**:

```bash
# Claude Code 市场安装
/plugin marketplace add addyosmani/agent-skills
/plugin install agent-skills@addy-agent-skills
```

**技能特点**:
- 每个 Skill 包含 YAML frontmatter + Markdown 工作流
- 内置反合理化表（Anti-rationalization table），防止 Agent 跳过步骤
- 验证不可协商——证据要求明确

---

### 10. Ponytail — 懒惰资深工程师模式

**仓库**: [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) ⭐ 58.9K+

**定位**: 让 AI Agent 像团队中最懒但最聪明的资深工程师一样思考——写最少的代码，做最正确的事。

**核心原则（决策阶梯）**:

```
1. 这东西需要存在吗？      → 不需要：跳过 (YAGNI)
2. 代码库里已有？          → 复用，不重写
3. 标准库有吗？            → 用标准库
4. 平台原生功能？          → 用平台原生功能
5. 已安装的依赖？          → 用已安装的依赖
6. 一行能搞定？            → 写一行
7. 只有以上都不行时        → 写最小可行方案
```

**性能数据**:

| 指标 | 改善 |
|------|------|
| 代码量 | -54%（最多 -94%） |
| Token 消耗 | -22% |
| 成本 | -20% |
| 速度 | -27% |
| 安全性 | 100%（无退化） |

**安装**:

```bash
# Claude Code
/plugin marketplace add DietrichGebert/ponytail
/plugin install ponytail@ponytail
```

---

### 11. Caveman — 穴居人 Token 压缩

**仓库**: [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) ⭐ 77K+

**定位**: 让 Agent 像穴居人一样说话——减少 ~75% 的输出 Token，保持全部技术准确性。

**效果对比**:

- **正常 Claude**: "The reason your React component is re-rendering is likely because you're creating a new object reference on each render cycle..."
- **Caveman**: "New object ref each render. Inline object prop = new ref = re-render. Wrap in `useMemo`."

**安装**:

```bash
curl -fsSL https://raw.githubusercontent.com/JuliusBrussee/caveman/main/install.sh | bash
```

**命令**:

| 命令 | 用途 |
|------|------|
| `/caveman [lite\|full\|ultra\|wenyan]` | 设置压缩级别 |
| `/caveman-commit` | 50 字符以内的常规提交信息 |
| `/caveman-review` | 单行 PR 评论 |
| `/caveman-stats` | 显示 Token 节省统计 |
| `/caveman-compress <file>` | 压缩记忆文件 |

---

## 三、规范驱动开发 (SDD)

### 12. Spec Kit — GitHub 官方 SDD 工具包

**仓库**: [github/spec-kit](https://github.com/github/spec-kit) ⭐ 116K+

**定位**: GitHub 官方推出的规范驱动开发工具包。先写规范（Spec），再写代码，让规范成为可执行文件。

**核心理念**: 规范驱动开发翻转传统流程——规范不仅指导实现，还能直接生成实现。

**安装**:

```bash
# 安装 Specify CLI
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@vX.Y.Z

# 初始化项目
specify init my-project --integration copilot
```

**工作流**:

```
/speckit.constitution  → 创建项目原则
/speckit.specify       → 定义功能和需求
/speckit.clarify       → 澄清未明确的区域
/speckit.plan          → 技术实现计划
/speckit.tasks         → 分解为任务
/speckit.implement     → 执行任务实现
```

**扩展机制**:

- **Extensions**: 添加新功能（如 Jira 集成、代码审查）
- **Presets**: 自定义现有工作流（如合规格式、领域术语）
- **Bundles**: 打包扩展和预设的角色套装

---

### 13. OpenSpec — AI 编码助手的 SDD

**仓库**: [Fission-AI/OpenSpec](https://github.com/Fission-AI/OpenSpec) ⭐ 56.7K+

**定位**: 更轻量的规范驱动开发框架，设计理念为"流动不僵化、迭代不瀑布、简单不复杂"。

**安装**:

```bash
npm install -g @fission-ai/openspec@latest

# 在项目中初始化
cd your-project
openspec init
```

**命令**:

| 命令 | 用途 |
|------|------|
| `/opsx:explore` | 无压力的探索式对话 |
| `/opsx:propose` | 提出修改方案 |
| `/opsx:apply` | 执行实现 |
| `/opsx:archive` | 归档变更记录 |

**与其他方案对比**:

- **vs Spec Kit**: OpenSpec 更轻量，没有严格的阶段门控
- **vs Kiro**: OpenSpec 不锁定特定 IDE 或模型

---

## 四、知识图谱与代码理解

### 14. Graphify — 代码知识图谱

**仓库**: [safishamsi/graphify](https://github.com/safishamsi/graphify) ⭐ 72.3K+

**定位**: 将任何代码文件夹转化为可查询的知识图谱。支持代码、SQL 模式、脚本、文档、图片、视频等。

**快速使用**:

```bash
# 安装
uv tool install graphifyy

# 注册到 Agent
graphify install

# 在 Agent 中构建图谱
/graphify .

# 查询
/graphify query "what connects auth to the database?"
```

**输出**:

```
graphify-out/
├── graph.html       浏览器可交互图谱
├── GRAPH_REPORT.md  关键概念、关联和建议问题
└── graph.json       完整图谱数据
```

**支持的文件类型**:
- 代码: 36 种 tree-sitter 语法（Python、TS、Go、Rust 等）
- 文档: Markdown、PDF、Office
- 图片: PNG、JPG、WebP、GIF
- 音视频: MP4、MOV、MP3、WAV、YouTube

---

### 15. Understand Anything — 交互式知识图谱

**仓库**: [Egonex-AI/Understand-Anything](https://github.com/Egonex-AI/Understand-Anything) ⭐ 68.1K+

**定位**: 将任何代码库转化为交互式知识图谱，支持探索、搜索和提问。强调"图谱是为了教学，而非炫技"。

**安装**:

```bash
# Claude Code
/plugin marketplace add Egonex-AI/Understand-Anything
/plugin install understand-anything

# 其他平台一键安装
curl -fsSL https://raw.githubusercontent.com/Egonex-AI/Understand-Anything/main/install.sh | bash
```

**核心命令**:

| 命令 | 用途 |
|------|------|
| `/understand` | 分析整个代码库构建知识图谱 |
| `/understand-dashboard` | 打开交互式仪表板 |
| `/understand-chat` | 对代码库提问 |
| `/understand-diff` | 分析变更影响 |
| `/understand-explain` | 深度解析特定文件/函数 |
| `/understand-onboard` | 生成新成员入职指南 |

**技术架构**:
- **Tree-sitter**: 确定性解析，提取结构化事实
- **LLM**: 语义理解，生成摘要、标签、架构分层
- **5 个专业 Agent**: 项目扫描、文件分析、架构分析、导览生成、图审查

---

### 16. CodeGraph — 预索引代码知识图

**仓库**: [colbymchenry/codegraph](https://github.com/colbymchenry/codegraph) ⭐ 54.8K+

**定位**: 预构建的代码知识图谱，为 Agent 提供精准的上下文——减少 50-80% 的工具调用，自动同步代码变更。

**安装**:

```bash
# 安装 CLI
curl -fsSL https://raw.githubusercontent.com/colbymchenry/codegraph/main/install.sh | sh

# 连接到 Agent
codegraph install

# 初始化项目
cd your-project
codegraph init
```

**性能基准**（7 个开源代码库测试）:

| 指标 | 改善 |
|------|------|
| 工具调用 | -58%（中位数） |
| 速度 | -22% |
| 文件读取 | 几乎归零 |
| Token | 25-64% 减少 |

**核心能力**:

- **Surgical Context**: 一次工具调用返回相关源码、调用路径和影响范围
- **Auto-Sync**: 原生文件系统事件监听，自动增量更新
- **Impact Analysis**: 分析任何符号的影响半径
- **20+ 语言**: TypeScript、Python、Go、Rust、Java 等
- **框架感知路由**: 识别 17 种 Web 框架的路由绑定

---

## 五、记忆与上下文管理

### 17. Claude-Mem — 跨会话持久记忆

**仓库**: [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) ⭐ 84.4K+

**定位**: 跨会话持久记忆压缩系统。自动捕获 Agent 会话中的工具使用观察，生成语义摘要，在未来的会话中注入相关上下文。

**安装**:

```bash
npx claude-mem install

# 或通过 Claude Code 市场
/plugin marketplace add thedotmack/claude-mem
/plugin install claude-mem
```

**工作方式**:

1. **5 个生命周期钩子**: SessionStart、UserPromptSubmit、PostToolUse、Stop、SessionEnd
2. **Worker 服务**: 端口 37777 的 HTTP API + 网页查看器
3. **SQLite 数据库**: 存储会话、观察、摘要
4. **MCP 搜索工具**: 3 层渐进式检索

**特点**:
- 渐进式披露：分层的记忆检索，显示 Token 成本
- 隐私控制：使用 `<private>` 标签排除敏感内容
- 引用机制：通过 ID 引用过往观察

---

### 18. Mem0 — AI Agent 通用记忆层

**仓库**: [mem0ai/mem0](https://github.com/mem0ai/mem0) ⭐ 59.5K+

**定位**: 为 AI 助手和 Agent 提供智能记忆层，增强个性化和持续学习能力。

**安装**:

```bash
pip install mem0ai

# 或 CLI
npm install -g @mem0/cli
```

**基本使用**:

```python
from mem0 import Memory

memory = Memory()

# 添加记忆
memory.add("I am using mem0", user_id="alice")

# 搜索记忆
results = memory.search("what is alice using?", filters={"user_id": "alice"})
```

**核心能力**:
- 多级记忆（用户、会话、Agent）
- 混合搜索（语义 + BM25 + 实体匹配）
- 时间感知检索
- 支持自托管和云平台

---

## 六、提示工程与文档获取

### 19. Prompt Engineering Guide — 提示工程大全

**仓库**: [dair-ai/Prompt-Engineering-Guide](https://github.com/dair-ai/Prompt-Engineering-Guide) ⭐ 76K+

**定位**: 全面的提示工程指南，涵盖技术、应用、模型、论文、工具和数据集。在线版本见 [promptingguide.ai](https://www.promptingguide.ai/)。

**核心内容**:

| 类别 | 内容 |
|------|------|
| 技术 | Zero-Shot、Few-Shot、Chain-of-Thought、Self-Consistency、RAG、ReAct |
| 应用 | 函数调用、代码生成、数据生成 |
| 模型 | ChatGPT、GPT-4、Gemini、LLaMA、Mistral、Claude 等 |
| 风险 | 对抗性提示、事实性、偏见 |

---

### 20. Context7 — 实时文档获取

**仓库**: [upstash/context7](https://github.com/upstash/context7) ⭐ 58.1K+

**定位**: 为 LLM 和 AI 编码编辑器提供最新、版本特定的库文档，防止 Agent 使用过时或幻觉的 API。

**安装**:

```bash
npx ctx7 setup
```

**使用方式**:

在提示中加入 `use context7` 或指定库 ID：

```text
Create a Next.js middleware that checks for a valid JWT. use context7

Implement basic authentication with Supabase. use library /supabase/supabase
```

**工作模式**:
- **CLI + Skills**: 安装技能，Agent 使用 `ctx7` 命令获取文档
- **MCP**: 注册 Context7 MCP 服务器，Agent 原生调用文档工具

---

### 21. Claude Code Best Practice — 从 Vibe Coding 到工程化

**仓库**: [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) ⭐ 60.9K+

**定位**: Claude Code 最佳实践大全，覆盖 Subagents、Commands、Skills、Hooks、MCP、Plugins、Settings、Memory 等所有核心概念。

**核心概念**:

| 概念 | 位置 | 用途 |
|------|------|------|
| Subagents | `.claude/agents/` | 专业角色 Agent |
| Commands | `.claude/commands/` | 斜杠命令 |
| Skills | `.claude/skills/` | 可复用工作流 |
| Hooks | `.claude/hooks/` | 生命周期钩子 |
| MCP | `.claude/settings.json` | 外部工具连接 |
| Memory | `CLAUDE.md`, `.claude/rules/` | 项目记忆 |

**编排工作流**: Command → Agent → Skill 的三层模式。

---

## 七、Token 优化

### 22. RTK — Rust Token Killer

**仓库**: [rtk-ai/rtk](https://github.com/rtk-ai/rtk) ⭐ 66.2K+

**定位**: 高性能 CLI 代理，减少 LLM Token 消耗 60-90%。单一 Rust 二进制文件，零依赖。

**安装**:

```bash
brew install rtk

# 或一键安装
curl -fsSL https://raw.githubusercontent.com/rtk-ai/rtk/refs/heads/master/install.sh | sh

# 初始化
rtk init -g
```

**Token 节省（30 分钟 Claude Code 会话）**:

| 操作 | 原始 Token | RTK 后 | 节省 |
|------|-----------|--------|------|
| git status | 3,000 | 600 | -80% |
| git diff | 10,000 | 2,500 | -75% |
| cargo test | 25,000 | 2,500 | -90% |
| docker ps | 900 | 180 | -80% |
| **总计** | **~118,000** | **~23,900** | **-80%** |

**策略**:
1. 智能过滤（移除注释、空白、样板）
2. 分组聚合（按目录、按类型）
3. 截断（保留相关上下文）
4. 去重（计数代替重复行）

---

## 八、学习教程

### 23. Learn Claude Code — Agent Harness 工程教程

**仓库**: [shareAI-lab/learn-claude-code](https://github.com/shareAI-lab/learn-claude-code) ⭐ 68.5K+

**定位**: 从零开始的 Agent Harness 工程教程，教你自己构建 Agent 运行环境。

**核心理念**: "智能来自模型训练，不是外部代码编排。Agent 产品 = 模型 + Harness。"

**20 节渐进式课程**:

| 阶段 | 章节 | 主题 |
|------|------|------|
| 🌱 核心能力 | s01-s04 | Agent 循环、工具使用、权限、钩子 |
| | s05-s08 | TodoWrite、子 Agent、技能加载、上下文压缩 |
| | s09-s11 | 记忆系统、系统提示、错误恢复 |
| 🚀 高级能力 | s12-s14 | 任务系统、后台任务、定时调度 |
| | s15-s18 | Agent 团队、团队协议、自主 Agent、工作树隔离 |
| | s07,s19-s20 | 技能加载、MCP 插件、完整 Agent |

**快速开始**:

```bash
git clone https://github.com/shareAI-lab/learn-claude-code
cd learn-claude-code
pip install -r requirements.txt
cp .env.example .env   # 配置 ANTHROPIC_API_KEY

python s01_agent_loop/code.py   # 从 Agent 循环开始
```

---

### 24. Hello-Agents — 从零构建智能体

**仓库**: [datawhalechina/hello-agents](https://github.com/datawhalechina/hello-agents) ⭐ 61.9K+

**定位**: Datawhale 社区出品的中文智能体教程，从核心原理出发，亲手构建 AI Native Agent。

**16 章内容**:

| 部分 | 章节 | 内容 |
|------|------|------|
| 第一部分 | 1-3 | 智能体基础、发展史、LLM 基础 |
| 第二部分 | 4-7 | 经典范式实现、低代码平台、框架实践、自研框架 |
| 第三部分 | 8-12 | 记忆与检索、上下文工程、通信协议、Agentic-RL、评估 |
| 第四部分 | 13-15 | 旅行助手、深度研究 Agent、赛博小镇 |
| 第五部分 | 16 | 毕业设计 |

**在线阅读**: [hello-agents.datawhale.cc](https://hello-agents.datawhale.cc)

---

## 九、资源合集

### 25. Awesome Claude Skills — 精选技能合集

**仓库**: [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) ⭐ 66K+

**定位**: 1000+ 个生产就绪的 Claude Skills 和插件合集，覆盖文档处理、开发工具、数据分析、商务营销、创意媒体等多个类别。

**内容分类**:

| 类别 | 示例 |
|------|------|
| 文档处理 | docx, pdf, pptx, xlsx, Markdown to EPUB |
| 开发工具 | Artifacts Builder, MCP Builder, Playwright |
| 数据分析 | CSV Summarizer, Deep Research |
| 商务营销 | Brand Guidelines, Lead Research, Domain Name Brainstormer |
| 通讯写作 | Content Research Writer, Meeting Insights Analyzer |
| 自动化 | Slack, Gmail, GitHub, Jira, Notion 等 70+ SaaS |

**特别推荐**: `connect-apps` 插件让 Claude 能连接 500+ 应用（Gmail、Slack、GitHub、Notion 等），执行真实的操作。

---

## 总结与建议

根据你的需求选择合适的项目：

| 需求 | 推荐项目 |
|------|---------|
| 完整的 Agent 系统 | ECC、gstack、oh-my-openagent、Goose |
| 技能与工作流 | Superpowers、Matt Pocock Skills、Addy Osmani Skills、Ponytail |
| 行为准则 | andrej-karpathy-skills |
| 规范驱动开发 | Spec Kit、OpenSpec |
| 代码理解 | Graphify、Understand Anything、CodeGraph |
| 跨会话记忆 | Claude-Mem、Mem0 |
| Token 优化 | Caveman、RTK |
| 学习入门 | Learn Claude Code、Hello-Agents、Prompt Engineering Guide |
| 文档获取 | Context7 |
| 资源收集 | Awesome Claude Skills、Claude Code Best Practice |

建议组合：使用 **ECC** 或 **gstack** 作为基础运行时，搭配 **Superpowers** 或 **Matt Pocock Skills** 作为工作流纪律层，加上 **Graphify/CodeGraph** 提供代码理解，最后用 **RTK** 或 **Caveman** 优化 Token 消耗。
