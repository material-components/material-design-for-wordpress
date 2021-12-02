#!/bin/bash
# Copyright 2020 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

source ./bin/includes.sh

printf "Starting up containers ..."

# Start the containers.
docker-compose up -d "$@"

if ! command_exists "curl"; then
	printf " $(action_format "unknown")"
	echo ""
	echo -e "$(error_message "The $(action_format "curl") command is not installed on your host machine.")"
	echo -e "$(warning_message "Checking that WordPress has been installed has failed.")"
	echo -e "$(warning_message "It could take a minute for the Database to become available.")"
else

	# Check for WordPress.
	until is_wp_available "localhost:8088"; do
		printf "."
		sleep 5
	done

	printf " $(action_format "done")"
	echo ""
fi

echo ""
echo "Welcome to the $(action_format "Material Design plugin for WordPress")"
echo ""

# Give the user more context to what they should do next: Build the plugin and start testing!
echo -e "Run $(action_format "npm run dev") to build the latest version of the Material Design plugin,"
echo -e "then open $(action_format "http://localhost:8088/") to get started!"
echo ""
