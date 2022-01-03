/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

const QueryPaginationPreviousEdit = ( {
	attributes: { label },
	setAttributes,
	context: { paginationArrow },
} ) => {
	return (
		<a
			href="#pagination-first-pseudo-link"
			className="mdc-ripple-surface"
			onClick={ event => event.preventDefault() }
			{ ...useBlockProps() }
		>
			<span className="material-icons" aria-hidden="true">
				first_page
			</span>
			<span className="screen-reader-text">
				{ __( 'First page', 'material-design-google' ) }
			</span>
		</a>
	);
};

export default QueryPaginationPreviousEdit;
