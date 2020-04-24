/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { shallow } from 'enzyme';

/**
 * Internal dependencies
 */
import InspectorControls from '../../../../../../../assets/src/block-editor/blocks/contact-form/inner-blocks/common/components/inspector-controls';

/**
 * Render the component in a shallow mode using enzyme.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setupShallow = props => {
	return shallow( <InspectorControls { ...props } /> );
};

const baseProps = {
	attributes: {
		id: 'test-id',
		label: 'Test Label',
	},
};

describe( 'InspectorControls', () => {
	afterEach( () => {
		jest.clearAllMocks();
	} );

	it( 'matches snapshot', () => {
		const wrapper = setupShallow( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
