/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export const example = {
	attributes: {
		body: [
			{
				cells: [
					{
						content: __( 'Column One', 'material-theme-builder' ),
						tag: 'td',
					},
					{
						content: __( 'Column Two', 'material-theme-builder' ),
						tag: 'td',
					},
				],
			},
			{
				cells: [
					{
						content: __( 'Column Three', 'material-theme-builder' ),
						tag: 'td',
					},
					{
						content: __( 'Column Four', 'material-theme-builder' ),
						tag: 'td',
					},
				],
			},
		],
	},
};
