#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")" && pwd)"
source "$SCRIPT_DIR/pre-run.sh"

npm install -g newman --no-fund --no-audit --loglevel=error

timeout 60 bash "$SCRIPT_DIR/newman.sh" "$SCRIPT_DIR/collections/mesh_ai_tests_2.json" \
  --env-var "base_url=http://localhost:3000" \
  --env-var "chat_id=12345" \
  --env-var "document_id=12345"

check $?