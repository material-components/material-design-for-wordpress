const ListItemText = ( {
	url,
	rel,
	linkTarget,
	primaryText,
	secondaryText,
	editable = false,
	onEnterPrimary,
	onBlurPrimary,
	onEnterSecondary,
	onBlurSecondary,
} ) => {
	const Linkable = ( { children, className } ) =>
		editable ? (
			<span
				className={ className }
				role={ editable ? 'textbox' : undefined }
				tabIndex={ editable ? 0 : undefined }
				contentEditable={ editable }
				suppressContentEditableWarning={ editable }
				onKeyPress={ onEnterPrimary }
				onBlur={ onBlurPrimary }
			>
				{ children }
			</span>
		) : (
			<a
				href={ url ?? '#' }
				rel={ rel }
				target={ linkTarget ?? undefined }
				className={ className }
			>
				{ children }
			</a>
		);

	if ( ! secondaryText ) {
		return (
			<Linkable className="mdc-list-item__text list-item__text">
				{ primaryText }
			</Linkable>
		);
	}

	return (
		<span className="mdc-list-item__text">
			<Linkable className="mdc-list-item__primary-text list-item__text">
				{ primaryText }
			</Linkable>
			<span
				className="mdc-list-item__secondary-text list-item__text"
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
