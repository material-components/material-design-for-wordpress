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
import {
	AlignmentControl,
	BlockControls,
	useBlockProps,
	RichText,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import HeadingLevelDropdown from './heading-level-dropdown';

/**
 * Edit.
 *
 * @param {Object}   props
 * @param {Object}   props.attributes
 * @param {string}   props.attributes.textAlign
 * @param {string}   props.attributes.title
 * @param {number}   props.attributes.level
 * @param {Function} props.setAttributes
 * @return {JSX.Element} Block edit.
 */
const Edit = ( { attributes: { textAlign, level, title }, setAttributes } ) => {
	const TagName = 0 === level ? 'p' : 'h' + level;
	const blockProps = useBlockProps( {
		className: classnames(
			{
				[ `has-text-align-${ textAlign }` ]: textAlign,
			},
			'page-title',
			'mdc-typography',
			`mdc-typography--headline-${ level }`
		),
	} );
	return (
		<>
			<BlockControls group="block">
				<HeadingLevelDropdown
					selectedLevel={ level }
					onChange={ newLevel =>
						setAttributes( { level: newLevel } )
					}
				/>
				<AlignmentControl
					value={ textAlign }
					onChange={ nextAlign => {
						setAttributes( { textAlign: nextAlign } );
					} }
				/>
			</BlockControls>
			<TagName { ...blockProps }>
				<RichText
					tagName={ 'span' }
					onChange={ value => setAttributes( { title: value } ) }
					value={ title }
				/>
				<span>
					{ __( ' search keyword', 'material-design-google' ) }
				</span>
			</TagName>
		</>
	);
};

export default Edit;
