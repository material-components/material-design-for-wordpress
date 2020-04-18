/**
 * Internal dependencies
 */
import ListItemText from '../../components/list-item-text';

/**
 * External dependencies
 */
import classNames from 'classnames';

const ListItemSave = ( {
	className,
	attributes: { url, rel, linkTarget, leadingIcon, trailingIcon, ...textProps },
} ) => (
	<li
		className={ classNames( 'mdc-list-item', 'list-item', className ) }
		tabIndex={ 0 }
	>
		{ leadingIcon && (
			<i className="mdc-list-item__graphic material-icons">
				{ String.fromCharCode( leadingIcon?.hex ) }
			</i>
		) }

		<a
			href={ url || '#' }
			rel={ rel }
			target={ linkTarget }
			className="list-item__link"
		>
			&nbsp;
		</a>

		<ListItemText { ...textProps } />

		{ trailingIcon && (
			<i className="mdc-list-item__meta material-icons">
				{ String.fromCharCode( trailingIcon?.hex ) }
			</i>
		) }
	</li>
);

export default ListItemSave;
