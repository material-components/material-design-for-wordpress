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
 * Call to action pattern.
 *
 * @package MaterialDesign
 */

return [
	'title'         => __( 'Latest Posts', 'material-design' ),
	'content'       => '<!-- wp:columns {"verticalAlignment":"center","align":"wide"} --><div class="wp-block-columns alignwide are-vertically-aligned-center"><!-- wp:column {"verticalAlignment":"center","width":"66.66%"} --><div class="wp-block-column is-vertically-aligned-center" style="flex-basis:66.66%"><!-- wp:heading {"level":4} --><h4>Latest Posts</h4><!-- /wp:heading --><!-- wp:paragraph --><p>Perform this action in no time. Satisfaction guaranteed</p><!-- /wp:paragraph --></div><!-- /wp:column --><!-- wp:column {"verticalAlignment":"center","width":"33.33%"} --><div class="wp-block-column is-vertically-aligned-center" style="flex-basis:33.33%"><!-- wp:material/buttons {"align":"right"} --><div class="wp-block-material-buttons alignright"><!-- wp:material/button {"iconPosition":"none","size":"large"} --><div class="wp-block-material-button" id="block-material-button-59"><button class="mdc-button mdc-button--raised is-large"><div class="mdc-button__ripple"></div><span class="mdc-button__label">Get Started</span></button></div><!-- /wp:material/button --></div><!-- /wp:material/buttons --></div><!-- /wp:column --></div><!-- /wp:columns --><!-- wp:material/recent-posts {"contentLayout":"text-under-media","postsToShow":3,"displayCommentsCount":false} /-->',
	'viewportWidth' => 800,
	'categories'    => [ 'material', 'buttons', 'header', 'text', 'columns' ],
	'description'   => __( 'Call to action pattern.', 'material-design' ),
];
