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
 * Logos pattern.
 *
 * @package MaterialDesign
 */

use function MaterialDesign\Plugin\get_plugin_instance;

$logo = esc_url( get_plugin_instance()->asset_url( 'assets/images/logo-place-holder.png' ) );

return [
	'title'         => __( 'Logos', 'material-design' ),
	'content'       => "<!-- wp:columns -->\n<div class=\"wp-block-columns\"><!-- wp:column -->\n<div class=\"wp-block-column\"><!-- wp:image -->\n<figure class=\"wp-block-image size-large\"><img src=\"$logo\" alt=\"\" /></figure>\n<!-- /wp:image --></div>\n<!-- /wp:column -->\n<!-- wp:column -->\n<div class=\"wp-block-column\"><!-- wp:image -->\n<figure class=\"wp-block-image size-large\"><img src=\"$logo\" alt=\"\"/></figure>\n<!-- /wp:image --></div>\n<!-- /wp:column -->\n<!-- wp:column -->\n<div class=\"wp-block-column\"><!-- wp:image -->\n<figure class=\"wp-block-image size-large\"><img src=\"$logo\" alt=\"\"/></figure>\n<!-- /wp:image --></div>\n<!-- /wp:column -->\n<!-- wp:column -->\n<div class=\"wp-block-column\"><!-- wp:image -->\n<figure class=\"wp-block-image size-large\"><img src=\"$logo\" alt=\"\"/></figure>\n<!-- /wp:image --></div>\n<!-- /wp:column -->\n<!-- wp:column -->\n<div class=\"wp-block-column\"><!-- wp:image -->\n<figure class=\"wp-block-image size-large\"><img src=\"$logo\" alt=\"\"/></figure>\n<!-- /wp:image --></div>\n<!-- /wp:column -->\n<!-- wp:column -->\n<div class=\"wp-block-column\"><!-- wp:image -->\n<figure class=\"wp-block-image size-large\"><img src=\"$logo\" alt=\"\"/></figure>\n<!-- /wp:image --></div>\n<!-- /wp:column --></div>\n<!-- /wp:columns -->",
	'viewportWidth' => 800,
	'categories'    => [ 'material' ],
	'description'   => __( 'Logos pattern.', 'material-design' ),
];
