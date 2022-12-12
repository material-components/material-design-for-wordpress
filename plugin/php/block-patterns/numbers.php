<?php
/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @package MaterialDesign
 */

/**
 * Numbers with icons for statistic.
 *
 * @package MaterialDesign
 */
// phpcs:ignoreFile WordPressVIPMinimum.Security.Mustache.OutputNotation
return [
	'title'         => __( 'Numbers', 'material-design' ),
	'content'       => '<!-- wp:group {"align":"wide"} -->
<div class="wp-block-group alignwide"><!-- wp:heading {"textAlign":"center"} -->
<h2 class="has-text-align-center">Numbers</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":24}}} -->
<p class="has-text-align-center" style="font-size:24px">Some count that matters</p>
<!-- /wp:paragraph -->

<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column {"verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center"><!-- wp:material/icon {"iconSize":"36","align":"center"} -->
<div class="wp-block-material-icon has-text-align-center"><i class="material-icons md-36">thumb_up_off_alt</i></div>
<!-- /wp:material/icon -->

<!-- wp:heading {"textAlign":"center","level":3} -->
<h3 class="has-text-align-center">10k+</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">Sit amet consectetur adipiscing elit dui, diam nam facilisis</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":"30px"} -->
<div style="height:30px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer --></div>
<!-- /wp:column -->

<!-- wp:column {"verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center"><!-- wp:material/icon {"iconSize":"36","align":"center"} -->
<div class="wp-block-material-icon has-text-align-center"><i class="material-icons md-36">monetization_on</i></div>
<!-- /wp:material/icon -->

<!-- wp:heading {"textAlign":"center","level":3} -->
<h3 class="has-text-align-center">200%</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">Sit amet consectetur adipiscing elit dui, diam nam facilisis</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":"30px"} -->
<div style="height:30px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer --></div>
<!-- /wp:column -->

<!-- wp:column {"verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center"><!-- wp:material/icon {"iconSize":"36","align":"center"} -->
<div class="wp-block-material-icon has-text-align-center"><i class="material-icons md-36">file_download</i></div>
<!-- /wp:material/icon -->

<!-- wp:heading {"textAlign":"center","level":3} -->
<h3 class="has-text-align-center">2.5M</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">Sit amet consectetur adipiscing elit dui, diam nam facilisis</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":"30px"} -->
<div style="height:30px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:material/buttons {"align":"center"} -->
<div class="wp-block-material-buttons aligncenter"><!-- wp:material/button {"style":"elevated","iconPosition":"none","size":"large","elevationStyle":"filled"} -->
<div class="wp-block-material-button" id="block-material-button-2"><button class="mdc-button label-large mdc-button--filled is-large"><div class="mdc-button__ripple"></div><span class="mdc-button__label">GET STARTED</span></button></div>
<!-- /wp:material/button --></div>
<!-- /wp:material/buttons --></div>
<!-- /wp:group -->',
	'viewportWidth' => 800,
	'categories'    => [ 'material', 'buttons', 'header' ],
	'description'   => __( 'Numbers with icons for statistic', 'material-design' ),
];
