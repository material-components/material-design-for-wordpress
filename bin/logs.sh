#!/bin/bash

source ./bin/includes.sh

# Grab full name of wordpress container
WORDPRESS_CONTAINER=$(docker ps | grep wordpress | awk '{print $1}')

if [[ '' == $WORDPRESS_CONTAINER ]]; then
	echo -e "$(error_message "The WordPress Docker container must be running!")"
	echo -e "Execute the following command: $(action_format "npm run env:start")"
	echo ""
	exit 0
fi

echo -e "Here comes the logs in real-time ... $(action_format "done")"
echo ""

docker-compose logs -f
