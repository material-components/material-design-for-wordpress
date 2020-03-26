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

registerBlockStyle( 'core/table', {
	name: 'material',
	label: 'Material',
} );

/**
 * Maybe use material data table edit component.
 *
 * @param {WPElement} element    Block save result.
 * @param {WPBlock}   blockType  Block type definition.
 * @param {Object}    attributes Block attributes.
 */
const withInspectorControl = createHigherOrderComponent( BlockEdit => {
	return props => {
		if (
			'core/table' === props.name &&
			props.attributes.className &&
			-1 !== props.attributes.className.indexOf( 'material' )
		) {
			return (
				<>
					<BlockEdit { ...props } />
					<DataTableEdit { ...props } />
				</>
			);
		}

		return <BlockEdit { ...props } />;
	};
} );

addFilter(
	'editor.BlockEdit',
	'material/data-table-edit',
	withInspectorControl
);

/**
 * Maybe use material data table save component.
 *
 * @param {WPElement} element    Block save result.
 * @param {WPBlock}   blockType  Block type definition.
 * @param {Object}    attributes Block attributes.
 */
const maybeSave = ( element, blockType, attributes ) => {
	if (
		'core/table' === blockType.name &&
		attributes.className &&
		-1 !== attributes.className.indexOf( 'material' )
	) {
		return <DataTableSave { ...{ attributes } } />;
	}

	return element;
};

addFilter( 'blocks.getSaveElement', 'material/data-table-save', maybeSave );
