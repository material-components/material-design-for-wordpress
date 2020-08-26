/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { shallow } from 'enzyme';

/**
 * Internal dependencies
 */
import FormInspectorControls from '../../../../../../assets/src/block-editor/blocks/contact-form/components/inspector-controls';

/**
 * Render the component in a shallow mode using enzyme.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setupShallow = props => {
	return shallow( <FormInspectorControls { ...props } /> );
};

const baseProps = {
	attributes: {
		emailTo: 'recipient@test.loc',
		subject: 'Test contact form',
		confirmationMessage: 'The form was submitted',
		outlined: true,
		fullWidth: true,
	},
	setter: jest.fn(),
};

describe( 'FormInspectorControls', () => {
	it( 'matches snapshot', () => {
		const wrapper = setupShallow( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
