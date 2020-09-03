/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'core/list' ],
			transform: ( { values } ) => {
				const itemValues = values.match( /(?<=\<li\>).*?(?=\<\/li\>)/gm );
				const items = [];

				itemValues.forEach( value => {
					items.push( {
						icon: 'favorite',
						primaryText: value,
					} );
				} );

				return createBlock( 'material/list', {
					items,
				} );
			},
		},
	],
};

export default transforms;
