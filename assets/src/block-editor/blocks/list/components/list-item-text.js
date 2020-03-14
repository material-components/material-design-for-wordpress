const ListItemText = ( { primaryText, secondaryText } ) => {
	if ( ! secondaryText ) {
		return <span className="mdc-list-item__text">{ primaryText }</span>;
	}

	return (
		<span className="mdc-list-item__text">
			<span className="mdc-list-item__primary-text">{ primaryText }</span>
			<span className="mdc-list-item__secondary-text">{ secondaryText }</span>
		</span>
	);
};

export default ListItemText;
