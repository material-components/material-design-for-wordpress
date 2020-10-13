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
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import getConfig from '../../../../block-editor/utils/get-config';
import IconButtonLink from '../common/icon-button-link';

const ImageLists = ( { radius } ) => (
	<div>
		<h4 className="mdc-typography--headline4" style={ { margin: 0 } }>
			{ __( 'Gallery (Image Lists)', 'material-design' ) }
		</h4>
		<IconButtonLink href="https://material.io/components/image-lists"></IconButtonLink>
		<p>
			{ __(
				'Image lists display a collection of images in an organized grid.',
				'material-design'
			) }
		</p>
		<div>
			<ul className="mdc-image-list mdc-image-list--masonry mdc-image-list--with-text-protection">
				{ getConfig( 'images' ).map( ( url, i ) => (
					<li
						key={ i }
						className="mdc-image-list__item image-list-item"
						style={ { borderRadius: `${ radius }px` } }
					>
						<img
							style={ { borderRadius: `${ radius }px` } }
							className="mdc-image-list__image"
							src={ url }
							alt={ __( 'Text label', 'material-design' ) }
						/>
						<div
							className="mdc-image-list__supporting"
							style={ {
								borderBottomLeftRadius: `${ radius }px`,
								borderBottomRightRadius: `${ radius }px`,
							} }
						>
							<span className="mdc-image-list__label">
								{ __( 'Text label', 'material-design' ) }
							</span>
						</div>
					</li>
				) ) }
			</ul>
		</div>
	</div>
);

export default ImageLists;
