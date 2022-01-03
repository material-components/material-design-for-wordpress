/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

const addMaterialStyle = ( settings, name ) => {
	if ( 'core/query-pagination' === name ) {
		settings.styles = [
			{
				name: 'material',
				label: __( 'Material', 'material-design' ),
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
	'material/query-navigation-style',
	addMaterialStyle
);
