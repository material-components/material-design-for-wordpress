/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import Save from '../../../../../../assets/src/block-editor/blocks/list/inner-blocks/list-item/save';

/**
 * Shallow render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <Save { ...props } /> );
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
};

describe( 'Save', () => {
	it( 'matches snapshot', () => {
		const wrapper = setup( { ...baseProps } );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when invalid URL and no linkTarget', () => {
		const wrapper = setup( {
			attributes: {
				...baseProps.attributes,
				url: undefined,
				linkTarget: undefined,
			},
		} );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
