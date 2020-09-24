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
import { useState, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import CardActionButton from './card-action-button';

/**
 * Card Actions Edit component.
 *
 * @param {Object} props - Component props.
 * @param {string} props.primaryActionButtonLabel - Primary action button label.
 * @param {string} props.primaryActionButtonUrl - Primary action button URL.
 * @param {boolean} props.primaryActionButtonNewTab - Whether or not the primary action button url should open in a new tab.
 * @param {boolean} props.primaryActionButtonNoFollow - Whether or not the primary action button url rel property should be noFollow.
 * @param {string} props.secondaryActionButtonLabel - Secondary action button label.
 * @param {string} props.secondaryActionButtonUrl - Secondary action button URL.
 * @param {boolean} props.secondaryActionButtonNewTab - Whether or not the secondary action button url should open in a new tab.
 * @param {boolean} props.secondaryActionButtonNoFollow - Whether or not the secondary action button url rel property should be noFollow.
 * @param {boolean} props.displaySecondaryActionButton - Whether or not to show the secondary action button.
 * @param {number} props.cardIndex - Card index
 * @param {Function} props.setter - Block attribute setter.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const CardActionsEdit = ( {
	primaryActionButtonLabel,
	primaryActionButtonUrl,
	primaryActionButtonNewTab,
	primaryActionButtonNoFollow,
	secondaryActionButtonLabel,
	secondaryActionButtonUrl,
	secondaryActionButtonNewTab,
	secondaryActionButtonNoFollow,
	displaySecondaryActionButton,
	cardIndex,
	setter,
	isFocused = false,
} ) => {
	const [
		buttonsUrlInputFocusState,
		setButtonsUrlInputFocusState,
	] = useState( { primary: false, secondary: false } );

	/**
	 * Handle the button container focus.
	 *
	 * @param {string} buttonType - Button type.
	 * @param {boolean} state - Button focus state.
	 */
	const onButtonContainerFocus = ( buttonType, state = true ) => {
		if ( buttonType === 'primary' ) {
			setButtonsUrlInputFocusState( { primary: state, secondary: false } );
		}
		if ( buttonType === 'secondary' ) {
			setButtonsUrlInputFocusState( { primary: false, secondary: state } );
		}
	};

	useEffect( () => {
		if ( ! isFocused ) {
			onButtonContainerFocus( 'primary', false );
			onButtonContainerFocus( 'secondary', false );
		}
	}, [ isFocused ] );

	return (
		<div className="mdc-card__actions">
			<div className="mdc-card__action-buttons">
				<div
					className="mdc-card__action-button-container"
					onFocus={ () => onButtonContainerFocus( 'primary' ) }
				>
					<CardActionButton
						label={ primaryActionButtonLabel }
						onChangeLabel={ value =>
							setter( 'primaryActionButtonLabel', value, cardIndex )
						}
						url={ primaryActionButtonUrl }
						onChangeUrl={ value =>
							setter( 'primaryActionButtonUrl', value, cardIndex )
						}
						newTab={ primaryActionButtonNewTab }
						onChangeNewTab={ value =>
							setter( 'primaryActionButtonNewTab', value, cardIndex )
						}
						noFollow={ primaryActionButtonNoFollow }
						onChangeNoFollow={ value =>
							setter( 'primaryActionButtonNoFollow', value, cardIndex )
						}
						isFocused={ buttonsUrlInputFocusState.primary }
						onPopupClose={ () => onButtonContainerFocus( 'primary', false ) }
						onPopupFocusOutside={ () =>
							onButtonContainerFocus( 'primary', false )
						}
						isEditMode={ true }
						setter={ setter }
						isPrimary
					/>
				</div>
				{ displaySecondaryActionButton && (
					<div
						className="mdc-card__action-button-container"
						onFocus={ () => onButtonContainerFocus( 'secondary' ) }
					>
						<CardActionButton
							label={ secondaryActionButtonLabel }
							onChangeLabel={ value =>
								setter( 'secondaryActionButtonLabel', value, cardIndex )
							}
							url={ secondaryActionButtonUrl }
							onChangeUrl={ value =>
								setter( 'secondaryActionButtonUrl', value, cardIndex )
							}
							newTab={ secondaryActionButtonNewTab }
							onChangeNewTab={ value =>
								setter( 'secondaryActionButtonNewTab', value, cardIndex )
							}
							noFollow={ secondaryActionButtonNoFollow }
							onChangeNoFollow={ value =>
								setter( 'secondaryActionButtonNoFollow', value, cardIndex )
							}
							isFocused={ buttonsUrlInputFocusState.secondary }
							onPopupClose={ () =>
								onButtonContainerFocus( 'secondary', false )
							}
							onPopupFocusOutside={ () =>
								onButtonContainerFocus( 'secondary', false )
							}
							isEditMode={ true }
							setter={ setter }
						/>
					</div>
				) }
			</div>
		</div>
	);
};

export default CardActionsEdit;
