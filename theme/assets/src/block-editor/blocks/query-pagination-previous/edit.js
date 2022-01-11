/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

const QueryPaginationPreviousEdit = () => {
	return (
		<a
			href="#pagination-previous-pseudo-link"
			className="mdc-ripple-surface"
			onClick={ event => event.preventDefault() }
			{ ...useBlockProps() }
		>
			<span className="material-icons" aria-hidden="true">
				chevron_left
			</span>
			<span className="screen-reader-text">
				{ __( 'Previous page', 'material-design-google' ) }
			</span>
		</a>
	);
};

export default QueryPaginationPreviousEdit;
