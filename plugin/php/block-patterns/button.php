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
 * Example Button block pattern.
 *
 * @package MaterialDesign
 */

return [
	'title'         => __( 'Button', 'material-design' ),
	'content'       => "<!-- wp:material/buttons -->\n<div class=\"wp-block-material-buttons\">\n<!-- wp:material/button -->\n<div class=\"wp-block-material-button\" id=\"block-material-button-5\"><button class=\"mdc-button mdc-button--raised\"><i class=\"material-icons mdc-button__icon\">drafts</i><div class=\"mdc-button__ripple\"></div><span class=\"mdc-button__label\">Call to Action</span></button></div>\n<!-- /wp:material/button -->\n</div><!-- /wp:material/buttons -->",
	'viewportWidth' => 800,
	'categories'    => [ 'material', 'text' ],
	'description'   => __( 'An example button block.', 'material-design' ),
];
