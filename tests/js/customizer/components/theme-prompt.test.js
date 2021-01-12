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
import { render, screen } from '@testing-library/react';

/**
 * Internal dependencies
 */
import ThemePrompt from '../../../../assets/src/customizer/components/theme-prompt';

/**
 * Render the component.
 *
 * @param {Object} props - Component props
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <ThemePrompt { ...props } /> );
};

const baseProps = { status: 'install' };

describe( 'ThemePrompt', () => {
	beforeAll( () => {
		global.materialDesign = {
			nonce: 'NONCE',
		};
	} );

	it( 'should render the prompt and ask to install', () => {
		setup( baseProps );
		expect( screen.getAllByText( 'Install' )[ 0 ] ).toBeInTheDocument();
	} );

	it( 'should render the prompt and ask to activate', () => {
		setup( { status: 'activate' } );
		expect( screen.getAllByText( 'Activate' )[ 0 ] ).toBeInTheDocument();
	} );

	it( 'should not render the prompt if the status is "ok"', () => {
		setup( { status: 'ok' } );

		expect( screen.queryByText( 'Install' ) ).toBeNull();
		expect( screen.queryByText( 'Activate' ) ).toBeNull();
	} );
} );
