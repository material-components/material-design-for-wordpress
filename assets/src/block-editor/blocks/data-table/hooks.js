/**
 * WordPress dependencies
 */
import { registerBlockStyle } from '@wordpress/blocks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import DataTableSave from './save';
import DataTableEdit from './edit';

export const isMaterialTableBlock = ( name, attributes ) => {
	return (
		'core/table' === name &&
		attributes &&
		attributes.className &&
		-1 !== attributes.className.indexOf( 'material' )
	);
};

/**
 * Maybe use material data table edit component.
 *
 * @param {WPElement} element    Block save result.
 * @param {WPBlock}   blockType  Block type definition.
 * @param {Object}    attributes Block attributes.
 */
export const withDataTableEdit = createHigherOrderComponent( BlockEdit => {
	return props => {
		if ( isMaterialTableBlock( props.name, props.attributes ) ) {
			return (
				<>
					<DataTableEdit { ...props } />
					<BlockEdit { ...props } />
				</>
			);
		}

		return <BlockEdit { ...props } />;
	};
}, 'withMaterialDataTableEdit' );

/**
 * Maybe use material data table save component.
 *
 * @param {WPElement} element    Block save result.
 * @param {WPBlock}   blockType  Block type definition.
 * @param {Object}    attributes Block attributes.
 */
export const save = ( element, blockType, attributes ) => {
	if ( isMaterialTableBlock( blockType.name, attributes ) ) {
		return <DataTableSave { ...{ attributes } } />;
	}

	return element;
};

/**
 * Register `Material` style.
 */
registerBlockStyle( 'core/table', {
	name: 'material',
	label: 'Material',
} );

addFilter( 'editor.BlockEdit', 'material/data-table-edit', withDataTableEdit );

addFilter( 'blocks.getSaveElement', 'material/data-table-save', save );
