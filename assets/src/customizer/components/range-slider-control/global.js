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
	childSliders.forEach(
		slider =>
			( sliders[ slider.id ] = {
				value: slider.value,
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
				const childValue = newValue;
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
				value={ parentValue }
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
							max={ otherProps.max }
							min={ otherProps.min }
							onChange={ value => {
								setSliderValues( {
									...sliderValues,
									...{
										[ slider.id ]: {
											value,
											linked: false,
										},
									},
								} );

								onChildChange( slider.id, value );
							} }
							onResetLinked={ () => {
								setSliderValues( {
									...sliderValues,
									...{
										[ slider.id ]: {
											value: parentValue,
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
