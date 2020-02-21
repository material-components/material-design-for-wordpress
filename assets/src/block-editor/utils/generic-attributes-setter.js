export default setAttributes => (
	attribute,
	callback = () => {}
) => newValue => {
	const returnValue = callback( newValue );

	if ( returnValue !== undefined ) {
		newValue = returnValue;
	}

	setAttributes( { [ attribute ]: newValue } );
};
