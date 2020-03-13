/**
 * External dependencies
 */
import classNames from 'classnames';

const ListItemSave = ( {
	attributes: { primaryText, secondaryText, leadingIcon, trailingIcon },
	className,
} ) => (
	<li className={ classNames( 'mdc-list-item', className ) } tabIndex={ 0 }>
		{ leadingIcon && (
			<i className="mdc-list-item__graphic material-icons">
				{ String.fromCharCode( leadingIcon?.hex ) }
			</i>
		) }
		<span className="mdc-list-item__text">
			<span className="mdc-list-item__primary-text">{ primaryText }</span>

			{ secondaryText && (
				<span className="mdc-list-item__secondary-text">{ secondaryText }</span>
			) }
		</span>

		{ trailingIcon && (
			<i className="mdc-list-item__meta material-icons">
				{ String.fromCharCode( trailingIcon?.hex ) }
			</i>
		) }
	</li>
);

export default ListItemSave;
