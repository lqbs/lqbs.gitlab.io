---
title: Superpowers 教程
---

# Superpowers 教程

> **一句话**:Superpowers 是一个为编码 Agent 设计的技能框架与软件工程方法论 —— 装上之后,你的 Agent 不再上来就写代码,而是先想清楚再动手。

## 这是什么 / 为什么在意 / 怎么开始

| 5 秒测试 | 答案 |
| --- | --- |
| 这是什么 | 一套可组合的 Skills + 一份强制纪律的软件开发方法论,跑在 Claude Code / Codex / Cursor / OpenCode 等 10+ 编码 Agent 之上 |
| 为什么在意 | Agent 拿到需求不再直接写代码,而是先和你对齐设计、出计划、写测试、跑子 Agent 实现 —— 一次"开工"能自主推进几小时不跑偏 |
| 怎么开始 | 选你的 Agent,跑一行安装命令,跟着 [快速开始](/superpowers/install) 走一遍 15 分钟的脑暴→计划→TDD→执行闭环 |

## 谁应该读这份教程

- 你在用 AI Agent 写代码,但经常"它写出来的东西跟我想的不一样"。
- 你想要一个可以跨 Agent 复用的工作流:Claude Code 用一套,Cursor 用一套,但都是同一套纪律。
- 你关心 TDD、设计先于实现、可验证的完成标准。

如果你只是想要一个能跑通命令的 README,直接看 [安装](/superpowers/install) 即可。

## 教程路线图

按顺序读完大约需要 25 分钟,跳过任何一章都不影响其它章节的可读性。

1. [安装与快速开始](/superpowers/install) — 5 分钟。装上插件,跑通第一次对话。
2. [核心工作流](/superpowers/workflow) — 10 分钟。从一个想法到能合并的代码,完整跑一遍 brainstorm → plan → TDD → subagent-driven-development。
3. [Skills 速查表](/superpowers/skills) — 5 分钟。常用 Skills 的触发条件、产出物、入口命令。
4. [设计哲学与常见问题](/superpowers/philosophy) — 5 分钟。Superpowers 为什么长这样,以及和"让 Agent 自由发挥"的区别。

## 阅读约定

- 文中所有代码块都可以直接复制执行。Superpowers 自带的 `writing-skills` Skill 对文档里的命令做过验证。
- 涉及到 Agent 内部命令(如 Claude Code 的 `/plugin install`、OpenCode 的 install 流程),在不同 Agent 中名称略有差异,原项目按"harness"区分,本教程保持原项目命名。
- 教程截止于 Superpowers `v6.0.3`(2026-06-18 发布)。新版本可能新增 Skills,但工作流主干不变。

## 下一步

[开始安装 →](/superpowers/install)
