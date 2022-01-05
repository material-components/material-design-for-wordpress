#!/bin/bash
set -e

#
# Copyright 2020 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

# Custom deployment script for Pantheon environment.
# Adapted from https://github.com/google/web-stories-wp/blob/ca31b552fc9fce8b567bda4b0f59e15e1ddbc22c/bin/deploy-to-test-environment.sh

echo "Initializing deployment to Material design theme and plugin to test environment"

PANTHEON_SITE="mdc-web"
PANTHEON_BRANCH=$1
PANTHEON_UUID="395bf65b-d336-4308-9c86-311e8ddce422"

cd "$(dirname "$0")/.."
project_dir="$(pwd)"
repo_dir="$HOME/deployment-targets/$PANTHEON_SITE"

echo "Setting up SSH configuration"

# Dynamic hosts through Pantheon mean constantly checking interactively
# that we mean to connect to an unknown host. We ignore those here.
echo "StrictHostKeyChecking no" > ~/.ssh/config

if ! grep -q "codeserver.dev.$PANTHEON_UUID.drush.in" ~/.ssh/known_hosts; then
    ssh-keyscan -p 2222 codeserver.dev.$PANTHEON_UUID.drush.in >> ~/.ssh/known_hosts
fi

if ! grep -q "codeserver.dev.$PANTHEON_UUID.drush.in" ~/.ssh/config; then
    echo "" >> ~/.ssh/config
    echo "Host $PANTHEON_SITE" >> ~/.ssh/config
    echo "  Hostname codeserver.dev.$PANTHEON_UUID.drush.in" >> ~/.ssh/config
    echo "  User codeserver.dev.$PANTHEON_UUID" >> ~/.ssh/config
    echo "  Port 2222" >> ~/.ssh/config
    echo "  KbdInteractiveAuthentication no" >> ~/.ssh/config
fi

echo "Fetching remote repository"

git config --global user.name "Travis CI"
git config --global user.email "travis-ci+$PANTHEON_SITE@example.org"

if [ ! -e "$repo_dir/.git" ]; then
    git clone -v ssh://codeserver.dev.$PANTHEON_UUID@codeserver.dev.$PANTHEON_UUID.drush.in:2222/~/repository.git "$repo_dir"
fi

cd "$repo_dir"
git fetch

if git rev-parse --verify --quiet "$PANTHEON_BRANCH" > /dev/null; then
    git checkout "$PANTHEON_BRANCH"
else
    git checkout -b "$PANTHEON_BRANCH"
fi

if git rev-parse --verify --quiet "origin/$PANTHEON_BRANCH" > /dev/null; then
    git reset --hard "origin/$PANTHEON_BRANCH"
fi

cd "$project_dir"

echo "Moving files to repository"

rm -rf "$repo_dir/wp-content/themes/material-design-google" "$repo_dir/wp-content/plugin/material-design"

unzip material-design.zip -d "$repo_dir/wp-content/themes"
unzip material-design-google.zip -d "$repo_dir/wp-content/themes/"

rsync -avz --delete ./build/material-design/ "$repo_dir/wp-content/plugins/material-design/"
git --no-pager log -1 --format="Build material theme and plugin at %h: %s" > /tmp/commit-message.txt

echo "Committing changes"

# Commit and deploy.
cd "$repo_dir"
git add -A "wp-content/plugins/material-design/" "wp-content/theme/material-design-google/"
git commit -F /tmp/commit-message.txt

echo "Pushing new build to remote repository"
git push origin $PANTHEON_BRANCH

echo "View site at http://$PANTHEON_BRANCH-$PANTHEON_SITE.pantheonsite.io/"
echo "Access Pantheon dashboard at https://dashboard.pantheon.io/sites/$PANTHEON_UUID#$PANTHEON_BRANCH"
