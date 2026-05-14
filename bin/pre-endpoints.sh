#!/bin/bash
source ./bin/pre-run.sh

npm ci --no-fund --no-audit
node ./dist/pre-endpoint-tests.js ../

check $?