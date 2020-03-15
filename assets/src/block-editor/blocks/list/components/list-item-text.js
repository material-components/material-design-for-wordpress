/**
 * External dependencies
 */
import classNames from 'classnames';

const ListItemText = ( {
	primaryText,
	secondaryText,
	editable = false,
	onEnterPrimary,
	onBlurPrimary,
	onEnterSecondary,
	onBlurSecondary,
} ) => {
	if ( ! secondaryText ) {
		return (
			<span
				className="mdc-list-item__text"
				role={ editable ? 'textbox' : undefined }
				tabIndex={ editable ? 0 : undefined }
				contentEditable={ editable }
				suppressContentEditableWarning={ editable }
				onKeyPress={ onEnterPrimary }
				onBlur={ onBlurPrimary }
			>
				{ primaryText }
			</span>
		);
	}

	return (
		<span
			className={ classNames( 'mdc-list-item__text', {
				'list-item__text-container': editable,
			} ) }
		>
			<span
				className="mdc-list-item__primary-text list-item__text-container__text"
				role={ editable ? 'textbox' : undefined }
				tabIndex={ editable ? 0 : undefined }
				contentEditable={ editable }
				suppressContentEditableWarning={ editable }
				onKeyPress={ onEnterPrimary }
				onBlur={ onBlurPrimary }
			>
				{ primaryText }
			</span>
			<span
				className="mdc-list-item__secondary-text list-item__text-container__text"
				role={ editable ? 'textbox' : undefined }
				tabIndex={ editable ? 0 : undefined }
				contentEditable={ editable }
				suppressContentEditableWarning={ editable }
				onKeyPress={ onEnterSecondary }
				onBlur={ onBlurSecondary }
			>
				{ secondaryText }
			</span>
		</span>
	);
};

export default ListItemText;
