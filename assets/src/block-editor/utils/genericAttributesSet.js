export default (
	attribute,
	setAttributes,
	callback = () => {}
) => newValue => {
	callback( newValue );
	setAttributes( { [ attribute ]: newValue } );
};
