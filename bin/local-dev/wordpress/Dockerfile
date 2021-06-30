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

ARG WP_VERSION
ARG PHP_VERSION

FROM wordpress:${WP_VERSION}-${PHP_VERSION}

# Setup user.
RUN groupadd --gid 1000 webserver \
  && useradd --uid 1000 --gid webserver --shell /bin/bash --create-home webserver

# Development tooling dependencies
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    bash \
    less \
    default-mysql-client \
    git \
    subversion \
    zip \
    unzip \
    curl \
    msmtp \
  && rm -rf /var/lib/apt/lists/*

RUN curl -s https://getcomposer.org/installer | php \
  && mv composer.phar /usr/local/bin/composer

# Include our custom config for PHP and Xdebug.
COPY config/php/* /usr/local/etc/php/conf.d/

# Setup xdebug.
RUN pecl install xdebug; \
	docker-php-ext-enable xdebug;
