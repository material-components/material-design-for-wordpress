/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Note this block is copied from the core/post-navigation-link block to provide position for label.
 *
 * @see https://github.com/WordPress/gutenberg/blob/4b4f328220f357306f83225e1b67b1316656ec18/packages/block-library/src/post-navigation-link/edit.js
 */
/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { ToggleControl, PanelBody } from '@wordpress/components';
import {
	InspectorControls,
	RichText,
	BlockControls,
	AlignmentToolbar,
	useBlockProps,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function Edit( {
	attributes: { type, label, showTitle, textAlign, linkLabel, position },
	setAttributes,
} ) {
	const isNext = type === 'next';
	let placeholder = isNext ? __( 'Next' ) : __( 'Previous' );

	if ( showTitle ) {
		/* translators: Label before for next and previous post. There is a space after the colon. */
		placeholder = isNext ? __( 'Next: ' ) : __( 'Previous: ' );
	}

	const ariaLabel = isNext ? __( 'Next post' ) : __( 'Previous post' );
	const blockProps = useBlockProps( {
		className: classnames( {
			[ `has-text-align-${ textAlign }` ]: textAlign,
		} ),
	} );
	const isPositionAfter = position === 'after';

	return (
		<>
			<InspectorControls>
				<PanelBody>
					<ToggleControl
						label={ __(
							'Display the title as a link',
							'material-design-google'
						) }
						help={ __(
							'If you have entered a custom label, it will be prepended before the title.',
							'material-design-google'
						) }
						checked={ !! showTitle }
						onChange={ () =>
							setAttributes( {
								showTitle: ! showTitle,
							} )
						}
					/>
					{ showTitle && (
						<ToggleControl
							label={ __(
								'Include the label as part of the link',
								'material-design-google'
							) }
							checked={ !! linkLabel }
							onChange={ () =>
								setAttributes( {
									linkLabel: ! linkLabel,
								} )
							}
						/>
					) }
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<AlignmentToolbar
					value={ textAlign }
					onChange={ nextAlign => {
						setAttributes( { textAlign: nextAlign } );
					} }
				/>
			</BlockControls>
			<div { ...blockProps }>
				{ ! isPositionAfter && (
					<RichText
						tagName="a"
						aria-label={ ariaLabel }
						placeholder={ placeholder }
						value={ label }
						allowedFormats={ [ 'core/bold', 'core/italic' ] }
						onChange={ newLabel =>
							setAttributes( { label: newLabel } )
						}
					/>
				) }
				{ showTitle && (
					<a
						href="#post-navigation-pseudo-link"
						onClick={ event => event.preventDefault() }
					>
						{ __( 'An example title', 'material-design-google' ) }
					</a>
				) }
				{ isPositionAfter && (
					<RichText
						tagName="a"
						aria-label={ ariaLabel }
						placeholder={ placeholder }
						value={ label }
						allowedFormats={ [ 'core/bold', 'core/italic' ] }
						onChange={ newLabel =>
							setAttributes( { label: newLabel } )
						}
					/>
				) }
			</div>
		</>
	);
}
