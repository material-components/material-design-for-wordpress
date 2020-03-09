/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { shallow } from 'enzyme';
/**
 * Internal dependencies
 */
import HandPickedPostsBlockControls from '../../../../../../assets/src/block-editor/blocks/hand-picked-posts/components/block-controls';

/**
 * Render the component.
 *
 * @param {Object} props - Component props
 * @return {Function} A functional component.
 */
const setup = props => {
	return shallow( <HandPickedPostsBlockControls { ...props } /> );
};

describe( 'HandPickedPostsBlockControls', () => {
	it( 'matches snapshot when the edit mode is true', () => {
		const wrapper = setup( {
			attributes: { editMode: true },
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the edit mode is false', () => {
		const wrapper = setup( {
			attributes: { editMode: false },
		} );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
