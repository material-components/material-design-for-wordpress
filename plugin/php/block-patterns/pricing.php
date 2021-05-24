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
 * Pricing pattern.
 *
 * @package MaterialDesign
 */

return [
	'title'         => __( 'Pricing', 'material-design' ),
	'content'       => "<!-- wp:group -->\n<div class=\"wp-block-group\"><div class=\"wp-block-group__inner-container\"><!-- wp:heading {\"textAlign\":\"center\",\"level\":4} -->\n<h4 class=\"has-text-align-center\">Pricing</h4>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph {\"align\":\"center\"} -->\n<p class=\"has-text-align-center\">Perform this action in no time, Satisfaction guaranteed.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:columns -->\n<div class=\"wp-block-columns\"><!-- wp:column {\"width\":\"\"} -->\n<div class=\"wp-block-column\"><!-- wp:heading {\"textAlign\":\"center\",\"level\":5} -->\n<h5 class=\"has-text-align-center\">Price title</h5>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph {\"align\":\"center\"} -->\n<p class=\"has-text-align-center\">Price Subtitle Description.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph {\"align\":\"center\",\"style\":{\"color\":{\"background\":\"#f0f0f0\"},\"typography\":{\"fontSize\":26}}} -->\n<p class=\"has-text-align-center has-background\" style=\"background-color:#f0f0f0;font-size:26px\">$ 9.99 / mo</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph {\"align\":\"center\"} -->\n<p class=\"has-text-align-center\">First feature included<br>Second feature included<br>Third feature included<br>Fourth feature included<br>Fifth feature included</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:material/buttons {\"align\":\"center\"} -->\n<div class=\"wp-block-material-buttons aligncenter\"><!-- wp:material/button {\"iconPosition\":\"none\"} -->\n<div class=\"wp-block-material-button\" id=\"block-material-button-0\"><button class=\"mdc-button mdc-button--raised\"><div class=\"mdc-button__ripple\"></div><span class=\"mdc-button__label\">Buy now</span></button></div>\n<!-- /wp:material/button --></div>\n<!-- /wp:material/buttons --></div>\n<!-- /wp:column -->\n\n<!-- wp:column -->\n<div class=\"wp-block-column\"><!-- wp:heading {\"textAlign\":\"center\",\"level\":5} -->\n<h5 class=\"has-text-align-center\">Price title</h5>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph {\"align\":\"center\"} -->\n<p class=\"has-text-align-center\">Price Subtitle Description.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph {\"align\":\"center\",\"style\":{\"typography\":{\"fontSize\":26},\"color\":{\"background\":\"#f0f0f0\"}}} -->\n<p class=\"has-text-align-center has-background\" style=\"background-color:#f0f0f0;font-size:26px\">$ 9.99 / mo</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph {\"align\":\"center\"} -->\n<p class=\"has-text-align-center\">First feature included<br>Second feature included<br>Third feature included<br>Fourth feature included<br>Fifth feature included</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:material/buttons {\"align\":\"center\"} -->\n<div class=\"wp-block-material-buttons aligncenter\"><!-- wp:material/button {\"iconPosition\":\"none\"} -->\n<div class=\"wp-block-material-button\" id=\"block-material-button-0\"><button class=\"mdc-button mdc-button--raised\"><div class=\"mdc-button__ripple\"></div><span class=\"mdc-button__label\">Buy now</span></button></div>\n<!-- /wp:material/button --></div>\n<!-- /wp:material/buttons --></div>\n<!-- /wp:column --></div>\n<!-- /wp:columns --></div></div>\n<!-- /wp:group -->", // phpcs:ignore WordPressVIPMinimum.Security.Mustache.OutputNotation
	'viewportWidth' => 800,
	'categories'    => [ 'material' ],
	'description'   => __( 'Pricing pattern with 2 product description.', 'material-design' ),
];
