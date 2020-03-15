/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { LIST_STYLES } from './options';
import ImageRadioControl from '../../components/image-radio-control';
import genericAttributesSetter from '../../utils/generic-attributes-setter';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useCallback, createContext } from '@wordpress/element';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';

export const ListContext = createContext( {
	style: null,
	parentClientId: null,
	leadingIconsEnabled: false,
	trailingIconsEnabled: false,
} );

/**
 * Material list edit component.
 */
const ListEdit = ( {
	attributes: { style, leadingIconsEnabled, trailingIconsEnabled },
	className,
	clientId,
	setAttributes,
} ) => {
	const setter = useCallback( genericAttributesSetter( setAttributes ) );

	return (
		<ListContext.Provider
			value={ {
				style,
				leadingIconsEnabled,
				trailingIconsEnabled,
				parentClientId: clientId,
			} }
		>
			<ul
				className={ classNames( 'mdc-list', className, {
					'mdc-list--two-line': style === 'two-line',
				} ) }
			>
				<InnerBlocks
					template={ [ [ 'material/list-item' ], [ 'material/list-item' ] ] }
					allowedBlocks={ [ 'material/list-item' ] }
				/>
			</ul>

			<InspectorControls>
				<PanelBody
					title={ __( 'Style', 'material-theme-builder' ) }
					initialOpen={ true }
				>
					<ImageRadioControl
						selected={ style }
						options={ LIST_STYLES }
						onChange={ setter( 'style' ) }
					/>
					<ToggleControl
						label={ __( 'Leading Icons', 'material-theme-builder' ) }
						checked={ leadingIconsEnabled }
						onChange={ setter( 'leadingIconsEnabled' ) }
					/>
					<ToggleControl
						label={ __( 'Trailing Icons', 'material-theme-builder' ) }
						checked={ trailingIconsEnabled }
						onChange={ setter( 'trailingIconsEnabled' ) }
					/>
				</PanelBody>
			</InspectorControls>
		</ListContext.Provider>
	);
};

export default ListEdit;
