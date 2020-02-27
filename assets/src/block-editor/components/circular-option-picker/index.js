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

function Option( { className, isSelected, tooltipText, ...additionalProps } ) {
	const optionButton = (
		<Button
			isPressed={ isSelected }
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
				<Tooltip text={ tooltipText }>{ optionButton }</Tooltip>
			) : (
				optionButton
			) }
			{ isSelected && <Dashicon icon="saved" /> }
		</div>
	);
}

function DropdownLinkAction( {
	buttonProps,
	className,
	dropdownProps,
	linkText,
} ) {
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
}

function ButtonAction( { className, children, ...additionalProps } ) {
	return (
		<Button
			className={ classnames(
				'components-circular-option-picker__clear',
				className
			) }
			isSmall
			isSecondary
			{ ...additionalProps }
		>
			{ children }
		</Button>
	);
}

export default function CircularOptionPicker( {
	actions,
	className,
	options,
	children,
} ) {
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
}

CircularOptionPicker.Option = Option;
CircularOptionPicker.ButtonAction = ButtonAction;
CircularOptionPicker.DropdownLinkAction = DropdownLinkAction;
