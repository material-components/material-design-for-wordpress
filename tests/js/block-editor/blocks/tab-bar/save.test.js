/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import Save from '../../../../../assets/src/block-editor/blocks/tab-bar/save';

/**
 * Render the component.
 *
 * @param {Object} props - Component props
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <Save { ...props } /> );
};

const tabProps = {
	attributes: {
		tabs: [
			{
				label: 'Tab 1 Title',
				content: [
					{
						clientId: 'c0cf3523-d407-4389-939d-b1d1007b316f',
						name: 'core/paragraph',
						isValid: true,
						attributes: {
							content: 'Tab 1 content',
							dropCap: false,
						},
						innerBlocks: [],
					},
				],
			},
			{
				label: 'Tab 2 Title',
				content: [
					{
						clientId: '00d62a82-e010-49cb-982a-bc04767df7ea',
						name: 'core/paragraph',
						isValid: true,
						attributes: {
							content: 'Tab 2 content',
							dropCap: false,
						},
						innerBlocks: [],
					},
				],
			},
		],
		iconPosition: 'none',
	},
	className: 'wp-block-material-tab-bar',
};

describe( 'blocks: material/tab-bar: Save', () => {
	it( 'matches snapshot', () => {
		const wrapper = setup( tabProps );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
