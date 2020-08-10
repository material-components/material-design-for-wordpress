/**
 * Internal dependencies
 */
import {
	name,
	settings,
} from '../../../../../assets/src/block-editor/blocks/cards-collection';
import Edit from '../../../../../assets/src/block-editor/blocks/cards-collection/edit';
import Save from '../../../../../assets/src/block-editor/blocks/cards-collection/save';

const defaultCardsProps = [];

for ( let index = 0; index < 2; index++ ) {
	defaultCardsProps.push( {
		contentLayout: 'text-under-media',
		title: 'Title goes here',
		displayTitle: true,
		secondaryText: 'Secondary text',
		displaySecondaryText: true,
		imageSourceUrl: '',
		isImageEditMode: false,
		displayImage: true,
		supportingText: 'Supporting text',
		displaySupportingText: true,
		primaryActionButtonLabel: 'Button text',
		primaryActionButtonUrl: '',
		primaryActionButtonNewTab: false,
		primaryActionButtonNoFollow: false,
		secondaryActionButtonLabel: 'Button text',
		secondaryActionButtonUrl: '',
		secondaryActionButtonNewTab: false,
		secondaryActionButtonNoFollow: false,
		displayActions: true,
		displaySecondaryActionButton: false,
		outlined: false,
		cornerRadius: undefined,
	} );
}
describe( 'blocks: material/cards-collection', () => {
	describe( 'name', () => {
		it( 'should equal material/cards-collection', () => {
			expect( name ).toStrictEqual( 'material/cards-collection' );
		} );
	} );

	describe( 'title settings', () => {
		it( 'should equal `Cards Collection (Material)`', () => {
			expect( settings.title ).toStrictEqual( 'Cards Collection (Material)' );
		} );
	} );

	describe( 'description settings', () => {
		it( 'should equal `Add a group of cards to display content and actions on multiple topics.`', () => {
			expect( settings.description ).toStrictEqual(
				'Add a group of cards to display content and actions on multiple topics.'
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
				align: [ 'wide', 'full' ],
			} );
		} );
	} );

	describe( 'attributes', () => {
		it( 'should be a structured object', () => {
			expect( settings.attributes ).toStrictEqual( {
				id: {
					type: 'string',
					source: 'attribute',
					attribute: 'id',
					selector: '*',
				},
				style: {
					type: 'string',
					default: 'masonry',
				},
				align: {
					type: 'string',
					default: 'wide',
				},
				columns: {
					type: 'number',
					default: 2,
				},
				contentLayout: {
					type: 'string',
					default: 'text-under-media',
				},
				numberOfCards: {
					type: 'number',
					default: 2,
				},
				cardsProps: {
					type: 'array',
					default: defaultCardsProps,
				},
				gutter: {
					type: 'object',
					default: {
						desktop: 24,
						tablet: 16,
						mobile: 16,
					},
				},
				cornerRadius: {
					type: 'number',
				},
				lightbox: {
					type: 'boolean',
					default: false,
				},
				outlined: {
					type: 'boolean',
					default: false,
				},
				allowIndividualStyleOverride: {
					type: 'boolean',
					default: false,
				},
				allowIndividualContentOverride: {
					type: 'boolean',
					default: false,
				},
				displayTitle: {
					type: 'boolean',
					default: true,
				},
				displaySecondaryText: {
					type: 'boolean',
					default: true,
				},
				displayImage: {
					type: 'boolean',
					default: true,
				},
				displaySupportingText: {
					type: 'boolean',
					default: true,
				},
				displayActions: {
					type: 'boolean',
					default: true,
				},
				displaySecondaryActionButton: {
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
