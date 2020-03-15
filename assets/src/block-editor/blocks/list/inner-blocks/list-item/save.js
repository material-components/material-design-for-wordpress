/**
 * Internal dependencies
 */
import ListItemText from '../../components/list-item-text';

/**
 * External dependencies
 */
import classNames from 'classnames';

const ListItemSave = ( {
	attributes: { leadingIcon, trailingIcon, ...textProps },
	className,
} ) => (
	<li className={ classNames( 'mdc-list-item', className ) } tabIndex={ 0 }>
		{ leadingIcon && (
			<i className="mdc-list-item__graphic material-icons">
				{ String.fromCharCode( leadingIcon?.hex ) }
			</i>
		) }

		<ListItemText { ...textProps } />

		{ trailingIcon && (
			<i className="mdc-list-item__meta material-icons">
				{ String.fromCharCode( trailingIcon?.hex ) }
			</i>
		) }
	</li>
);

export default ListItemSave;
