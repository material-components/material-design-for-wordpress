/**
 * Textarea Input Element component.
 *
 * @param {Object} props - Component props.
 * @param {string} props.inputValue - Input value.
 * @param {string} props.id - Input ID.
 * @param {string} props.inputRole - Input Role.
 * @param {boolean} props.displayLabel - Whether or not to display the label.
 * @param {string} props.label - Input label.
 * @param {Function} props.onChange - Input on change handler.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const TextareaInputElement = ( {
	editMode = true,
	inputValue,
	id,
	inputRole,
	displayLabel,
	label,
	onChange,
	isRequired,
} ) => {
	return (
		<textarea
			value={ inputValue }
			id={ id }
			name={ id }
			className="mdc-text-field__input"
			rows="8"
			aria-labelledby={ displayLabel ? `label-${ id }` : undefined }
			aria-label={ ! displayLabel ? label : undefined }
			onChange={ onChange }
			data-form="contact"
			data-meta={ inputRole }
			data-label={ label }
			required={ ! editMode ? isRequired : undefined }
			tabIndex={ editMode ? -1 : undefined }
		></textarea>
	);
};

export default TextareaInputElement;
