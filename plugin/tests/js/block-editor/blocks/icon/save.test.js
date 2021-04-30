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
import IconSave from '../../../../../assets/src/block-editor/blocks/icon/save';

const baseProps = {
	attributes: {
		iconSize: '24',
		icon: 'spa',
		textColor: '',
		customSize: '',
		align: '',
	},
};

const setup = props => {
	return render( <IconSave { ...props } /> );
};

describe( 'Icon Save', () => {
	it( 'matches snapshot for icon style', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot for icon custom size', () => {
		const wrapper = setup( {
			attributes: {
				...baseProps.attributes,
				iconSize: 'custom',
				customSize: 100,
			},
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot for icon with custom color', () => {
		const wrapper = setup( {
			attributes: { ...baseProps.attributes, textColor: '#f1f1f1' },
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot for center icon with custom size', () => {
		const wrapper = setup( {
			attributes: {
				...baseProps.attributes,
				iconSize: 'custom',
				customSize: 100,
				align: 'center',
			},
		} );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
