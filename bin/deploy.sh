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


# Print commands to the screen
set -x

# Build the plugin files
npm run build:js
npm run build:run

# Delete temp folder if it exists
rm -rf /tmp/temprepo

# Add host to known_hosts
ssh-keyscan -p2222 -H codeserver.dev.$PANTHEON_SITE_UUID.drush.in >> ~/.ssh/known_hosts

# Clone the Pantheon Git Repo to a temp folder
git clone ssh://codeserver.dev.$PANTHEON_SITE_UUID@codeserver.dev.$PANTHEON_SITE_UUID.drush.in:2222/~/repository.git /tmp/temprepo

# Copy over the repo files to the git repo
rsync -vrxc --delete ./build/ /tmp/temprepo/wp-content/plugins/material-design

pushd /tmp/temprepo || exit 1

# Add all files
git add .

# Output log of what changed, for debugging deploys
git status

# Commit Files
git commit --quiet -m "Deploying $TRAVIS_COMMIT"

# Deploy
git push origin master

popd || exit 1

# Stop printing commands to the screen
set +x
