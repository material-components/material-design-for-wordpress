/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import Image from '../../../../../../assets/src/block-editor/blocks/image-list/components/image';

/**
 * Render the component.
 *
 * @param {Object} props - Component props
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <Image { ...props } /> );
};

const imageProps = {
	alt: 'Example Image 1',
	url: 'https://i.picsum.photos/id/22/500/500.jpg',
	id: 1,
	link: 'http://example.com/image-1',
};

describe( 'ImageList: Image', () => {
	it( 'matches snapshot', () => {
		const wrapper = setup( imageProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when saveContext', () => {
		const wrapper = setup( { ...imageProps, isSaveContext: true } );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
