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
 * Highlights with list items and icons.
 *
 * @package MaterialDesign
 */

return [
	'title'         => __( 'Highlights', 'material-design' ),
	'content'       => '<!-- wp:columns {"align":"wide"} -->
<div class="wp-block-columns alignwide"><!-- wp:column {"verticalAlignment":"top","width":"30%"} -->
<div class="wp-block-column is-vertically-aligned-top" style="flex-basis:30%"><!-- wp:heading {"level":3} -->
<h3>Highlights</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Amet consectetur adipiscing elit fermentum, quis bibendum pretium sociis eros per habitasse, tempus conubia commodo enim urna malesuada placerat.</p>
<!-- /wp:paragraph -->

<!-- wp:material/buttons -->
<div class="wp-block-material-buttons"><!-- wp:material/button {"style":"elevated","iconPosition":"none","size":"large","elevationStyle":"outlined"} -->
<div class="wp-block-material-button" id="block-material-button-0"><button class="mdc-button label-large mdc-button--outlined is-large"><div class="mdc-button__ripple"></div><span class="mdc-button__label">Get started</span></button></div>
<!-- /wp:material/button --></div>
<!-- /wp:material/buttons -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"5%"} -->
<div class="wp-block-column" style="flex-basis:5%"></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:spacer {"height":"40px"} -->
<div style="height:40px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:material/icon {"iconSize":"48"} -->
<div class="wp-block-material-icon"><i class="material-icons md-48">lightbulb_outline</i></div>
<!-- /wp:material/icon -->

<!-- wp:heading {"level":5} -->
<h5>List item</h5>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Dolor sit amet consectetur adipiscing elit ullamcorper, dictumst ultrices rutrum malesuada turpis pretium rhoncus vitae tempor.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:spacer {"height":"40px"} -->
<div style="height:40px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:material/icon {"iconSize":"48"} -->
<div class="wp-block-material-icon"><i class="material-icons md-48">lightbulb_outline</i></div>
<!-- /wp:material/icon -->

<!-- wp:heading {"level":5} -->
<h5>List item</h5>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Dolor sit amet consectetur adipiscing elit ullamcorper, dictumst ultrices rutrum malesuada turpis pretium rhoncus vitae tempor.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:spacer {"height":"40px"} -->
<div style="height:40px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:material/icon {"iconSize":"48"} -->
<div class="wp-block-material-icon"><i class="material-icons md-48">spa</i></div>
<!-- /wp:material/icon -->

<!-- wp:heading {"level":5} -->
<h5>List item</h5>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Dolor sit amet consectetur adipiscing elit ullamcorper, dictumst ultrices rutrum malesuada turpis pretium rhoncus vitae tempor.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:spacer {"height":"40px"} -->
<div style="height:40px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:material/icon {"iconSize":"48"} -->
<div class="wp-block-material-icon"><i class="material-icons md-48">spa</i></div>
<!-- /wp:material/icon -->

<!-- wp:heading {"level":5} -->
<h5>List item</h5>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Dolor sit amet consectetur adipiscing elit ullamcorper, dictumst ultrices rutrum malesuada turpis pretium rhoncus vitae tempor.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->',
	'viewportWidth' => 800,
	'categories'    => [ 'material', 'header' ],
	'description'   => __( 'Highlights with list items with icons.', 'material-design' ),
];
