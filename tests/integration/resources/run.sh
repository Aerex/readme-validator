#!/bin/bash

if [ -d "tmp" ]; then
    rm -rf tmp
    mkdir tmp
else
    mkdir tmp
fi

cd tmp
curl -o jq https://github.com/stedolan/jq/releases/download/jq-1.5/jq-linux64
chmod +x ./jq

URL="${1}/validate"
BODY=${2}
RESPONSE=`curl -s -S -L  -XPOST ${URL} -H 'cache-control: no-cache' -H 'Content-Type: application/json' -d "${BODY}"`
STATUS=`echo ${RESPONSE} | jq '.status'`
ERRORS=`echo ${RESPONSE} | jq '.errors'`

if [ ! "$STATUS" == "\"PASS\"" ]; then
     echo "README Failed check"
     echo "${ERRORS}"
     exit -1
else
    echo "Passed check!"
    exit 0
fi

BASEDIR=$(dirname $0)
