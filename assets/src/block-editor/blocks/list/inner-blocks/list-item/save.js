/**
 * Internal dependencies
 */
import ListItemText from '../../components/list-item-text';

/**
 * External dependencies
 */
import classNames from 'classnames';

const ListItemSave = ( {
	attributes: {
		url,
		rel,
		editable,
		linkTarget,
		leadingIcon,
		trailingIcon,
		...textProps
	},
	className,
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
			rel={ rel }
			href={ url || '#' }
			editable={ editable }
			className="list-item__link"
			target={ linkTarget ?? undefined }
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
