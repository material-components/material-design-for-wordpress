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
 */

/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * External dependencies
 */
import classnames from 'classnames';

const withTitleClassNames = createHigherOrderComponent( BlockListBlock => {
	return props => {
		if ( 'core/site-title' === props.name ) {
			return (
				<BlockListBlock
					{ ...props }
					className={ classnames(
						'site-title mdc-typography mdc-typography--headline6',
						props.className
					) }
				/>
			);
		}

		return <BlockListBlock { ...props } />;
	};
}, 'withTitleClassNames' );

addFilter(
	'editor.BlockListBlock',
	'material/title-class-name',
	withTitleClassNames
);
