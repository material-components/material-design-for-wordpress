/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import CardActions from '../../../../../../assets/src/block-editor/blocks/recent-posts/components/card-actions';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <CardActions { ...props } /> );
};

const post = {
	authorDisplayName: 'Test user',
	commentsCount: 1,
};

describe( 'CardActions', () => {
	it( 'matches snapshot when the post author and comments count should be displayed', () => {
		const wrapper = setup( {
			displayPostAuthor: true,
			displayCommentsCount: true,
			post,
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the post author and comments count should not be displayed', () => {
		const wrapper = setup( {
			displayPostAuthor: false,
			displayCommentsCount: false,
			post,
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when only the post author should be displayed', () => {
		const wrapper = setup( {
			displayPostAuthor: true,
			displayCommentsCount: false,
			post,
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when only the comments count should be displayed', () => {
		const wrapper = setup( {
			displayPostAuthor: false,
			displayCommentsCount: true,
			post,
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the comments count is zero', () => {
		post.commentsCount = 0;
		const wrapper = setup( {
			displayPostAuthor: true,
			displayCommentsCount: true,
			post,
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the comments count is more than one', () => {
		post.commentsCount = 2;
		const wrapper = setup( {
			displayPostAuthor: true,
			displayCommentsCount: true,
			post,
		} );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
