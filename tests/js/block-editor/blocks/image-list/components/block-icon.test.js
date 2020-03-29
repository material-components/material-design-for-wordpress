/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import BlockIcon from '../../../../../../assets/src/block-editor/blocks/image-list/components/block-icon';

/**
 * Render the component.
 *
 * @return {Function} A functional component.
 */
const setup = () => {
	return render( <BlockIcon /> );
};

describe( 'blocks: material/image-list: BlockIcon', () => {
	it( 'matches snapshot', () => {
		const wrapper = setup();
		expect( wrapper ).toMatchSnapshot();
	} );
} );
