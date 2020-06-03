/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';

/**
 * Internal dependencies
 */
import Card from '../../../../../assets/src/wizard/components/content/card';
import { StepProvider } from '../../../../../assets/src/wizard/context';

const setup = props => {
	return render(
		<StepProvider>
			<Card { ...props } />
		</StepProvider>
	);
};

describe( 'Wizard: Card', () => {
	afterEach( cleanup );

	it( 'matches snapshot', () => {
		const wrapper = setup( {
			image: 'http://example.com/image.png',
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when switch is set', () => {
		const wrapper = setup( {
			image: 'http://example.com/image.png',
			switch: 'DEMO',
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when imageSpan is set', () => {
		const wrapper = setup( {
			image: 'http://example.com/image.png',
			switch: 'DEMO',
			imageSpan: 6,
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when contentSpan is set', () => {
		const wrapper = setup( {
			image: 'http://example.com/image.png',
			switch: 'DEMO',
			contentSpan: 6,
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when children is set', () => {
		const wrapper = setup( {
			image: 'http://example.com/image.png',
			switch: 'DEMO',
			children: <div>Example content</div>,
		} );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
