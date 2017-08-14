#!/bin/bash

URL="${1}/validate"
BODY=${2}
RESPONSE=`curl -s -S -L  -XPOST ${URL} -H 'cache-control: no-cache' -H 'Content-Type: application/json' -d "${BODY}"`

STATUS=`node -e "console.log(JSON.parse('${RESPONSE}').status)"`
echo "Status ${STATUS}"
ERRORS=`node -e "console.log(JSON.parse('${RESPONSE}').errors)"`

if [ ! "$STATUS" == "PASS" ]; then
     echo "README Failed check"
     echo "${ERRORS}"
     exit -1
else
    echo "Passed check!"
    exit 0
fi
