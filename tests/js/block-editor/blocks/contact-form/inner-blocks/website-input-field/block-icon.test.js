/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import BlockIcon from '../../../../../../../assets/src/block-editor/blocks/contact-form/inner-blocks/website-input-field/block-icon';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <BlockIcon { ...props } /> );
};

describe( 'BlockIcon', () => {
	it( 'matches snapshot', () => {
		const wrapper = setup( {} );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
