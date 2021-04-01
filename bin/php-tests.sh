#!/usr/bin/env bash

set +x

if [ $# -lt 3 ]; then
	echo "usage: $0 <db-name> <db-user> <db-pass> [db-host] [skip-database-creation] [phpunit]"
	exit 1
fi

DB_NAME=$1
DB_USER=$2
DB_PASS=$3
DB_HOST=${4-localhost}
SKIP_DB_CREATE=${5-false}
PHPUNIT_PATH=${6-false}

WP_VERSION=${WP_VERSION:-latest}
TMPDIR=${TMPDIR-/tmp}
TMPDIR=$(echo $TMPDIR | sed -e "s/\/$//")

PROJECT_DIR=$( git rev-parse --show-toplevel )
PROJECT_SLUG=${PROJECT_SLUG:-$( basename "$PROJECT_DIR" | sed 's/^wp-//' )}


if [ -z "$PROJECT_TYPE" ]; then
	if [ -e style.css ]; then
		PROJECT_TYPE=theme
	elif grep -isqE "^[     ]*\*[     ]*Plugin Name[     ]*:" "$PROJECT_DIR"/*.php; then
		PROJECT_TYPE=plugin
	elif [ $( find . -maxdepth 2 -name wp-config.php | wc -l | sed 's/ //g' ) -gt 0 ]; then
		PROJECT_TYPE=site
	else
		PROJECT_TYPE=unknown
	fi
fi

export WP_TESTS_DIR=${WP_TESTS_DIR-$TMPDIR/wordpress-tests}
export WP_CORE_DIR=${WP_CORE_DIR-$TMPDIR/wordpress/}

echo "WP_TESTS_DIR is $WP_TESTS_DIR"
echo "WP_CORE_DIR is $WP_CORE_DIR"

function download() {
    if [ `which curl` ]; then
        curl -s "$1" > "$2";
    elif [ `which wget` ]; then
        wget -nv -O "$2" "$1"
	else
		echo 'wget or curl not found'
		return 1
    fi
}

function verbose_arg {
	if [ "$VERBOSE" == 1 ]; then
		echo '-v'
	fi
}

if [[ $WP_VERSION =~ ^[0-9]+\.[0-9]+$ ]]; then
	WP_TESTS_TAG="branches/$WP_VERSION"
elif [[ $WP_VERSION =~ [0-9]+\.[0-9]+\.[0-9]+ ]]; then
	if [[ $WP_VERSION =~ [0-9]+\.[0-9]+\.[0] ]]; then
		# version x.x.0 means the first release of the major version, so strip off the .0 and download version x.x
		WP_TESTS_TAG="tags/${WP_VERSION%??}"
	else
		WP_TESTS_TAG="tags/$WP_VERSION"
	fi
elif [[ $WP_VERSION == 'nightly' || $WP_VERSION == 'trunk' ]]; then
	WP_TESTS_TAG="trunk"
else
	# http serves a single offer, whereas https serves multiple. we only want one
	download http://api.wordpress.org/core/version-check/1.7/ /tmp/wp-latest.json

	LATEST_VERSION=$(grep -o '"version":"[^"]*' /tmp/wp-latest.json | sed 's/"version":"//')
	if [[ -z "$LATEST_VERSION" ]]; then
		echo "Latest WordPress version could not be found"
		exit 1
	fi
	WP_TESTS_TAG="tags/$LATEST_VERSION"
fi

echo "WP_TESTS_TAG is $WP_TESTS_TAG"

function install_wp() {

	if [ -d $WP_CORE_DIR ]; then
		return;
	fi

	mkdir -p $WP_CORE_DIR

	if [[ $WP_VERSION == 'nightly' || $WP_VERSION == 'trunk' ]]; then
		mkdir -p $TMPDIR/wordpress-nightly
		echo "Installing WP from https://wordpress.org/nightly-builds/wordpress-latest.zip to $WP_CORE_DIR"

		download https://wordpress.org/nightly-builds/wordpress-latest.zip  $TMPDIR/wordpress-nightly/wordpress-nightly.zip
		unzip -q $TMPDIR/wordpress-nightly/wordpress-nightly.zip -d $TMPDIR/wordpress-nightly/
		mv $TMPDIR/wordpress-nightly/wordpress/* $WP_CORE_DIR
	else
		if [ $WP_VERSION == 'latest' ]; then
			local ARCHIVE_NAME='latest'
		elif [[ $WP_VERSION =~ [0-9]+\.[0-9]+ ]]; then
			# https serves multiple offers, whereas http serves single.
			download https://api.wordpress.org/core/version-check/1.7/ $TMPDIR/wp-latest.json
			if [[ $WP_VERSION =~ [0-9]+\.[0-9]+\.[0] ]]; then
				# version x.x.0 means the first release of the major version, so strip off the .0 and download version x.x
				LATEST_VERSION=${WP_VERSION%??}
			else
				# otherwise, scan the releases and get the most up to date minor version of the major release
				local VERSION_ESCAPED=`echo $WP_VERSION | sed 's/\./\\\\./g'`
				LATEST_VERSION=$(grep -o '"version":"'$VERSION_ESCAPED'[^"]*' $TMPDIR/wp-latest.json | sed 's/"version":"//' | head -1)
			fi
			if [[ -z "$LATEST_VERSION" ]]; then
				local ARCHIVE_NAME="wordpress-$WP_VERSION"
			else
				local ARCHIVE_NAME="wordpress-$LATEST_VERSION"
			fi
		else
			local ARCHIVE_NAME="wordpress-$WP_VERSION"
		fi

		echo "Installing WP from https://wordpress.org/${ARCHIVE_NAME}.tar.gz to $WP_CORE_DIR"
		download https://wordpress.org/${ARCHIVE_NAME}.tar.gz  $TMPDIR/wordpress.tar.gz
		tar --strip-components=1 -zxmf $TMPDIR/wordpress.tar.gz -C $WP_CORE_DIR
	fi

	echo "WP installed to $WP_CORE_DIR"

	download https://raw.github.com/markoheijnen/wp-mysqli/master/db.php $WP_CORE_DIR/wp-content/db.php
}

function install_test_suite() {
	# portable in-place argument for both GNU sed and Mac OSX sed
	if [[ $(uname -s) == 'Darwin' ]]; then
		local ioption='-i .bak'
	else
		local ioption='-i'
	fi

	echo "Installing Tests to $WP_TESTS_DIR"

	# set up testing suite if it doesn't yet exist
	if [ ! -d $WP_TESTS_DIR ]; then
		# set up testing suite
		mkdir -p $WP_TESTS_DIR
		svn co --quiet https://develop.svn.wordpress.org/${WP_TESTS_TAG}/tests/phpunit/includes/ $WP_TESTS_DIR/includes
		svn co --quiet https://develop.svn.wordpress.org/${WP_TESTS_TAG}/tests/phpunit/data/ $WP_TESTS_DIR/data
	fi

	if [ ! -f wp-tests-config.php ]; then
		download https://develop.svn.wordpress.org/${WP_TESTS_TAG}/wp-tests-config-sample.php "$WP_TESTS_DIR"/wp-tests-config.php
		# remove all forward slashes in the end
		WP_CORE_DIR=$(echo $WP_CORE_DIR | sed "s:/\+$::")
		sed $ioption "s:dirname( __FILE__ ) . '/src/':'$WP_CORE_DIR/':" "$WP_TESTS_DIR"/wp-tests-config.php
		sed $ioption "s/youremptytestdbnamehere/$DB_NAME/" "$WP_TESTS_DIR"/wp-tests-config.php
		sed $ioption "s/yourusernamehere/$DB_USER/" "$WP_TESTS_DIR"/wp-tests-config.php
		sed $ioption "s/yourpasswordhere/$DB_PASS/" "$WP_TESTS_DIR"/wp-tests-config.php
		sed $ioption "s|localhost|${DB_HOST}|" "$WP_TESTS_DIR"/wp-tests-config.php
	fi
	echo "Tests installed to $WP_TESTS_DIR"
}

function install_db() {
	$(echo mysql -V)

	if [ ${SKIP_DB_CREATE} = "true" ]; then
		return 0
	fi

	# parse DB_HOST for port or socket references
	local PARTS=(${DB_HOST//\:/ })
	local DB_HOSTNAME=${PARTS[0]};
	local DB_SOCK_OR_PORT=${PARTS[1]};
	local EXTRA=""

	if ! [ -z $DB_HOSTNAME ] ; then
		if [ $(echo $DB_SOCK_OR_PORT | grep -e '^[0-9]\{1,\}$') ]; then
			EXTRA=" --host=$DB_HOSTNAME --port=$DB_SOCK_OR_PORT"
		elif ! [ -z $DB_SOCK_OR_PORT ] ; then
			EXTRA=" --socket=$DB_SOCK_OR_PORT"
		elif ! [ -z $DB_HOSTNAME ] ; then
			EXTRA=" --host=$DB_HOSTNAME"
		fi
	fi

	# create database
	mysqladmin create $DB_NAME --user="$DB_USER" --password="$DB_PASS"$EXTRA || true
	mysql --user="$DB_USER" --password="$DB_PASS" --execute="ALTER USER '$DB_USER'@'localhost' IDENTIFIED WITH mysql_native_password BY '$DB_PASS';";
}

function sync_project_dir() {
	if [ "$PROJECT_TYPE" == plugin ]; then
		INSTALL_PATH="$WP_CORE_DIR/wp-content/plugins/$PROJECT_SLUG"

		# Rsync the files into the right location
		mkdir -p "$INSTALL_PATH"
		rsync -a $(verbose_arg) --exclude .git/hooks --delete "$PROJECT_DIR/" "$INSTALL_PATH/"

		cd "$INSTALL_PATH"
		echo "Location: $INSTALL_PATH"
	elif [ "$PROJECT_TYPE" == theme ]; then
		INSTALL_PATH="$WP_CORE_DIR/wp-content/themes/$PROJECT_SLUG"

		# Rsync the files into the right location
		mkdir -p "$INSTALL_PATH"
		rsync -a $(verbose_arg) --exclude .git/hooks --exclude node_modules --delete "$PROJECT_DIR/" "$INSTALL_PATH/"
		cd "$INSTALL_PATH"

		# Clone the theme dependencies (i.e. plugins) into the plugins directory
		if [ ! -z "$THEME_GIT_PLUGIN_DEPENDENCIES" ]; then
			IFS=',' read -r -a dependencies <<< "$THEME_GIT_PLUGIN_DEPENDENCIES"
			for dep in "${dependencies[@]}"
			do
				filename=$(basename "$dep")
				git clone "$dep" "$WP_CORE_DIR/wp-content/plugins/${filename%.*}"
			done
		fi

		echo "Location: $INSTALL_PATH"
	elif [ "$PROJECT_TYPE" == site ]; then
		cd "$PROJECT_DIR"
		export INSTALL_PATH=$PROJECT_DIR
	fi
}

install_wp
install_test_suite
install_db
sync_project_dir

if [ "$COVERALLS" == true ]; then
	echo "Running PHP unit tests with coverage"
	composer test-coveralls
else
	echo "Running PHP unit tests"
	if [ "$PHPUNIT_PATH" == false ]; then
		composer test
	else
		echo "Using custom PHPUnit located at $PHPUNIT_PATH"
		$PHPUNIT_PATH
	fi
fi
