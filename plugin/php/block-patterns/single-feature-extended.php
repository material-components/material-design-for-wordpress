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
 * Single feature extended pattern.
 *
 * @package MaterialDesign
 */

use function MaterialDesign\Plugin\get_plugin_instance;

$image = esc_url( get_plugin_instance()->asset_url( 'assets/images/placeholder.png' ) );

return [
	'title'         => __( 'Single Feature Extended', 'material-design' ),
	'content'       => "<!-- wp:columns {\"align\":\"wide\"} -->\n<div class=\"wp-block-columns alignwide\"><!-- wp:column -->\n<div class=\"wp-block-column\"><!-- wp:material/image-list {\"ids\":[],\"style\":\"grid\",\"columns\":{\"desktop\":2,\"tablet\":3,\"mobile\":1}} -->\n<div class=\"wp-block-material-image-list\" id=\"block-material-image-list-1\"><ul class=\"mdc-image-list mdc-image-list--with-text-protection\"><li class=\"mdc-image-list__item\"><a class=\"mdc-image-list__item-wrap\" href=\"$image\"><div class=\"mdc-image-list__image-aspect-container\"><img class=\"mdc-image-list__image\" alt=\"\" src=\"$image\" data-link=\"$image\"/></div></a></li><li class=\"mdc-image-list__item\"><a class=\"mdc-image-list__item-wrap\" href=\"$image\"><div class=\"mdc-image-list__image-aspect-container\"><img class=\"mdc-image-list__image\" alt=\"\" src=\"$image\" data-link=\"$image\"/></div></a></li><li class=\"mdc-image-list__item\"><a class=\"mdc-image-list__item-wrap\" href=\"$image\"><div class=\"mdc-image-list__image-aspect-container\"><img class=\"mdc-image-list__image\" alt=\"\" src=\"$image\" data-link=\"$image\"/></div></a></li><li class=\"mdc-image-list__item\"><a class=\"mdc-image-list__item-wrap\" href=\"$image\"><div class=\"mdc-image-list__image-aspect-container\"><img class=\"mdc-image-list__image\" alt=\"\" src=\"$image\" data-link=\"$image\"/></div></a></li></ul></div>\n<!-- /wp:material/image-list --></div>\n<!-- /wp:column -->\n<!-- wp:column -->\n<div class=\"wp-block-column\"><!-- wp:heading {\"level\":3} -->\n<h3>Headline</h3>\n<!-- /wp:heading -->\n<!-- wp:paragraph -->\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec sapien nunc. Curabitur vestibulum leo vel neque consequat, a dictum nibh lacinia. Suspendisse sit amet enim velit. Suspendisse semper leo nibh, in venenatis orci blandit sagittis. </p>\n<!-- /wp:paragraph -->\n<!-- wp:material/list {\"style\":\"two-line\"} -->\n<div class=\"wp-block-material-list\"><ul class=\"mdc-list mdc-list--two-line\"><li class=\"mdc-list-item\"><span class=\"mdc-list-item__graphic material-icons\">spa</span><span class=\"mdc-list-item__text\"><span class=\"mdc-list-item__primary-text\">Headline</span><span class=\"mdc-list-item__secondary-text\">One line description</span></span></li><li class=\"mdc-list-item\"><span class=\"mdc-list-item__graphic material-icons\">spa</span><span class=\"mdc-list-item__text\"><span class=\"mdc-list-item__primary-text\">Headline</span><span class=\"mdc-list-item__secondary-text\">One line description</span></span></li><li class=\"mdc-list-item\"><span class=\"mdc-list-item__graphic material-icons\">spa</span><span class=\"mdc-list-item__text\"><span class=\"mdc-list-item__primary-text\">Headline</span><span class=\"mdc-list-item__secondary-text\">One line description</span></span></li></ul></div>\n<!-- /wp:material/list -->\n<!-- wp:spacer {\"height\":24} -->\n<div style=\"height:24px\" aria-hidden=\"true\" class=\"wp-block-spacer\"></div>\n<!-- /wp:spacer -->\n<!-- wp:material/buttons -->\n<div class=\"wp-block-material-buttons\"><!-- wp:material/button -->\n<div class=\"wp-block-material-button\" id=\"block-material-button-7\"><button class=\"mdc-button mdc-button--raised\"><i class=\"material-icons mdc-button__icon\">spa</i><div class=\"mdc-button__ripple\"></div><span class=\"mdc-button__label\">Call to action</span></button></div>\n<!-- /wp:material/button --></div>\n<!-- /wp:material/buttons --></div>\n<!-- /wp:column --></div>\n<!-- /wp:columns -->",
	'viewportWidth' => 800,
	'categories'    => [ 'material' ],
	'description'   => __( 'Single Feature Extended pattern.', 'material-design' ),
];
