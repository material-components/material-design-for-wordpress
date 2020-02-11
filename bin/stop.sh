#!/bin/bash

source ./bin/includes.sh

printf "Shutting down containers ... "

docker-compose down 2>/dev/null

printf "$(action_format "done")"
echo ""
echo ""
