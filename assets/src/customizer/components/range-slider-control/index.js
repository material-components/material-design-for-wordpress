/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './style.css';

const RangeSliderControl = props => {
	const {
		id,
		label,
		description,
		value,
		min = 0,
		max = 100,
		step = 1,
		onChange,
	} = props;

	const [ updatedValue, setValue ] = useState( value );
	const [ expanded, setExpanded ] = useState( false );

	const undoDisabled = updatedValue === value;

	const handleExpansionPanelChange = () => {
		setExpanded( ! expanded );
	};

	/**
	 * @param {Object} event Dom event.
	 */
	const handleKeyPress = event => {
		if ( event.key === 'Enter' ) {
			setExpanded( ! expanded );
		}
	};

	/**
	 * @param {number} newValue New slider value
	 */
	const handleSliderChange = newValue => {
		setValue( newValue );
		onChange( newValue );
	};

	const handleUndoClick = () => {
		setValue( value );
		onChange( value );
	};

	return (
		<div id={ `range-slider-control-${ id }` } className="range-slider-control">
			<div
				className={ classNames( 'range-slider-control-header', {
					expanded,
				} ) }
			>
				<div
					tabIndex={ 0 }
					role="link"
					className="range-slider-control-title"
					onClick={ handleExpansionPanelChange }
					onKeyPress={ handleKeyPress }
				>
					<span className="customize-control-title range-slider-control-title__item">
						{ label }
					</span>
					<i
						className="material-icons range-slider-control-title__item info-icon"
						title={ __( 'More info', 'material-theme-builder' ) }
					>
						info
					</i>
				</div>
				<span className="customize-control-description">{ description }</span>
			</div>
			<div className="range-slider-control-body">
				<span className="range-slider-control-body__item slider">
					<RangeControl
						value={ Number( updatedValue ) }
						onChange={ handleSliderChange }
						min={ min }
						max={ max }
						step={ step }
					/>
				</span>
				<span className="range-slider-control-body__item">
					<button
						className="mdc-icon-button material-icons"
						onClick={ handleUndoClick }
						disabled={ undoDisabled }
						title={ __( 'Reset', 'material-theme-builder' ) }
					>
						undo
					</button>
				</span>
			</div>
		</div>
	);
};

export default RangeSliderControl;
