const ListItemSave = ( {
	attributes: { primaryText, secondaryText, icon, iconPosition },
} ) => {
	return (
		<li className="mdc-list-item" tabIndex="0">
			{ icon && iconPosition === 'leading' && (
				<i className="mdc-list-item__graphic material-icons">
					{ String.fromCharCode( icon?.hex ) }
				</i>
			) }
			<span className="mdc-list-item__text" style={ { overflow: 'visible' } }>
				<span className="mdc-list-item__primary-text">{ primaryText }</span>

				{ secondaryText && (
					<span className="mdc-list-item__secondary-text">
						{ secondaryText }
					</span>
				) }
			</span>

			{ icon && iconPosition === 'trailing' && (
				<i className="mdc-list-item__meta material-icons">
					{ String.fromCharCode( icon?.hex ) }
				</i>
			) }
		</li>
	);
};

export default ListItemSave;
