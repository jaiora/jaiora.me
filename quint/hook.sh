#!/usr/bin/env bash
# Хук Claude Code (PostToolUse на Write|Edit): правка в quint/ → прогон правил PRACTICES.md.
# specs/<модель>.qnt — только эта модель; run.sh / TEMPLATE.qnt — все. Нарушение → код 2: Claude видит вывод и чинит.
set -u
f=$(jq -r '.tool_input.file_path // .tool_response.filePath // empty')
case "$f" in
  */quint/specs/*.qnt) model=$(basename "$f" .qnt) ;;
  */quint/run.sh|*/quint/TEMPLATE.qnt) model="" ;;
  *) exit 0 ;;
esac
cd "$(dirname "$0")"
out=$(SAMPLES="${SAMPLES:-3000}" bash run.sh $model 2>&1)
code=$?
[ $code -eq 0 ] && exit 0
echo "quint/run.sh ${model:-(все модели)} — правила PRACTICES.md нарушены:" >&2
echo "$out" | grep -E "━━|⚠|←|failed|failing" | head -40 >&2
exit 2
