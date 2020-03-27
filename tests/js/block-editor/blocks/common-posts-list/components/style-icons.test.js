/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import {
	MasonryIcon,
	GridIcon,
	ListIcon,
} from '../../../../../../assets/src/block-editor/blocks/common-posts-list/components/style-icons';

describe( 'MasonryIcon', () => {
	it( 'matches snapshot', () => {
		const wrapper = render( <MasonryIcon /> );
		expect( wrapper ).toMatchSnapshot();
	} );
} );

describe( 'GridIcon', () => {
	it( 'matches snapshot', () => {
		const wrapper = render( <GridIcon /> );
		expect( wrapper ).toMatchSnapshot();
	} );
} );

describe( 'ListIcon', () => {
	it( 'matches snapshot', () => {
		const wrapper = render( <ListIcon /> );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
