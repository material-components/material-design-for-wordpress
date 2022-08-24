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
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import './style.css';
import { ICON_SIZES } from './options';
import { getIconName } from '../../utils';
import IconPicker from '../../components/icon-picker';
import genericAttributesSetter from '../../utils/generic-attributes-setter';
import ButtonGroup from '../../components/button-group';
import { getColor } from '../../components/with-global-default';
import ColorPanel from '../../components/global-color/color-panel';

/**
 * Material icon edit component.
 *
 * @param {Object}        props
 * @param {Object}        props.attributes
 * @param {string|object} props.attributes.icon
 * @param {string}        props.attributes.textColor
 * @param {string}        props.attributes.iconSize
 * @param {string}        props.attributes.customSize
 * @param {string}        props.attributes.align
 * @param {Function}      props.setAttributes
 * @param {string}        props.className
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

	const colorSettings = {
		text: {
			label: __( 'Text Color', 'material-design' ),
			colorValue: getColor( 'primary_color', textColor ),
			onColorChange: setter( 'textColor' ),
			gradients: [], // Disable gradients
			disableCustomGradients: true,
		},
	};

	const blockProps = useBlockProps( {
		className: classNames( className, {
			[ `has-text-align-${ align }` ]: align,
		} ),
	} );
	return (
		<>
			<div { ...blockProps }>
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
				<AlignmentToolbar
					value={ align }
					onChange={ setter( 'align' ) }
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody
					title={ __( 'Icon', 'material-design' ) }
					initialOpen={ true }
				>
					{
						<IconPicker
							currentIcon={ icon }
							onChange={ setter( 'icon' ) }
						/>
					}
				</PanelBody>

				<ColorPanel colors={ colorSettings } />

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
							label={ __(
								'Pick custom size(in px)',
								'material-design'
							) }
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
