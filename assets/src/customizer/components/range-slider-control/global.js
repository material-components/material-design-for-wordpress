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

								onChildChange( slider.id, parentValue );
							} }
						/>
					) ) }
				</div>
			) }
			<p>
				{ /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
				<a href="#" onClick={ onReset } className="global-range-slider-reset">
					{ __( 'Reset', 'material-design' ) }
				</a>
			</p>
		</div>
	);
};

export default GlobalRangeSliderControl;
