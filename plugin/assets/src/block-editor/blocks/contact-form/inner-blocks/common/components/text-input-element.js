/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Text Input Element component.
 *
 * @param {Object}   props              - Component props.
 * @param {string}   props.inputValue   - Input value.
 * @param {string}   props.id           - Input ID.
 * @param {string}   props.inputType    - Input Type.
 * @param {string}   props.inputRole    - Input Role.
 * @param {boolean}  props.displayLabel - Whether or not to display the label.
 * @param {string}   props.label        - Input label.
 * @param {Function} props.onChange     - Input on change handler.
 * @param {boolean}  props.isRequired
 * @param {boolean}  props.editMode
 *
 * @return {JSX.Element} Function returning the HTML markup for the component.
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
