/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import ListItemText from '../../../../../../assets/src/block-editor/blocks/list/components/list-item-text';

/**
 * Shallow render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <ListItemText { ...props } /> );
};

const baseProps = {
	primaryText: 'List Item Title',
	secondaryText: 'List Item Caption',
};

describe( 'ListItemText', () => {
	it( 'matches snapshot', () => {
		const wrapper = setup( { ...baseProps } );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when editable', () => {
		const wrapper = setup( { ...baseProps, editable: true } );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
