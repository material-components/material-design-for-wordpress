#! /bin/bash
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


# NOTE: At the moment, this has only been confirmed to work with PHP 7

source ./bin/includes.sh

# Grab full name of wordpress container
WORDPRESS_CONTAINER=$(docker ps | grep wordpress | awk '{print $1}')

if [[ '' == $WORDPRESS_CONTAINER ]]; then
	echo -e "$(error_message "The WordPress Docker container must be running!")"
	echo -e "Execute the following command: $(action_format "npm run env:start")"
	echo ""
	exit 0
fi

# Grab OS type
if [[ "$(uname)" == "Darwin" ]]; then
    OS_TYPE="OSX"
else
    OS_TYPE=$(expr substr $(uname -s) 1 5)
fi

xdebug_status () {
    printf "Getting Xdebug status ... "

    # If running on Windows, need to prepend with winpty :(
    if [[ ${OS_TYPE} == "MINGW" ]]; then
        STATUS=`winpty docker exec -it ${WORDPRESS_CONTAINER} bash -c 'php -v'`
    else
        STATUS=`docker exec -it ${WORDPRESS_CONTAINER} bash -c 'php -v'`
    fi

    printf "$(action_format "done")"
   	echo ""
    echo "$(action_format "$STATUS")"
}

xdebug_on () {
    printf "Turning Xdebug ON ... ";

    # And uncomment line with xdebug extension, thus enabling it
    ON_CMD="sed -i 's/^;zend_extension=/zend_extension=/g' \
                    /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini"

    # If running on Windows, need to prepend with winpty :(
    if [[ ${OS_TYPE} == "MINGW" ]]; then
        winpty docker exec -it ${WORDPRESS_CONTAINER} bash -c "${ON_CMD}"
    else
        docker exec -it ${WORDPRESS_CONTAINER} bash -c "${ON_CMD}"
    fi

    printf "$(action_format "done")";
   	echo ""

    container_restart
}

xdebug_off () {
    printf "Turning Xdebug OFF ... ";

    # Comment out xdebug extension line
    OFF_CMD="sed -i 's/^zend_extension=/;zend_extension=/g' /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini"

    # If running on Windows, need to prepend with winpty :(
    if [[ ${OS_TYPE} == "MINGW" ]]; then
        # This is the equivalent of:
        # winpty docker exec -it kurly_finance_php_wordpress_1 bash -c 'bla bla bla'
        # Thanks to @michaelarnauts at https://github.com/docker/compose/issues/593
        winpty docker exec -it ${WORDPRESS_CONTAINER} bash -c "${OFF_CMD}"
    else
        docker exec -it ${WORDPRESS_CONTAINER} bash -c "${OFF_CMD}"
    fi

    printf "$(action_format "done")";
   	echo ""

    container_restart
}

container_restart () {
    # docker-compose restart wordpress
    printf "Restarting container ... "

    docker restart ${WORDPRESS_CONTAINER} >/dev/null

    printf "$(action_format "done")";
   	echo ""

    xdebug_status
}

case $@ in
    off|OFF)
        xdebug_off
        ;;
    on|ON)
        xdebug_on
        ;;
    status|STATUS)
        xdebug_status
        ;;
    *)
        echo "Usage:"
        echo "  $(action_format "bin/xdebug") ($(action_format "off")|$(action_format "on")|$(action_format "status"))"
esac

exit 0
