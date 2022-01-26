/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * External dependencies
 */
import classnames from 'classnames';

const withTitleClassNames = createHigherOrderComponent( BlockListBlock => {
	return props => {
		if ( 'core/site-title' === props.name ) {
			return (
				<BlockListBlock
					{ ...props }
					className={ classnames(
						'site-title mdc-typography mdc-typography--headline6',
						props.className
					) }
				/>
			);
		}

		return <BlockListBlock { ...props } />;
	};
}, 'withTitleClassNames' );

addFilter(
	'editor.BlockListBlock',
	'material/title-class-name',
	withTitleClassNames
);
