/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import Cards from '../../../../../../assets/src/block-editor/blocks/cards-collection/components/cards';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <Cards { ...props } /> );
};

const baseProps = {
	style: 'masonry',
	gutter: 16,
	columns: 4,
	cards: [ <div key="1">card</div> ],
};

describe( 'Cards', () => {
	it( 'matches snapshot when the style is `masonry`', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the style is `list`', () => {
		const props = { ...baseProps };
		props.style = 'list';
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the style is `grid`', () => {
		const props = { ...baseProps };
		props.style = 'grid';
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
