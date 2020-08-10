import { createBlock } from '@wordpress/blocks';

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'core/buttons' ],
			transform: ( buttonsAttributes, buttons ) => {
				return buttons.map( ( { attributes } ) => {
					return createBlock( 'material/button', {
						label: attributes.text,
						url: attributes.url,
						linkTarget: attributes.linkTarget,
						rel: attributes.rel,
					} );
				} );
			},
		},
	],
};

export default transforms;
