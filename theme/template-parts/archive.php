<?php
/**
 * Copyright 2020 Google LLC
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
 * Decide which archive template to render
 *
 * @package MaterialDesign
 */

$archive_layout = get_theme_mod( 'archive_layout', 'card' );
$is_card_layout = 'card' === $archive_layout;

if ( $is_card_layout ) {
	get_template_part( 'template-parts/archive', 'card' );
} else {
	get_template_part( 'template-parts/archive', 'image-list' );
}
