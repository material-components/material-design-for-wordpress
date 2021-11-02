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
import Save from '../../../../../assets/src/block-editor/blocks/buttons/save';

// Mock the <InnerBlocks> component only, so that the other components in this package behave as usual.
jest.mock( '@wordpress/block-editor', () => {
	const original = jest.requireActual( '@wordpress/block-editor' );

	return {
		...original,
		InnerBlocks: {
			Content: () => {
				const innerBlocks = [
					{
						id: 'button-1',
						name: 'material/button',
					},
				];

				return (
					<>
						{ innerBlocks.map( block => (
							<div key={ block.id }>
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
 * Render the component.
 *
 * @return {Function} A functional component.
 */
const setup = () => {
	return render( <Save /> );
};

describe( 'blocks: material/buttons: Save', () => {
	it( 'matches snapshot', () => {
		const wrapper = setup();
		expect( wrapper ).toMatchSnapshot();
	} );
} );
