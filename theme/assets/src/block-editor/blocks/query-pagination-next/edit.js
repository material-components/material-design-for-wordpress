/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

const QueryPaginationNextEdit = ( {
	attributes: { label },
	setAttributes,
	context: { paginationArrow },
} ) => {
	return (
		<a
			href="#pagination-next-pseudo-link"
			className="mdc-ripple-surface"
			onClick={ event => event.preventDefault() }
			{ ...useBlockProps() }
		>
			<span className="material-icons" aria-hidden="true">
				chevron_right
			</span>
			<span className="screen-reader-text">
				{ __( 'Next page', 'material-design-google' ) }
			</span>
		</a>
	);
};

export default QueryPaginationNextEdit;
