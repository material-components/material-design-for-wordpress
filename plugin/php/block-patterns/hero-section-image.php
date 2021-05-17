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
 * Hero section + image pattern.
 *
 * @package MaterialDesign
 */

use function MaterialDesign\Plugin\get_plugin_instance;

$image = esc_url( get_plugin_instance()->asset_url( 'assets/images/placeholder.png' ) );

return [
	'title'         => __( 'Hero section + Image', 'material-design' ),
	'content'       => "<!-- wp:group {\"align\":\"wide\"} --><div class=\"wp-block-group alignwide\"><div class=\"wp-block-group__inner-container\"><!-- wp:columns {\"align\":\"wide\"} --><div class=\"wp-block-columns alignwide\"><!-- wp:column --><div class=\"wp-block-column\"><!-- wp:heading --><h2>Landing Page Hero Section</h2><!-- /wp:heading --><!-- wp:paragraph --><p>Imperdiet taciti nostra pulvinar bibendum congue varius sapien, diam curae pellentesque quam auctor praesent nullam convallis, tincidunt urna suscipit litora netus dictum.</p><!-- /wp:paragraph --><!-- wp:material/buttons --><div class=\"wp-block-material-buttons\"><!-- wp:material/button {\"iconPosition\":\"none\"} --><div class=\"wp-block-material-button\" id=\"block-material-button-51\"><button class=\"mdc-button mdc-button--raised\"><div class=\"mdc-button__ripple\"></div><span class=\"mdc-button__label\">Get Started</span></button></div><!-- /wp:material/button --></div><!-- /wp:material/buttons --></div><!-- /wp:column --><!-- wp:column --><div class=\"wp-block-column\"><!-- wp:image {\"id\":127,\"sizeSlug\":\"large\",\"linkDestination\":\"none\"} --><figure class=\"wp-block-image size-large\"><img src=\"$image\" alt=\"\" class=\"wp-image-127\"/></figure><!-- /wp:image --></div><!-- /wp:column --></div><!-- /wp:columns --></div></div><!-- /wp:group -->",
	'viewportWidth' => 800,
	'categories'    => [ 'material', 'buttons', 'header', 'image' ],
	'description'   => __( 'Hero section with image', 'material-design' ),
];
