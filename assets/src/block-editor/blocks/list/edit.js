/**
 * Internal dependencies
 */
import { LIST_STYLES } from './options';
import ImageRadioControl from '../../components/image-radio-control';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { createContext } from '@wordpress/element';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';

export const ListContext = createContext( {
	parentClientId: null,
	style: null,
	leadingIcons: false,
	trailingIcons: false,
} );

/**
 * Material list edit component.
 */
const ListEdit = ( {
	attributes: { style, leadingIcons, trailingIcons },
	className,
	clientId,
	setAttributes,
} ) => (
	<ListContext.Provider
		value={ { parentClientId: clientId, style, leadingIcons, trailingIcons } }
	>
		<ul className={ `mdc-list mdc-list--two-line ${ className }` }>
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
					onChange={ newStyle => setAttributes( { style: newStyle } ) }
				/>
				<ToggleControl
					label={ __( 'Leading Icons', 'material-theme-builder' ) }
					checked={ leadingIcons }
					onChange={ () => setAttributes( { leadingIcons: ! leadingIcons } ) }
				/>
				<ToggleControl
					label={ __( 'Trailing Icons', 'material-theme-builder' ) }
					checked={ trailingIcons }
					onChange={ () => setAttributes( { trailingIcons: ! trailingIcons } ) }
				/>
			</PanelBody>
		</InspectorControls>
	</ListContext.Provider>
);

export default ListEdit;
