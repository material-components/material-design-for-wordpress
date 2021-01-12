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
 * External dependencies
 */
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { Button, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './style.css';
import { sanitizeControlId } from '../../utils';

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
		linked,
		onResetLinked,
		isGlobal,
		expandedSettings,
		handleExpandedSettings,
	} = props;

	const [ expanded, setExpanded ] = useState( false );
	const enableDescriptionToggling =
		description !== undefined && description !== '';

	const handleExpansionPanelChange = () => {
		if ( enableDescriptionToggling ) {
			setExpanded( ! expanded );
		}
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
		onChange( newValue );
	};

	const renderLink = 'undefined' !== typeof linked && ! linked;

	return (
		<div
			id={ `range-slider-control-${ sanitizeControlId( id ) }` }
			className="range-slider-control"
		>
			<div
				className={ classNames( 'range-slider-control-header', {
					expanded,
				} ) }
			>
				<div
					tabIndex={ 0 }
					role="link"
					className={ classNames( 'range-slider-control-title', {
						'range-slider-control-title-with-description': enableDescriptionToggling,
					} ) }
					onClick={ handleExpansionPanelChange }
					onKeyPress={ handleKeyPress }
				>
					<span className="customize-control-title range-slider-control-title__item">
						{ label }
					</span>
					{ enableDescriptionToggling && (
						<i
							className="material-icons range-slider-control-title__item info-icon"
							title={ __( 'More info', 'material-design' ) }
						>
							info
						</i>
					) }
				</div>
				{ enableDescriptionToggling && (
					<span className="customize-control-description">{ description }</span>
				) }
			</div>
			<div className="range-slider-control-body">
				<span
					className={ classNames( 'range-slider-control-body__item slider', {
						'has-link': renderLink,
					} ) }
				>
					<RangeControl
						value={ Number( value ) }
						onChange={ handleSliderChange }
						min={ min }
						max={ max }
						step={ step }
					/>
				</span>
				{ renderLink && (
					<span className="range-slider-control-body__item">
						<Button
							isLink
							onClick={ onResetLinked }
							label={ __( 'Link to global', 'material-design' ) }
							showTooltip={ true }
						>
							<span className="material-icons">link</span>
						</Button>
					</span>
				) }

				{ isGlobal && (
					<span className="range-slider-control-body__item">
						<button
							type="button"
							onClick={ handleExpandedSettings }
							label={ __( 'View individual components', 'material-design' ) }
							className={ `components-button is-link control-settings-expanded range-slider-control-settings-expanded ${
								expandedSettings ? 'is-pressed' : ''
							}` }
						>
							<span className="dashicons dashicons-admin-settings"></span>
						</button>
					</span>
				) }
			</div>
		</div>
	);
};

export default RangeSliderControl;
