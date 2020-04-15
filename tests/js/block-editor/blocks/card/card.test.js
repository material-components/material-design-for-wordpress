/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	name,
	settings,
} from '../../../../../assets/src/block-editor/blocks/card';

import BlockIcon from '../../../../../assets/src/block-editor/blocks/card/components/block-icon';
import Edit from '../../../../../assets/src/block-editor/blocks/card/edit';
import Save from '../../../../../assets/src/block-editor/blocks/card/save';

describe( 'blocks: material/hand-picked-posts', () => {
	afterEach( () => {
		jest.clearAllMocks();
	} );

	describe( 'name', () => {
		it( 'should equal material/card', () => {
			expect( name ).toStrictEqual( 'material/card' );
		} );
	} );

	describe( 'title settings', () => {
		it( 'should equal Card', () => {
			expect( settings.title ).toStrictEqual( 'Card' );
		} );
	} );

	describe( 'description settings', () => {
		it( 'should equal `Add a card to display content and actions on a single topic.`', () => {
			expect( settings.description ).toStrictEqual(
				'Add a card to display content and actions on a single topic.'
			);
		} );
	} );

	describe( 'category settings', () => {
		it( 'should equal material', () => {
			expect( settings.category ).toStrictEqual( 'material' );
		} );
	} );

	describe( 'supports settings', () => {
		it( 'should have align supporting only wide and full alignment', () => {
			expect( settings.supports ).toStrictEqual( {
				align: [ 'left', 'right' ],
			} );
		} );
	} );

	describe( 'icon settings', () => {
		it( 'should be equal to the BlockIcon component', () => {
			expect( settings.icon ).toStrictEqual( BlockIcon );
		} );
	} );

	describe( 'attributes', () => {
		it( 'should be a structured object', () => {
			expect( settings.attributes ).toStrictEqual( {
				contentLayout: {
					type: 'string',
					default: 'text-under-media',
				},
				title: {
					type: 'string',
					default: __( 'Title goes here', 'material-theme-builder' ),
				},
				displayTitle: {
					type: 'boolean',
					default: true,
				},
				secondaryText: {
					type: 'string',
					default: __( 'Secondary Text', 'material-theme-builder' ),
				},
				displaySecondaryText: {
					type: 'boolean',
					default: true,
				},
				imageSourceUrl: {
					type: 'string',
				},
				isImageEditMode: {
					type: 'boolean',
				},
				displayImage: {
					type: 'boolean',
					default: true,
				},
				supportingText: {
					type: 'string',
					default: __( 'Supporting Text', 'material-theme-builder' ),
				},
				displaySupportingText: {
					type: 'boolean',
					default: true,
				},
				primaryActionButtonLabel: {
					type: 'string',
					default: __( 'Button text', 'material-theme-builder' ),
				},
				primaryActionButtonUrl: {
					type: 'string',
				},
				primaryActionButtonNewTab: {
					type: 'bool',
					default: false,
				},
				primaryActionButtonNoFollow: {
					type: 'bool',
					default: false,
				},
				secondaryActionButtonLabel: {
					type: 'string',
					default: __( 'Button text', 'material-theme-builder' ),
				},
				secondaryActionButtonUrl: {
					type: 'string',
				},
				secondaryActionButtonNewTab: {
					type: 'bool',
					default: false,
				},
				secondaryActionButtonNoFollow: {
					type: 'bool',
					default: false,
				},
				displayActions: {
					type: 'boolean',
					default: true,
				},
				displaySecondaryActionButton: {
					type: 'bool',
					default: false,
				},
				cornerRadius: {
					type: 'number',
					default: 4,
				},
				outlined: {
					type: 'boolean',
					default: false,
				},
			} );
		} );
	} );

	describe( 'settings edit property', () => {
		it( 'should be equal to the Edit component', () => {
			expect( settings.edit ).toStrictEqual( Edit );
		} );
	} );

	describe( 'settings save property', () => {
		it( 'should be equal to the Save component', () => {
			expect( settings.save ).toStrictEqual( Save );
		} );
	} );
} );
