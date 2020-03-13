/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { RangeControl as WpRangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './style.css';

const RangeControl = props => {
	const {
		id,
		label,
		description,
		value,
		min = 0,
		max = 36,
		step = 1,
		onChange,
	} = props;

	const [ updatedValue, setValue ] = useState( value );
	const [ expanded, setExpanded ] = useState( false );

	const undoDisabled = updatedValue === value;

	const handleExpansionPanelChange = () => {
		setExpanded( ! expanded );
	};

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
		<div id={ `range-control-${ id } ` } className={ 'range-control' }>
			<div
				className={ classNames( 'range-control-header', {
					expanded,
				} ) }
			>
				<div
					tabIndex="0"
					role="link"
					className={ 'range-control-title' }
					onClick={ handleExpansionPanelChange }
					onKeyPress={ handleKeyPress }
				>
					<span className="customize-control-title range-control-title__item">
						{ label }
					</span>
					<i
						className="material-icons range-control-title__item info-icon"
						title={ __( 'More info' ) }
					>
						info
					</i>
				</div>
				<span className="customize-control-description">{ description }</span>
			</div>
			<div className={ 'range-control-body' }>
				<span className={ 'range-control-body__item slider' }>
					<WpRangeControl
						value={ Number( updatedValue ) }
						onChange={ handleSliderChange }
						min={ min }
						max={ max }
						step={ step }
					/>
				</span>
				<span className={ 'range-control-body__item' }>
					<button
						className="mdc-icon-button material-icons"
						onClick={ handleUndoClick }
						disabled={ undoDisabled }
						title={ __( 'Reset' ) }
					>
						undo
					</button>
				</span>
			</div>
		</div>
	);
};

export default RangeControl;
