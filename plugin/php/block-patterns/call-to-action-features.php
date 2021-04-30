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
 * 3 Features with icon and CTA.
 *
 * @package MaterialDesign
 */

return [
	'title'         => __( 'Features with icon + Call to action (CTA)', 'material-design' ),
	'content'       => "<!-- wp:group {\"align\":\"wide\"} -->\n<div class=\"wp-block-group alignwide\"><div class=\"wp-block-group__inner-container\"><!-- wp:heading {\"textAlign\":\"center\"} -->\n<h2 class=\"has-text-align-center\">Features</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph {\"align\":\"center\",\"fontSize\":\"medium\"} -->\n<p class=\"has-text-align-center has-medium-font-size\">Lorem ipsum dolor sit amet consectetur adipiscing</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:columns -->\n<div class=\"wp-block-columns\"><!-- wp:column -->\n<div class=\"wp-block-column\"><!-- wp:material/icon {\"iconSize\":\"48\",\"align\":\"center\"} -->\n<div class=\"wp-block-material-icon has-text-align-center\"><i class=\"material-icons md-48\">security</i></div>\n<!-- /wp:material/icon -->\n\n<!-- wp:heading {\"textAlign\":\"center\",\"level\":5} -->\n<h5 class=\"has-text-align-center\">Feature 1</h5>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph {\"align\":\"center\"} -->\n<p class=\"has-text-align-center\">Arcu fusce convallis quam pharetra suspendisse porta auctor, fames quis sollicitudin torquent tempus ullamcor.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:material/buttons {\"align\":\"center\"} -->\n<div class=\"wp-block-material-buttons aligncenter\"><!-- wp:material/button {\"iconPosition\":\"none\"} -->\n<div class=\"wp-block-material-button\" id=\"block-material-button-0\"><button class=\"mdc-button mdc-button--raised\"><div class=\"mdc-button__ripple\"></div><span class=\"mdc-button__label\">Call to action</span></button></div>\n<!-- /wp:material/button --></div>\n<!-- /wp:material/buttons -->\n\n<!-- wp:spacer {\"height\":30} -->\n<div style=\"height:30px\" aria-hidden=\"true\" class=\"wp-block-spacer\"></div>\n<!-- /wp:spacer --></div>\n<!-- /wp:column -->\n\n<!-- wp:column -->\n<div class=\"wp-block-column\"><!-- wp:material/icon {\"iconSize\":\"48\",\"align\":\"center\"} -->\n<div class=\"wp-block-material-icon has-text-align-center\"><i class=\"material-icons md-48\">web</i></div>\n<!-- /wp:material/icon -->\n\n<!-- wp:heading {\"textAlign\":\"center\",\"level\":5} -->\n<h5 class=\"has-text-align-center\">Feature 2</h5>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph {\"align\":\"center\"} -->\n<p class=\"has-text-align-center\">Quis eros molestie libero porttitor convallis, integer sed ullamcorper nunc pharetra cras vitae nisl inceptos.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:material/buttons {\"align\":\"center\"} -->\n<div class=\"wp-block-material-buttons aligncenter\"><!-- wp:material/button {\"iconPosition\":\"none\"} -->\n<div class=\"wp-block-material-button\" id=\"block-material-button-1\"><button class=\"mdc-button mdc-button--raised\"><div class=\"mdc-button__ripple\"></div><span class=\"mdc-button__label\">Call to action</span></button></div>\n<!-- /wp:material/button --></div>\n<!-- /wp:material/buttons -->\n\n<!-- wp:spacer {\"height\":30} -->\n<div style=\"height:30px\" aria-hidden=\"true\" class=\"wp-block-spacer\"></div>\n<!-- /wp:spacer --></div>\n<!-- /wp:column -->\n\n<!-- wp:column -->\n<div class=\"wp-block-column\"><!-- wp:material/icon {\"iconSize\":\"48\",\"align\":\"center\"} -->\n<div class=\"wp-block-material-icon has-text-align-center\"><i class=\"material-icons md-48\">offline_bolt</i></div>\n<!-- /wp:material/icon -->\n\n<!-- wp:heading {\"textAlign\":\"center\",\"level\":5} -->\n<h5 class=\"has-text-align-center\">Feature 3</h5>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph {\"align\":\"center\"} -->\n<p class=\"has-text-align-center\">Placerat aptent ullamcorper vestibulum netus magnis eros id mauris, curae rutrum inceptos eleifend.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:material/buttons {\"align\":\"center\"} -->\n<div class=\"wp-block-material-buttons aligncenter\"><!-- wp:material/button {\"iconPosition\":\"none\"} -->\n<div class=\"wp-block-material-button\" id=\"block-material-button-2\"><button class=\"mdc-button mdc-button--raised\"><div class=\"mdc-button__ripple\"></div><span class=\"mdc-button__label\">Call to Action</span></button></div>\n<!-- /wp:material/button --></div>\n<!-- /wp:material/buttons -->\n\n<!-- wp:spacer {\"height\":30} -->\n<div style=\"height:30px\" aria-hidden=\"true\" class=\"wp-block-spacer\"></div>\n<!-- /wp:spacer --></div>\n<!-- /wp:column --></div>\n<!-- /wp:columns --></div></div>\n<!-- /wp:group -->",
	'viewportWidth' => 800,
	'categories'    => [ 'material', 'buttons', 'header' ],
	'description'   => __( '3 features with icon + call to action', 'material-design' ),
];
