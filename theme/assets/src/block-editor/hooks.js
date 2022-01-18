/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Adds a class to the block edit wrapper when the block is a site title.
 */
const withMaterialCustomClass = createHigherOrderComponent( BlockEdit => {
	const defaultClassNames = classnames(
		'site-title mdc-typography mdc-typography--headline6'
	);

	return props => {
		let Component = <BlockEdit { ...props } />;

		if ( 'core/site-title' === props.name ) {
			console.log( props );
			Component = (
				<BlockEdit { ...props } className={ defaultClassNames } />
			);
		}

		return Component;
	};
}, 'withMaterialCustomClass' );

addFilter(
	'editor.BlockListBlock',
	'material/site-title-custom-class',
	withMaterialCustomClass
);
