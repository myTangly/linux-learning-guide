#!/usr/bin/env bash
set -euo pipefail

project_dir="$(cd "$(dirname "$0")" && pwd)"
cd "$project_dir"

for file in Dockerfile compose.yaml site/index.html site/styles.css; do
  if [ ! -s "$file" ]; then
    printf 'missing_or_empty=%s\n' "$file" >&2
    exit 1
  fi
done

grep -q 'Linux 学习笔记' site/index.html
grep -q '8080:80' compose.yaml
grep -q 'HEALTHCHECK' Dockerfile

printf 'static_status=ok\n'

if [ "$#" -gt 0 ] && [ "$1" = "--running" ]; then
  body="$(curl --fail --silent --show-error http://localhost:8080/)"
  printf '%s' "$body" | grep -q 'Linux 学习笔记'
  printf 'http_status=ok\n'
fi

