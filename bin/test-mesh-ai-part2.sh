#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")" && pwd)"
source "$SCRIPT_DIR/pre-run.sh"

npm install -g newman --no-fund --no-audit --loglevel=error

timeout 60 bash "$SCRIPT_DIR/newman.sh" "$SCRIPT_DIR/collections/mesh_ai_tests_2.json" \
  --env-var "base_url=http://localhost:3000" \
  --env-var "test_user_email=elisebouer@gmail.com" \
  --env-var "test_user_pwd=1234Abcd@" \
  --env-var "test_user_name=Elise Bouer" \
  --env-var "test_user_email_2=test_user2@example.com" \
  --env-var "test_user_pwd_2=1234abc_d2" \
  --env-var "auth_token=" \
  --env-var "bad_auth_token=invalid.auth.token" \
  --env-var "invalid_id=27eab8326e50a5b30520f1a6" \
  --env-var "chat_id=" \
  --env-var "document_id="

check $?