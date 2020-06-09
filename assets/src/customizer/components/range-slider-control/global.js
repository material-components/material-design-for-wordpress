/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import RangeSliderControl from './index';
import { __ } from '@wordpress/i18n';

const GlobalRangeSliderControl = props => {
	const {
		childSliders,
		onChildChange,
		onResetToDefault,
		...otherProps
	} = props;
	const sliders = {};

	const limitSliderValue = ( id, value ) => {
		const sliderParams = childSliders.filter( slider => id === slider.id );

		if (
			sliderParams &&
			sliderParams.length &&
			sliderParams[ 0 ] &&
			value > sliderParams[ 0 ].max
		) {
			return sliderParams[ 0 ].max;
		}

		return value;
	};

	childSliders.forEach(
		slider =>
			( sliders[ slider.id ] = {
				value: limitSliderValue( slider.id, slider.value ),
				linked: props.value === slider.value,
			} )
	);

	const [ sliderValues, setSliderValues ] = useState( sliders );
	const [ parentValue, setParentValue ] = useState( Number( props.value ) );
	const [ expandedSettings, setExpandedSettings ] = useState( false );

	const onParentChange = newValue => {
		const newSliderValues = { ...sliderValues };
		Object.keys( newSliderValues ).forEach( id => {
			if ( newSliderValues[ id ].linked ) {
				const childValue = limitSliderValue( id, newValue );
				newSliderValues[ id ].value = childValue;
				onChildChange( id, childValue );
			}
		} );

		setParentValue( newValue );
		setSliderValues( newSliderValues );
		props.onChange( newValue );
	};

	const handleExpandedSettings = () => {
		setExpandedSettings( ! expandedSettings );
	};

	const onReset = event => {
		event.preventDefault();
		onResetToDefault();
	};

	return (
		<div className="global-range-slider-control">
			<RangeSliderControl
				{ ...otherProps }
				onChange={ onParentChange }
				isGlobal
				expandedSettings={ expandedSettings }
				handleExpandedSettings={ handleExpandedSettings }
			/>
			{ expandedSettings && childSliders && childSliders.length && (
				<div className="global-range-slider-control-children">
					{ childSliders.map( slider => (
						<RangeSliderControl
							key={ slider.id }
							{ ...slider }
							value={ sliderValues[ slider.id ].value }
							linked={ sliderValues[ slider.id ].linked }
							onChange={ value => {
								setSliderValues( {
									...sliderValues,
									...{
										[ slider.id ]: {
											value: limitSliderValue( slider.id, value ),
											linked: false,
										},
									},
								} );

								onChildChange(
									slider.id,
									limitSliderValue( slider.id, value )
								);
							} }
							onResetLinked={ () => {
								setSliderValues( {
									...sliderValues,
									...{
										[ slider.id ]: {
											value: limitSliderValue( slider.id, parentValue ),
											linked: true,
										},
									},
								} );
							} }
						/>
					) ) }
				</div>
			) }
			<p>
				{ /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
				<a href="#" onClick={ onReset } className="global-range-slider-reset">
					{ __( 'Reset', 'material-theme-builder' ) }
				</a>
			</p>
		</div>
	);
};

export default GlobalRangeSliderControl;
