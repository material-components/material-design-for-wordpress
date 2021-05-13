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
 * Hero section pattern.
 *
 * @package MaterialDesign
 */

return [
	'title'         => __( 'Hero section', 'material-design' ),
	'content'       => "<!-- wp:group {\"align\":\"wide\"} -->\n<div class=\"wp-block-group alignwide\"><div class=\"wp-block-group__inner-container\"><!-- wp:heading {\"textAlign\":\"center\",\"level\":1} -->\n<h1 class=\"has-text-align-center\">Enormous Heading</h1>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph {\"align\":\"center\",\"fontSize\":\"medium\"} -->\n<p class=\"has-text-align-center has-medium-font-size\">Consectetur adipiscing elit, egestas volutpat fames imperdiet natoque tempor, turpis convallis lectus nascetur primis eget. Lorem ipsum dolor sit amet consectetur adipiscing elit suspendisse purus praesent.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:material/buttons {\"align\":\"center\"} -->\n<div class=\"wp-block-material-buttons aligncenter\"><!-- wp:material/button {\"iconPosition\":\"none\",\"size\":\"large\"} -->\n<div class=\"wp-block-material-button\" id=\"block-material-button-20\"><button class=\"mdc-button mdc-button--raised is-large\"><div class=\"mdc-button__ripple\"></div><span class=\"mdc-button__label\">Call to action</span></button></div>\n<!-- /wp:material/button --></div>\n<!-- /wp:material/buttons --></div></div>\n<!-- /wp:group -->",
	'viewportWidth' => 800,
	'categories'    => [ 'material', 'buttons', 'header' ],
	'description'   => __( 'Hero section', 'material-design' ),
];
