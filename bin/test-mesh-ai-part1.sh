#!/bin/bash
source ./bin/pre-run.sh

npm install -g newman --no-fund --no-audit --loglevel=error

POSTMAN_COLLECTION_URL="https://api.postman.com/collections/40482199-33c508b7-90dc-44b6-8d1c-43e709420cc4?access_key=PMAT-01KA8PD5WSNB8NQMRSDW3GRXM0"

timeout 60 bash ./bin/newman.sh $POSTMAN_COLLECTION_URL

check $?
