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
 * WordPress dependencies
 */
import { Placeholder, Button, RadioControl } from '@wordpress/components';
import { useCallback } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import PostsControl from '../../../components/posts-control';
import genericAttributesSetter from '../../../utils/generic-attributes-setter';
import getConfig from '../../../utils/get-config';
import classnames from 'classnames';

/**
 * Posts Picker component.
 *
 * @param {Object}   props                - Component props.
 * @param {Object}   props.attributes     - Block attributes.
 * @param {Function} props.debouncedSpeak - Function to debounce the call to the Speak method for accessibility purpose.
 * @param {Function} props.setAttributes  - Function to set block attributes value.
 * @param {string}   [props.className=''] - ClassNames.
 *
 * @return {JSX.Element} A functional component.
 */

const PostsPicker = ( {
	attributes,
	debouncedSpeak,
	setAttributes,
	className = '',
} ) => {
	const setter = useCallback( genericAttributesSetter( setAttributes ), [
		setAttributes,
	] );

	const classNames = classnames(
		'material-design-block-products-grid material-design-block-handpicked-posts',
		className
	);

	const onDone = () => {
		setAttributes( { editMode: false } );
		debouncedSpeak(
			__(
				'Showing Curated Post Collection block preview.',
				'material-design'
			)
		);
	};

	const boldText = {
		fontWeight: 'bold',
		textAlign: 'left',
	};

	return (
		<Placeholder
			icon={ <i className="material-icons-outlined">library_books</i> }
			label={ __( 'Curated Post Collection', 'material-design' ) }
			className={ classNames }
		>
			<div className="material-design-block-handpicked-posts__types">
				<p>
					{ __(
						'Display a selection of hand-picked posts.',
						'material-design'
					) }
				</p>

				<p style={ boldText }>{ __( 'Content', 'material-design' ) }</p>
				<RadioControl
					selected={ attributes.postType }
					options={ getConfig( 'postTypes' ) }
					onChange={ setter( 'postType' ) }
					className="material-design-block-handpicked-posts__types__list"
				/>
			</div>
			<div className="material-design-block-handpicked-posts__selection">
				<PostsControl
					selected={ attributes.posts }
					postType={ attributes.postType }
					onChange={ setter( 'posts', ( value = [] ) => {
						/* istanbul ignore next */
						return value.map( ( { id } ) => id );
					} ) }
				/>
				<Button isPrimary onClick={ onDone }>
					{ __( 'Done', 'material-design' ) }
				</Button>
			</div>
		</Placeholder>
	);
};

export default PostsPicker;
