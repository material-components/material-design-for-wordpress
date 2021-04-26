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
 * Hero pattern.
 *
 * @package MaterialDesign
 */

return [
	'title'         => __( 'Hero section', 'material-design' ),
	'content'       => "<!-- wp:cover {\"overlayColor\":\"cyan-bluish-gray\",\"minHeight\":575,\"minHeightUnit\":\"px\",\"contentPosition\":\"center center\",\"align\":\"full\",\"className\":\"is-position-center-center\"} -->\n<div class=\"wp-block-cover alignfull has-cyan-bluish-gray-background-color has-background-dim is-position-center-center\" style=\"min-height:575px\"><div class=\"wp-block-cover__inner-container\"><!-- wp:columns {\"align\":\"wide\"} -->\n<div class=\"wp-block-columns alignwide\"><!-- wp:column {\"width\":\"12%\"} -->\n<div class=\"wp-block-column\" style=\"flex-basis:12%\"><!-- wp:spacer -->\n<div style=\"height:100px\" aria-hidden=\"true\" class=\"wp-block-spacer\"></div>\n<!-- /wp:spacer --></div>\n<!-- /wp:column -->\n<!-- wp:column -->\n<div class=\"wp-block-column\"><!-- wp:spacer -->\n<div style=\"height:100px\" aria-hidden=\"true\" class=\"wp-block-spacer\"></div>\n<!-- /wp:spacer -->\n<!-- wp:heading {\"textAlign\":\"center\",\"textColor\":\"black\"} -->\n<h2 class=\"has-text-align-center has-black-color has-text-color\"><strong>Enormous Heading</strong></h2>\n<!-- /wp:heading -->\n<!-- wp:paragraph {\"align\":\"center\",\"style\":{\"color\":{\"text\":\"#2a2a2a\"}}} -->\n<p class=\"has-text-align-center has-text-color\" style=\"color:#2a2a2a\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed urna a augue lobortis finibus vel blandit est.</p>\n<!-- /wp:paragraph -->\n<!-- wp:material/buttons {\"align\":\"center\"} -->\n<div class=\"wp-block-material-buttons aligncenter\"><!-- wp:material/button -->\n<div class=\"wp-block-material-button\" id=\"block-material-button-13\"><button class=\"mdc-button mdc-button--raised\"><i class=\"material-icons mdc-button__icon\">spa</i><div class=\"mdc-button__ripple\"></div><span class=\"mdc-button__label\">CALL TO ACTION</span></button></div>\n<!-- /wp:material/button --></div>\n<!-- /wp:material/buttons -->\n<!-- wp:spacer -->\n<div style=\"height:100px\" aria-hidden=\"true\" class=\"wp-block-spacer\"></div>\n<!-- /wp:spacer --></div>\n<!-- /wp:column -->\n<!-- wp:column {\"width\":\"12%\"} -->\n<div class=\"wp-block-column\" style=\"flex-basis:12%\"><!-- wp:spacer -->\n<div style=\"height:100px\" aria-hidden=\"true\" class=\"wp-block-spacer\"></div>\n<!-- /wp:spacer --></div>\n<!-- /wp:column --></div>\n<!-- /wp:columns --></div></div>\n<!-- /wp:cover -->",
	'viewportWidth' => 800,
	'categories'    => [ 'material', 'header' ],
	'description'   => __( 'Hero section pattern.', 'material-design' ),
];
