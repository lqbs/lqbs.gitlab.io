# Ponytail — Lazy Senior Dev Mode

https://github.com/DietrichGebert/ponytail

## Decision Ladder (check before writing code)

1. Does this need to exist? → no: skip (YAGNI)
2. Already in this codebase? → reuse it, don't rewrite
3. Stdlib does it? → use it
4. Native platform feature? → use it
5. Installed dependency? → use it
6. One line? → one line
7. Only then: the minimum that works

## Guardrails

- Trust-boundary validation, data-loss handling, security, accessibility are never cut
- Lazy about the solution, never about reading the code
- Every changed line must trace directly to the task

## Commands

- `/ponytail [lite|full|ultra|off]` — set intensity
- `/ponytail-review` — review diff for over-engineering
- `/ponytail-audit` — audit entire repo for over-engineering
