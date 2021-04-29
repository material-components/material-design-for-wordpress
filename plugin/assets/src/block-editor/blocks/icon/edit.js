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
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	AlignmentToolbar,
	BlockControls,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import './style.css';
import { ICON_SIZES } from './options';
import { getConfig, getIconName } from '../../utils';
import IconPicker from '../../components/icon-picker';
import GlobalColor from '../../components/global-color';
import genericAttributesSetter from '../../utils/generic-attributes-setter';
import ButtonGroup from '../../components/button-group';

/**
 * Material icon edit component.
 */
const IconEdit = ( {
	attributes: { icon, textColor, iconSize, customSize, align },
	setAttributes,
	className,
} ) => {
	const setter = genericAttributesSetter( setAttributes );
	icon = getIconName( icon );
	const style = { ...( textColor ? { color: textColor } : {} ) };
	const isCustom = 'custom' === iconSize;
	if ( isCustom ) {
		style[ 'font-size' ] = `${ customSize }px`;
	}
	return (
		<>
			<div
				className={ classNames( className, {
					[ `has-text-align-${ align }` ]: align,
				} ) }
			>
				<i
					className={ classNames( 'material-icons', {
						[ `md-${ iconSize }` ]: ! isCustom,
					} ) }
					style={ style }
				>
					{ icon }
				</i>
			</div>

			<BlockControls group="block">
				<AlignmentToolbar value={ align } onChange={ setter( 'align' ) } />
			</BlockControls>
			<InspectorControls>
				<PanelBody
					title={ __( 'Icon', 'material-design' ) }
					initialOpen={ true }
				>
					{ <IconPicker currentIcon={ icon } onChange={ setter( 'icon' ) } /> }
				</PanelBody>
				<PanelBody
					title={ __( 'Colors', 'material-design' ) }
					initialOpen={ true }
				>
					<div className="components-base-control">
						{ __(
							'Overrides will only apply to this Icon. Change Primary Color in ',
							'material-design'
						) }
						<a
							href={ getConfig( 'customizerUrls' ).colors }
							target="_blank"
							rel="noreferrer noopener"
						>
							{ __( 'Material Design Options', 'material-design' ) }
						</a>
						{ __( ' to update all Icons.', 'material-design' ) }
					</div>

					<GlobalColor
						label={ __( 'Icon Color', 'material-design' ) }
						value={ textColor }
						onChange={ setter( 'textColor' ) }
						globalPropName={ 'primary_color' }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Size', 'material-design' ) }
					initialOpen={ true }
				>
					<ButtonGroup
						buttons={ ICON_SIZES }
						current={ iconSize }
						onClick={ setter( 'iconSize' ) }
					/>

					{ isCustom && (
						<RangeControl
							label={ __( 'Pick custom size(in px)', 'material-design' ) }
							value={ customSize }
							onChange={ setter( 'customSize' ) }
							min={ 10 }
							initialPosition={ customSize }
							max={ 200 }
						/>
					) }
				</PanelBody>
			</InspectorControls>
		</>
	);
};

export default IconEdit;
