/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import MaterialNavigationEdit from './edit';

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
			console.log('modified block');
			console.log(props);
			return (
				<>
					<MaterialNavigationEdit { ...props } />
				</>
			);
		}
		console.log(props);
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

addFilter(
	'blocks.registerBlockType',
	'material/navigation-link-style',
	addMaterialStyle
);

addFilter(
	'editor.BlockEdit',
	'material/navigation-link-edit',
	withNavigationLinkEdit,
);
