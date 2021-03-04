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
import { useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { TextControl, Tooltip } from '@wordpress/components';

export default ( { currentIcon, onChange } ) => {
	const iconsRender = useMemo(
		() =>
			[
				'airplanemode_active',
				'airplanemode_inactive',
				'bookmark_border',
				'camera_enhance',
				'card_giftcard',
				'card_membership',
				'card_travel',
				'chat_bubble',
			].map( iconName => {
				const isSelected =
					currentIcon === iconName
						? ' icons-container__icon__icon-btn--active'
						: '';

				return (
					<div key={ iconName } className="icons-container__icon">
						<Tooltip text={ iconName }>
							<button
								type="button"
								className={ `icons-container__icon__icon-btn${ isSelected }` }
								onClick={ onChange.bind( this, iconName ) }
							>
								<i className="material-icons">{ iconName }</i>
							</button>
						</Tooltip>
					</div>
				);
			} ),
		[ currentIcon ] // eslint-disable-line
	);

	return (
		<>
			<section className="icons-search">
				<div className="icons-search__search-input">
					<TextControl
						label={ __( 'Search icon', 'material-design' ) }
						onChange={ () => {} }
					/>
				</div>
				{ currentIcon && (
					<div className="icons-search__selected-icon">
						<i className="material-icons">{ currentIcon }</i>
					</div>
				) }
			</section>

			<section className="icons-container">{ iconsRender }</section>
		</>
	);
};
