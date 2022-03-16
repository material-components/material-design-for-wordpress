/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import MaterialNavigationEdit from './edit';
import MaterialNavigationSave from './save';

const addMaterialStyle = ( settings, name ) => {
	if ( 'core/navigation-link' === name ) {
		settings.styles = [
			{
				name: 'material',
				label: __( 'Material', 'material-design' ),
				styleHandle: 'mdc-tab',
			},
			{
				name: 'regular',
				label: __( 'Regular', 'material-design' ),
				isDefault: true,
			},
		];
	}

	return settings;
};

const withNavigationLinkEdit = BlockEdit => {
	return props => {
		if ( isMaterialNavigationLinkBlock( props.name, props.attributes ) ) {
			return <MaterialNavigationEdit { ...props } />;
		}

		return <BlockEdit { ...props } />;
	};
};

const isMaterialNavigationLinkBlock = ( name, attributes ) => {
	return (
		'core/navigation-link' === name &&
		attributes &&
		attributes.className &&
		-1 !== attributes.className.indexOf( 'material' )
	);
};

/**
 * Maybe use material navigation link save component.
 *
 * @param {WPElement} element    Block save result.
 * @param {WPBlock}   blockType  Block type definition.
 * @param {Object}    attributes Block attributes.
 */
export const save = ( element, blockType, attributes ) => {
	if ( isMaterialNavigationLinkBlock( blockType.name, attributes ) ) {
		return <MaterialNavigationSave { ...{ attributes } } />;
	}

	return element;
};

addFilter(
	'blocks.registerBlockType',
	'material/navigation-link-style',
	addMaterialStyle
);

addFilter(
	'editor.BlockEdit',
	'material/navigation-link-edit',
	withNavigationLinkEdit
);

addFilter( 'blocks.getSaveElement', 'material/navigation-link-save', save );
