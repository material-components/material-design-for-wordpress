import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

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
		if ( 'core/navigation-link' === props.name ) {
			console.log('modified block');
			return (
				<>
					<BlockEdit { ...props } />
				</>
			);
		}

		return <BlockEdit { ...props } />;
	};
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
