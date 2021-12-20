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

addFilter(
	'blocks.registerBlockType',
	'material/navigation-link-style',
	addMaterialStyle
);
