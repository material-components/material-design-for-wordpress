export default setAttributes => (
	attribute,
	callback = () => {},
	allowUndefined = false
) => newValue => {
	const returnValue = callback( newValue );

	if ( returnValue !== undefined || allowUndefined ) {
		newValue = returnValue;
	}

	setAttributes( { [ attribute ]: newValue } );
};
