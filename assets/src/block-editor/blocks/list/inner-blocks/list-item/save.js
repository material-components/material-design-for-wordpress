/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import ListItemText from '../../components/list-item-text';

const ListItemSave = ( {
	className,
	attributes: { url, linkTarget, leadingIcon, trailingIcon, ...textProps },
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
			target={ linkTarget }
			className="list-item__link"
			rel={ linkTarget ? 'noopener noreferrer' : undefined }
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
