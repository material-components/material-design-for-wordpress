<?php
/**
 * Copyright 2022 Google LLC
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
 * Material card query pattern.
 *
 * @package MaterialDesign
 */

return [
	'title'       => __( 'Query with material Card', 'material-design' ),
	'content'     => '<!-- wp:query {"query":{"perPage":10,"pages":0,"offset":0,"postType":"post","categoryIds":[],"tagIds":[],"order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"","inherit":false},"displayLayout":{"type":"flex","columns":3}} -->
<div class="wp-block-query"><!-- wp:post-template {"className":"is-style-material-masonry"} -->
<!-- wp:material/card-query /-->
<!-- /wp:post-template -->

<!-- wp:material/query-pagination {"layout":{"type":"flex","justifyContent":"center"}} -->
<!-- wp:material/query-pagination-first /-->

<!-- wp:material/query-pagination-previous /-->

<!-- wp:material/query-pagination-next /-->

<!-- wp:material/query-pagination-last /-->
<!-- /wp:material/query-pagination --></div>
<!-- /wp:query -->',
	'description' => __( 'Query with material card and pagination.', 'material-design' ),
	'blockTypes'  => [ 'core/query' ],
	'categories'  => [ 'material', 'query' ],
];
