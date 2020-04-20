/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import Edit from '../../../../../../assets/src/block-editor/blocks/list/inner-blocks/list-item/edit';

// Mock the <InspectorControls> component only, so that the other components in this package behave as usual.
jest.mock( '@wordpress/block-editor', () => {
	const original = require.requireActual( '@wordpress/block-editor' );
	return {
		...original,
		InspectorControls: ( { children } ) => children,
	};
} );

jest.mock( '@wordpress/element', () => {
	const original = require.requireActual( '@wordpress/element' );
	let counter = 0;
	return {
		...original,
		useContext: () => ( {
			style: counter ? 'two-line' : 'basic',
			parentClientId: 'LIST',
			leadingIconsEnabled: counter ? true : false,
			trailingIconsEnabled: counter ? true : false,
			counter: ++counter,
		} ),
	};
} );

/**
 * Shallow render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <Edit { ...props } /> );
};

const baseProps = {
	attributes: {
		url: 'http://google.com',
		linkTarget: '_blank',
		leadingIcon: {
			hex: 59517,
			name: 'favorite',
		},
		trailingIcon: {
			name: 'account_balance wallet',
			hex: 59472,
		},
		primaryText: 'List Item Title',
		secondaryText: 'List Item Caption',
	},
	setAttributes: jest.fn(),
};

describe( 'Edit', () => {
	it( 'matches snapshot', () => {
		const wrapper = setup( { ...baseProps } );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when invalid URL and no linkTarget', () => {
		const wrapper = setup( {
			...baseProps,
			attributes: {
				...baseProps.attributes,
				url: undefined,
				linkTarget: undefined,
			},
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when invalid icons', () => {
		const wrapper = setup( {
			...baseProps,
			attributes: {
				...baseProps.attributes,
				leadingIcon: undefined,
				trailingIcon: undefined,
			},
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when invalid secondary text', () => {
		const wrapper = setup( {
			...baseProps,
			attributes: {
				...baseProps.attributes,
				secondaryText: undefined,
			},
		} );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
