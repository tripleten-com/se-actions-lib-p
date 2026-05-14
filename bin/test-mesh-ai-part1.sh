#!/bin/bash
ls -al
source ./bin/pre-run.sh

npm install -g newman --no-fund --no-audit --loglevel=error

timeout 60 bash ./bin/newman.sh ./bin/mesh_ai_tests_1.json \
  --env-var "base_url=http://localhost:3000" \
  --env-var "chat_id=12345" \
  --env-var "document_id=12345"

check $?
