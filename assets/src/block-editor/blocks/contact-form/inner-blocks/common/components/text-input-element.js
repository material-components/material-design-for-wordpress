/**
 * Text Input Element component.
 *
 * @param {Object} props - Component props.
 * @param {string} props.inputValue - Input value.
 * @param {string} props.id - Input ID.
 * @param {string} props.inputType - Input Type.
 * @param {string} props.inputRole - Input Role.
 * @param {boolean} props.displayLabel - Whether or not to display the label.
 * @param {string} props.label - Input label.
 * @param {Function} props.onChange - Input on change handler.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const TextInputElement = ( {
	editMode = true,
	inputValue,
	id,
	inputType,
	inputRole,
	displayLabel,
	label,
	onChange,
	isRequired,
} ) => {
	return (
		<input
			value={ inputValue }
			id={ id }
			name={ id }
			type={ inputType }
			required={ ! editMode ? isRequired : undefined }
			className="mdc-text-field__input"
			aria-labelledby={ displayLabel ? `label-${ id }` : undefined }
			aria-label={ ! displayLabel ? label : undefined }
			onChange={ onChange }
			data-form="contact"
			data-meta={ inputRole }
			data-label={ label }
			tabIndex={ editMode ? -1 : undefined }
		/>
	);
};

export default TextInputElement;
