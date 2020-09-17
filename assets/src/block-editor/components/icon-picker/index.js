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
import { useState, useCallback, useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { TextControl, Tooltip } from '@wordpress/components';

/**
 * Internal dependencies
 */
import './style.css';
import { icons as rawIcons } from '!!json-loader!material-design-icons/iconfont/MaterialIcons-Regular.ijmap';

const icons = Object.keys( rawIcons );

export default ( { currentIcon, onChange } ) => {
	const toSlug = str => str.replace( /\s/g, '_' ).toLowerCase();
	const [ filteredIcons, setFilteredIcons ] = useState( icons );

	const filterIcons = useCallback(
		filterText => {
			setFilteredIcons(
				icons.filter( icon =>
					rawIcons[ icon ].name
						.toLowerCase()
						.includes( filterText.toLowerCase() )
				)
			);
		},
		[ setFilteredIcons ]
	);

	const iconsRender = useMemo(
		() =>
			filteredIcons.map( icon => {
				const iconName = toSlug( rawIcons[ icon ].name );
				const iconHex = parseInt( icon, 16 );

				const isSelected =
					currentIcon?.name === iconName
						? ' icons-container__icon__icon-btn--active'
						: '';

				return (
					<div key={ rawIcons[ icon ].name } className="icons-container__icon">
						<Tooltip text={ rawIcons[ icon ].name }>
							<button
								type="button"
								className={ `icons-container__icon__icon-btn${ isSelected }` }
								onClick={ onChange.bind( this, {
									name: iconName,
									hex: iconHex,
								} ) }
							>
								<i className="material-icons">
									{ String.fromCharCode( iconHex ) }
								</i>
							</button>
						</Tooltip>
					</div>
				);
			} ),
		[ filteredIcons, currentIcon ] // eslint-disable-line
	);

	return (
		<>
			<section className="icons-search">
				<div className="icons-search__search-input">
					<TextControl
						label={ __( 'Search icon', 'material-theme-builder' ) }
						onChange={ filterIcons }
					/>
				</div>
				{ currentIcon && (
					<div className="icons-search__selected-icon">
						<i className="material-icons">
							{ String.fromCharCode( currentIcon?.hex ) }
						</i>
					</div>
				) }
			</section>

			<section className="icons-container">{ iconsRender }</section>
		</>
	);
};
