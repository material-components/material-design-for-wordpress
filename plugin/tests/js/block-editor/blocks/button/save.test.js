/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
		icon: 'account_balance_wallet',
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

	it( 'matches snapshot for large button', () => {
		const wrapper = setup( {
			attributes: {
				...baseProps.attributes,
				iconPosition: 'leading',
				size: 'large',
			},
		} );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
