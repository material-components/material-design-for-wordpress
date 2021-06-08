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
 * Single feature pattern.
 *
 * @package MaterialDesign
 */

use function MaterialDesign\Plugin\get_plugin_instance;

$image = esc_url( get_plugin_instance()->asset_url( 'assets/images/placeholder.png' ) );

return [
	'title'         => __( 'Single Feature', 'material-design' ),
	'content'       => "<!-- wp:columns {\"align\":\"wide\"} -->\n<div class=\"wp-block-columns alignwide\"><!-- wp:column -->\n<div class=\"wp-block-column\"><!-- wp:image -->\n<figure class=\"wp-block-image size-large\"><img src=\"$image\" alt=\"\" /></figure>\n<!-- /wp:image --></div>\n<!-- /wp:column -->\n<!-- wp:column -->\n<div class=\"wp-block-column\"><!-- wp:heading {\"level\":3} -->\n<h3>Headline</h3>\n<!-- /wp:heading -->\n<!-- wp:paragraph -->\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec sapien nunc. Curabitur vestibulum leo vel neque consequat, a dictum nibh lacinia. Suspendisse sit amet enim velit. Suspendisse semper leo nibh, in venenatis orci blandit sagittis. </p>\n<!-- /wp:paragraph -->\n<!-- wp:material/buttons -->\n<div class=\"wp-block-material-buttons\"><!-- wp:material/button -->\n<div class=\"wp-block-material-button\" id=\"block-material-button-7\"><button class=\"mdc-button mdc-button--raised\"><i class=\"material-icons mdc-button__icon\">spa</i><div class=\"mdc-button__ripple\"></div><span class=\"mdc-button__label\">Call to action</span></button></div>\n<!-- /wp:material/button --></div>\n<!-- /wp:material/buttons --></div>\n<!-- /wp:column --></div>\n<!-- /wp:columns -->",
	'viewportWidth' => 800,
	'categories'    => [ 'material' ],
	'description'   => __( 'Single Feature pattern.', 'material-design' ),
];
