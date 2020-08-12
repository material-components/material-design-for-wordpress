import { createBlock } from '@wordpress/blocks';

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'core/gallery' ],
			transform: ( { images } ) =>
				createBlock( 'material/image-list', {
					images,
				} ),
		},
	],
};

export default transforms;
