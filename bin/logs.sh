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
