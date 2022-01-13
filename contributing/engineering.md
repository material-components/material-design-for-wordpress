# Engineering guidelines

## Getting started

### Requirements

To contribute to this plugin, you need the following tools installed on your computer:

* PHP 5.6.20+ is required and WordPress 5.6+ or the [Gutenberg Plugin](https://wordpress.org/plugins/gutenberg/)
* [Composer](https://getcomposer.org/) - to install PHP dependencies.
* [Node.js](https://nodejs.org/en/) - to install JavaScript dependencies.
* [WordPress](https://wordpress.org/download/) - to run the actual plugin.
* [Docker](https://docs.docker.com/install/) - for a local development environment.

We use `npm` as the canonical task runner for the project. Some of the PHP related scripts are defined in `composer.json` but are not meant to be executed directly. You should be running a Node version matching the [current active LTS release](https://github.com/nodejs/Release#release-schedule) or newer for this plugin to work correctly. You can check your Node.js version by typing `node -v` in the Terminal prompt.

If you have an incompatible version of Node in your development environment, you can use [nvm](https://github.com/creationix/nvm) to change node versions on the command line:

```bash
nvm install
```

We suggest using a software package manager for installing the development dependencies such as [Homebrew](https://brew.sh) on MacOS:

```bash
brew install php composer node docker docker-compose
```

or [Chocolatey](https://chocolatey.org) for Windows:

```bash
choco install php composer node nodejs docker-compose
```

## Local environment

Since you need a WordPress environment to run the plugin, the quickest way to get up and running is to use the provided Docker setup. Install [Docker](https://docs.docker.com/install/) by following the instructions on their website. WordPress will be available on [localhost:8088](http://localhost:8088/). Ensure that no other Docker containers or services are using `mysql` port `3306` on your machine to avoid collisions.

Clone this project somewhere on your computer:

```bash
git clone git@github.com:material-components/material-design-for-wordpress.git material-design
cd material-design
```

Alternatively, you can use your own local WordPress environment and clone this repository right into your `wp-content/plugins` directory. However, the phpunit tests need Docker to be setup unless the environment can run them outside of the container.

Support for the following environments have been verified to work

* [WordPressDev Environment](https://github.com/GoogleChromeLabs/wordpressdev) created by Google

```bash
cd wp-content/plugins
git clone git@github.com:material-components/material-design-for-wordpress.git material-design
cd material-design
```

### Windows local enviorment
Use WordPress's [wp-env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/).

1. Install wp-env as mentioned above.
2. Start with `wp-env start` (Assuming you have `wp-env` installed globally with updated PATH variable or use `npx wp-env start` to execute from repository's node_modules):
3. Activate material plugin and theme.

Setup the development tools using [Node.js](https://nodejs.org) and [Composer](https://getcomposer.org):

```bash
npm install
```

_This will automatically install the `pre-commit` hook from the `wp-dev-lib` Composer package and setup the unit tests._

Start the the Docker environment:

```bash
npm run env:start
```

_**Important**: You must execute this command before the `pre-commit` hook will work properly. This is because the unit tests depend on the MySQL database being initialized. The first time you run this command the Docker image needs to be built and could take several minutes to complete, so have patience young Padawan._

If everything was successful, you'll see this on your screen:

```bash
Starting up containers ... done

Welcome to the Material Design plugin for WordPress

Run npm run dev to build the latest version of the Material Design plugin,
then open http://localhost:8088/ to get started!
```

Stop the Docker environment:

```bash
npm run env:stop
```

_Be sure to do this when you are done developing so you free up `mysql` port `3306` and do not leave your containers running._

See the Docker environment logs:

```bash
npm run env:logs
```

Build of the JavaScript files:

```bash
npm run build:js
```

Next, install WordPress in your browser by going to `http://localhost:8088`, or the following `wp-cli` command:

```bash
wp core install --title=WordPress --admin_user=admin --admin_password=password --admin_email=admin@example.com --skip-email --url=http://localhost:8088 --quiet
```

If running `wp-cli` from the included Docker environment use this commands:

```bash
npm run wp -- wp core install --title=WordPress --admin_user=admin --admin_password=password --admin_email=admin@example.com --skip-email --url=http://localhost:8088 --quiet
```

_You will likely need to stop and start the Docker containers after running this command to ensure the plugin is mounted in the Docker container to activate._

Lastly, to get the plugin running in your WordPress install, activate the plugin via the WordPress dashboard, or the following `wp-cli` command:

```bash
wp plugin activate material-design
```

If running `wp-cli` from the included Docker environment use this commands:

```bash
npm run wp -- wp plugin activate material-design
```

_This command assumes you went through the WordPress install process already_

Visit [localhost:8025](http://localhost:8025) to check all emails sent by WordPress.

## Developing the plugin

Whether you use the pre-existing local environment or a custom one, any PHP code changes will be directly visible during development.

However, for JavaScript this involves a build process. To watch for any JavaScript file changes and re-build it when needed, you can run the following command:

```bash
npm run dev
```

_This way you will get a development build of the JavaScript, which makes debugging easier._

To get a production build, run:

```bash
npm run build:js
```

To update the WordPress version you can use wp-cli:
```bash
npm run wp -- wp core update --version=5.8
# or
npm run wp -- wp core update --version=nightly
```

## Continuous Integration

We use GitHub actions to lint all code, run tests and report test coverage to [Coveralls](https://coveralls.io). GitHub action will run the unit tests and perform sniffs against the WordPress Coding Standards whenever you push changes to your PR. Tests are required to pass successfully for a merge to be considered.

### Branches

The branching strategy follows the [GitFlow schema](https://datasift.github.io/gitflow/IntroducingGitFlow.html); make sure to familiarize yourself with it.

All branches are named with with the following pattern: `{type}`/`{issue_id}`-`{short_description}`

*   `{type}` = issue Type label
*   `{issue_id}` = issue ID
*   `{short_description}` = short description of the PR

To include your changes in the next patch release (e.g. `1.0.x`), please base your branch off of the current release branch (e.g. `1.0.0`) and open your pull request back to that branch. If you open your pull request with the `develop` branch then it will be by default included in the next minor version (e.g. `1.x.x`).

### Code reviews

All submissions, including submissions by project members, require review. We use GitHub pull requests for this purpose. Consult [GitHub Help](https://help.github.com/articles/about-pull-requests/) for more information on using pull requests.

### Coding standards

All contributions to this project will be checked against [WordPress-Coding-Standards](https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards) with [PHPCS](https://github.com/squizlabs/PHP_CodeSniffer), [stylelint](https://www.npmjs.com/package/stylelint-config-wordpress) for CSS, and for JavaScript linting is done with [ESLint](https://eslint.org/).

To verify your code meets the requirements, you can run `npm run lint`.

- `npm run lint:css` to lint the CSS files with [stylelint](https://www.npmjs.com/package/stylelint-config-wordpress).

- `npm run lint:js` to lint only JavaScript files with [eslint](https://eslint.org/).

- `npm run lint:php` to lint only PHP files with [phpcs](https://github.com/squizlabs/PHP_CodeSniffer).

To format your CSS, PHP, and JS code, you can run `npm run format`.

- `npm run format:css` to format the CSS files with [stylelint](https://www.npmjs.com/package/stylelint-config-wordpress).

- `npm run format:js` to format the JS files with [prettier](https://www.npmjs.com/package/prettier).

- `npm run format:php` to format the PHP files with [phpcbf](https://github.com/squizlabs/PHP_CodeSniffer).

### Tests

#### PHP Unit Tests

The plugin uses the [PHPUnit](https://phpunit.de/) testing framework to write unit and integration tests for the PHP part.

**Important**: The commands that execute phpunit tests or generate coverage reports (i.e. contain `test:php` in the name) should be executed inside the Docker container.

To run the full test suite, you can use the following command:

```bash
npm run docker -- npm run test
```

_This assumes you are using the built-in development environment and requires running the command from the Docker container_

```bash
npm run test:php
```

_This assumes you are using an alternative development environment that has all the required tools setup_

##### Xdebug

By default the container will be initialized with Xdebug on. Here are a few helper functions to check the status and turn on/off Xdebug.

Get the status of Xdebug in the running WordPress container:

```bash
npm run xdebug:status
```

Turn Xdebug on in the running WordPress container:

```bash
npm run xdebug:on
```

Turn Xdebug off the running WordPress container:

```bash
npm run xdebug:off
```

#### JavaScript Unit Tests

[Jest](https://jestjs.io/) is used as the JavaScript unit testing framework.

To run the full test suite, you can use the following command:

```bash
npm run test:js
```

#### JavaScript End-to-End Tests

[Jest](https://jestjs.io/) in combination with [Puppeteer](https://pptr.dev/) is used as the JavaScript end-to-end testing framework.

To run the full end-to-end test suite, you can use the following command:

```bash
npm run test:e2e
```

**Note**: If your installation is running on a different domain than `localhost:8088` and a
and you are using a different username and/or password, you might need to run the following command instead:

 ```bash
 npm run test:e2e -- --wordpress-base-url=http://your-domain-name:your-port --wordpress-username=your-admin-username --wordpress-password=your-admin-password
 ```

## Creating a plugin build

To create a build of the plugin for installing in WordPress as a ZIP package, run:

```bash
npm run build
```

This will create an `material-design.zip` in the plugin directory which you can install. The contents of this ZIP are also located in the `build` directory which you can `rsync` somewhere as well if needed.

## Creating a pre-release

1. Create changelog draft on [Wiki page](https://github.com/material-components/material-design-for-wordpress/wiki/Release-Changelog-Draft).
1. Check out the branch intended for release (`develop` for major, `x.y` for minor) and pull latest commits.
1. Bump plugin versions in `material-design.php`.
1. Do `npm install`.
1. Do `npm run build` and install the `material-design.zip` onto a normal WordPress install running a stable release build; do smoke test to ensure it works.
1. [Draft new release](https://github.com/material-components/material-design-for-wordpress/releases/new) on GitHub targeting the required branch (`develop` for major, `x.y` for minor).
    1. Use the new plugin version as the tag (e.g. `1.2-beta3` or `1.2.1-RC1`)
    1. Use new version as the title, followed by some highlight tagline of the release.
    1. Attach the `material-design.zip` build to the release.
    1. Add a changelog entry to the release, link to the compare view (comparing the previous release), and a link to the milestone.
    1. Make sure “Pre-release” is checked.
1. Publish GitHub release.
1. Create built release tag (from the just-created `build` directory):
    1. do `git fetch --tags && ./bin/tag-built.sh`
    1. Add link from release notes.
1. Bump version in release branch, e.g. `…-alpha` to `…-beta1` and `…-beta2` to `…-RC1`
1. Publish release blog post (if applicable), including link to GitHub release.

## Creating a stable release

Contributors who want to make a new release, follow these steps:

1. Create changelog draft on [Wiki page](https://github.com/material-components/material-design-for-wordpress/wiki/Release-Changelog-Draft).
    1. Gather props list of the entire release, including contributors of code, design, testing, project management, etc.
1. Update readme including the description, contributors, and screenshots (as needed).
1. For major release, draft blog post about the new release.
1. For minor releases, make sure all merged commits in `develop` have been also merged onto release branch.
1. Check out the branch intended for release (`develop` for major, `x.y` for minor) and pull latest commits.
1. Do `npm install`.
1. Bump plugin versions in `material-design.php`. Ensure patch version number is supplied for major releases, so `1.2-RC1` should bump to `1.2.0`.
1. Ensure "Tested Up To" is updated to current WordPress version.
1. Do `npm run build` and install the `material-design.zip` onto a normal WordPress install running a stable release build; do smoke test to ensure it works.
1. Optionally do sanity check by comparing the `build` directory with the previously-deployed plugin on WordPress.org for example: `svn export https://plugins.svn.wordpress.org/material-design/trunk /tmp/material-design-trunk; diff /tmp/material-design-trunk/ ./build/` (instead of straight `diff`, it's best to use a GUI like `idea diff`, `phpstorm diff`, or `opendiff`).
1. [Draft new release](https://github.com/material-components/material-design-for-wordpress/releases/new) on GitHub targeting the required branch (`develop` for major, `x.y` for minor):
    1. Use the new plugin version as the tag (e.g. `1.2.0` or `1.2.1`)
    1. Attach the `material-design.zip` build to the release.
    1. Add a changelog entry to the release, link to the compare view (comparing the previous release), and a link to the milestone.
1. Publish GitHub release.
1. Run `npm run deploy` to commit the plugin to WordPress.org.
1. Confirm the release is available on WordPress.org; try installing it on a WordPress install and confirm it works.
1. Create built release tag (from the just-created `build` directory):
    1. do `git fetch --tags && ./bin/tag-built.sh`
    1. Add link from release notes.
1. For new major releases, create a release branch from the tag. Patch versions are made from the release branch.
1. For minor releases, bump `Stable tag` in the `readme.txt`/`readme.md` in `develop`. Cherry-pick other changes as necessary.
1. Merge release tag into `master`.
1. Close the GitHub milestone (and project).
1. Bump version in release branch. After major release (e.g. `1.2.0`), bump to `1.3.0-alpha` on `develop`; after minor release (e.g. `1.2.1`) bump version to `1.2.2-alpha` on the release branch.
1. Publish release blog post (if applicable), including link to GitHub release.

## Changelog

Release changelogs are created by an automation script that accumulates changelog messages from issues associated with a given milestone.

### Changelog messages

* Changelog messages are added in the PR-related issue, within its reserved section, which is pre-populated from the issue template.
* Changelog messages start with a verb in its imperative form (e.g. “Fix bug xyz”), preferably one of the following words:
    * Add (for features)
    * Introduce (for features)
    * Enhance (for enhancements)
    * Improve (for enhancements)
    * Change (for misc changes)
    * Update (for misc changes)
    * Modify (for misc changes)
    * Remove (for removal)
    * Fix (for bug fixes)
    * N/A (skip changelog message)

### Changelog format

* The changelog messages are categorized as follows:
    * Added
    * Enhanced
    * Changed
    * Fixed
* Changelog messages are automatically assigned to one of the defined categories based on the first word the message starts with. Default: “Changed”.
* Changelogs with the message “N/A” are skipped.

Maintainers must ensure that changelog messages are clear and follow the formatting guidelines.
