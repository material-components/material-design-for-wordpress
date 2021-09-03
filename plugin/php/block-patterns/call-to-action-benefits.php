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
 * Call to action with benefits pattern.
 *
 * @package MaterialDesign
 */

return [
	'title'         => __( 'Call to action (CTA) + Benefits', 'material-design' ),
	'content'       => "<!-- wp:group -->\n<div class=\"wp-block-group\"><!-- wp:heading {\"textAlign\":\"center\",\"align\":\"wide\"} -->\n<h2 class=\"alignwide has-text-align-center\">Call to action</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph {\"align\":\"center\"} -->\n<p class=\"has-text-align-center\">Perform this action in no time, satisfaction guaranteed.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:material/buttons {\"align\":\"center\"} -->\n<div class=\"wp-block-material-buttons aligncenter\"><!-- wp:material/button {\"iconPosition\":\"none\",\"size\":\"large\"} -->\n<div class=\"wp-block-material-button\" id=\"block-material-button-17\"><button class=\"mdc-button mdc-button--raised is-large\"><div class=\"mdc-button__ripple\"></div><span class=\"mdc-button__label\">Call to action</span></button></div>\n<!-- /wp:material/button --></div>\n<!-- /wp:material/buttons -->\n\n<!-- wp:spacer {\"height\":16} -->\n<div style=\"height:16px\" aria-hidden=\"true\" class=\"wp-block-spacer\"></div>\n<!-- /wp:spacer -->\n\n<!-- wp:columns -->\n<div class=\"wp-block-columns\"><!-- wp:column -->\n<div class=\"wp-block-column\"><!-- wp:material/list -->\n<div class=\"wp-block-material-list\"><ul class=\"mdc-list\"><li class=\"mdc-list-item\"><span class=\"mdc-list-item__graphic material-icons\">spa</span><span class=\"mdc-list-item__text\"><span class=\"mdc-list-item__primary-text\">Benefit 1</span></span></li></ul></div>\n<!-- /wp:material/list --></div>\n<!-- /wp:column -->\n\n<!-- wp:column -->\n<div class=\"wp-block-column\"><!-- wp:material/list -->\n<div class=\"wp-block-material-list\"><ul class=\"mdc-list\"><li class=\"mdc-list-item\"><span class=\"mdc-list-item__graphic material-icons\">favorite</span><span class=\"mdc-list-item__text\"><span class=\"mdc-list-item__primary-text\">Benefit 2</span></span></li></ul></div>\n<!-- /wp:material/list --></div>\n<!-- /wp:column -->\n\n<!-- wp:column -->\n<div class=\"wp-block-column\"><!-- wp:material/list -->\n<div class=\"wp-block-material-list\"><ul class=\"mdc-list\"><li class=\"mdc-list-item\"><span class=\"mdc-list-item__graphic material-icons\">check_circle</span><span class=\"mdc-list-item__text\"><span class=\"mdc-list-item__primary-text\">Benefit 3</span></span></li></ul></div>\n<!-- /wp:material/list --></div>\n<!-- /wp:column --></div>\n<!-- /wp:columns --></div>\n<!-- /wp:group -->",
	'viewportWidth' => 800,
	'categories'    => [ 'material', 'buttons', 'header' ],
	'description'   => __( 'Call to action + benefits pattern.', 'material-design' ),
];
