export default setAttributes => (
	attribute,
	callback = () => {}
) => newValue => {
	callback( newValue );
	setAttributes( { [ attribute ]: newValue } );
};
