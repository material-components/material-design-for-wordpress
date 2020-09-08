/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'core/buttons' ],
			transform: ( buttonsAttributes, buttons ) => {
				const innerButtons = buttons.map( ( { attributes } ) => {
					return createBlock( 'material/button', {
						label: attributes.text,
						url: attributes.url,
						linkTarget: attributes.linkTarget,
						rel: attributes.rel,
					} );
				} );

				return createBlock( 'material/buttons', {}, innerButtons );
			},
		},
	],
};

export default transforms;
