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
import Image from '../../../../../../assets/src/block-editor/blocks/image-list/components/image';

/**
 * Render the component.
 *
 * @param {Object} props - Component props
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <Image { ...props } /> );
};

const imageProps = {
	alt: 'Example Image 1',
	url: 'https://i.picsum.photos/id/22/500/500.jpg',
	id: 1,
	link: 'http://example.com/image-1',
};

describe( 'ImageList: Image', () => {
	it( 'matches snapshot', () => {
		const wrapper = setup( imageProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when saveContext', () => {
		const wrapper = setup( { ...imageProps, isSaveContext: true } );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
