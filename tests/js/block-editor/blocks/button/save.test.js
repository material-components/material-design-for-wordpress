/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import ButtonSave from '../../../../../assets/src/block-editor/blocks/button/save';

const baseProps = {
	attributes: {
		type: 'text',
		style: 'raised',
		backgroundColor: '#333',
		textColor: '#f1f1f1',
		url: 'https://google.com',
		cornerRadius: 5,
		icon: {
			name: 'account_balance wallet',
			hex: 59472,
		},
	},
};

const setup = props => {
	return render( <ButtonSave { ...props } /> );
};

describe( 'Button Save', () => {
	it( 'matches snapshot for button style', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot for icon style', () => {
		const wrapper = setup( {
			attributes: { ...baseProps.attributes, type: 'icon' },
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot for button style with leading icon', () => {
		const wrapper = setup( {
			attributes: { ...baseProps.attributes, iconPosition: 'leading' },
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot for button style with trailing icon', () => {
		const wrapper = setup( {
			attributes: { ...baseProps.attributes, iconPosition: 'trailing' },
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot with no url, backgroundColor, textColor and cornerRadius', () => {
		const wrapper = setup( {
			attributes: {
				...baseProps.attributes,
				url: false,
				backgroundColor: '',
				textColor: '',
				cornerRadius: undefined,
			},
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot for icon style with no url, backgroundColor, textColor and cornerRadius', () => {
		const wrapper = setup( {
			attributes: {
				...baseProps.attributes,
				type: 'icon',
				url: false,
				backgroundColor: '',
				textColor: '',
				cornerRadius: undefined,
			},
		} );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
