/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

const QueryPaginationLastEdit = ( {
	attributes: { label },
	setAttributes,
	context: { paginationArrow },
} ) => {
	return (
		<a
			href="#pagination-last-pseudo-link"
			className="mdc-ripple-surface"
			onClick={ event => event.preventDefault() }
			{ ...useBlockProps() }
		>
			<span className="material-icons" aria-hidden="true">
				last_page
			</span>
			<span className="screen-reader-text">
				{ __( 'Last page', 'material-design-google' ) }
			</span>
		</a>
	);
};

export default QueryPaginationLastEdit;
