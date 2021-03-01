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
 * This is cloned from https://github.com/WordPress/gutenberg/tree/master/packages/components/src/circular-option-picker
 * till the CircularOptionPicker is exported and available for use from `@wordpress/components`.
 */

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { Button, Dashicon, Dropdown, Tooltip } from '@wordpress/components';

/**
 * Internal dependencies
 */
import './style.css';

export const Option = ( {
	className,
	isSelected,
	tooltipText,
	position,
	...additionalProps
} ) => {
	const optionButton = (
		<Button
			className={ classnames(
				className,
				'components-circular-option-picker__option',
				{ 'is-pressed': isSelected }
			) }
			{ ...additionalProps }
		/>
	);
	return (
		<div className="components-circular-option-picker__option-wrapper">
			{ tooltipText ? (
				<Tooltip text={ tooltipText } position={ position }>
					{ optionButton }
				</Tooltip>
			) : (
				optionButton
			) }
			{ isSelected && <Dashicon icon="saved" /> }
		</div>
	);
};

export const DropdownLinkAction = ( {
	buttonProps,
	className,
	dropdownProps,
	linkText,
} ) => {
	return (
		<Dropdown
			className={ classnames(
				'components-circular-option-picker__dropdown-link-action',
				className
			) }
			renderToggle={ ( { isOpen, onToggle } ) => (
				<Button
					aria-expanded={ isOpen }
					onClick={ onToggle }
					isLink
					{ ...buttonProps }
				>
					{ linkText }
				</Button>
			) }
			{ ...dropdownProps }
		/>
	);
};

export const ButtonAction = ( { className, children, ...additionalProps } ) => {
	return (
		<Button
			className={ classnames(
				'components-circular-option-picker__clear',
				className
			) }
			isSmall
			{ ...additionalProps }
		>
			{ children }
		</Button>
	);
};

const CircularOptionPicker = ( { actions, className, options, children } ) => {
	return (
		<div
			className={ classnames( 'components-circular-option-picker', className ) }
		>
			{ options }
			{ children }
			{ actions && (
				<div className="components-circular-option-picker__custom-clear-wrapper">
					{ actions }
				</div>
			) }
		</div>
	);
};

export default CircularOptionPicker;
