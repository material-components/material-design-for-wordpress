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
import Save from '../../../../../assets/src/block-editor/blocks/list/save';

// Mock the <InnerBlocks> component only, so that the other components in this package behave as usual.
jest.mock( '@wordpress/block-editor', () => {
	const original = jest.requireActual( '@wordpress/block-editor' );

	return {
		...original,
		InnerBlocks: {
			Content: () => {
				const innerBlocks = [
					{
						name: 'material/list-item',
						attributes: {
							url: 'http://example.com',
							primaryText: 'List Item #1',
							secondaryText: 'List Item #1 secondary text',
						},
					},
					{
						name: 'material/list-item',
						attributes: {
							url: 'http://example.com/item-2',
							primaryText: 'List Item #2',
							secondaryText: 'List Item #2 secondary text',
						},
					},
				];
				return (
					<>
						{ innerBlocks.map( block => (
							<div key={ block.clientId }>
								{ ' ' }
								{ JSON.stringify( block ) }{ ' ' }
							</div>
						) ) }
					</>
				);
			},
		},
	};
} );

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
		style: 'basic',
		iconPosition: 'leading',
		iconSize: 'small',
		items: [
			{
				primaryText: 'List Item #1',
				secondaryText: 'List Item #1 secondary text',
				icon: 'spa',
				url: 'http://example.com',
				target: '_blank',
			},
			{
				primaryText: 'List Item #2',
				secondaryText: 'List Item #2 secondary text',
				icon: 'book',
				url: 'http://example.com/item-2',
				target: '',
			},
		],
	},
};

describe( 'Save', () => {
	it( 'matches snapshot with basic style', () => {
		const wrapper = setup( { ...baseProps } );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot with two-line style', () => {
		const wrapper = setup( {
			...baseProps,
			attributes: { ...baseProps.attributes, style: 'two-line' },
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot with trailing icon position', () => {
		const wrapper = setup( {
			...baseProps,
			attributes: { ...baseProps.attributes, iconPosition: 'trailing' },
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot with no icon position', () => {
		const wrapper = setup( {
			...baseProps,
			attributes: { ...baseProps.attributes, iconPosition: 'none' },
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot with large icon size', () => {
		const wrapper = setup( {
			...baseProps,
			attributes: { ...baseProps.attributes, iconSize: 'large' },
		} );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
