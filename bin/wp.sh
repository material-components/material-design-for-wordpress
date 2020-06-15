#!/bin/bash

shopt -s expand_aliases
source ./bin/includes.sh

docker-compose exec -u xfs cli wp $@
