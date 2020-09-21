/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import Edit from '../../../../../assets/src/block-editor/blocks/list/edit';

/**
 * Shallow render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <Edit { ...props } /> );
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

describe( 'Edit', () => {
	beforeAll( () => {
		window.getSelection = () => {
			return {
				addRange: () => {},
				removeAllRanges: () => {},
			};
		};
		document.createRange = () => ( {
			collapse: () => {},
			setStart: () => {},
			setEnd: () => {},
			commonAncestorContainer: {
				nodeName: 'BODY',
				ownerDocument: document,
			},
		} );
	} );

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
