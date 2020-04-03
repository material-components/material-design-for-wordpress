/**
 * External dependencies
 */
import classnames from 'classnames';
import { MDCTextField } from '@material/textfield';

/**
 * WordPress dependencies
 */
import { withInstanceId } from '@wordpress/compose';
import { useLayoutEffect } from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import '../editor.css';
import '../style.css';
import genericAttributesSetter from '../../../../../utils/generic-attributes-setter';
import InputInspectorControls from './inspector-controls';
import { __ } from '@wordpress/i18n';

/**
 * Text Input Field component.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.attributes - Component attributes.
 * @param {Function} props.setAttributes - Function to save component attributes .
 * @param {string} props.className - Component classes.
 * @param {number} props.instanceId - Component instance id.
 * @param {boolean} props.instanceId - Whether or not the component is selected.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const TextInputEdit = props => {
	const {
		attributes: {
			id,
			label,
			inputValue,
			outlined,
			fullWidth,
			displayLabel,
			isRequired,
			inputType,
		},
		setAttributes,
		className,
		instanceId,
		isSelected,
	} = props;

	const setter = genericAttributesSetter( setAttributes );
	const inputId = id ?? `mtb-text-field-${ instanceId }`;

	useLayoutEffect( () => {
		const textFields = document.querySelectorAll( '.mdc-text-field' );
		textFields.forEach( textField => new MDCTextField( textField ) );
	}, [ outlined, displayLabel, fullWidth ] );
	return (
		<>
			<InputInspectorControls { ...props } />

			<div
				className={ classnames( 'text-field-container', {
					'text-field-container--not-required': ! isRequired,
				} ) }
			>
				{ isSelected ? (
					<ToggleControl
						label={ __( 'Required', 'material-theme-builder' ) }
						checked={ isRequired }
						onChange={ setter( 'isRequired' ) }
					/>
				) : (
					isRequired && (
						<div className="required">
							{ __( '(required)', 'material-theme-builder' ) }
						</div>
					)
				) }
				{ outlined ? (
					<div
						className={ classnames(
							className,
							'mdc-text-field',
							'mdc-text-field--outlined',
							{ 'mdc-text-field--no-label': ! displayLabel },
							{ 'mdc-text-field--custom-full': fullWidth }
						) }
					>
						<input
							value={ inputValue }
							id={ inputId }
							type={ inputType }
							className="mdc-text-field__input"
							aria-labelledby={
								displayLabel ? `label-${ inputId }` : undefined
							}
							aria-label={ ! displayLabel ? label : undefined }
							onChange={ setter( 'inputValue', e => e.target.value ) }
						/>
						<div className="mdc-notched-outline">
							<div className="mdc-notched-outline__leading"></div>
							{ displayLabel && (
								<div className="mdc-notched-outline__notch">
									<label
										htmlFor={ inputId }
										className="mdc-floating-label"
										id={ `label-${ inputId }` }
									>
										{ label }
									</label>
								</div>
							) }
							<div className="mdc-notched-outline__trailing"></div>
						</div>
					</div>
				) : (
					<div
						className={ classnames(
							className,
							'mdc-text-field',
							{ 'mdc-text-field--no-label': ! displayLabel },
							{ 'mdc-text-field--custom-full': fullWidth }
						) }
					>
						<span className="mdc-text-field__ripple"></span>
						<input
							value={ inputValue }
							id={ inputId }
							type={ inputType }
							className="mdc-text-field__input"
							aria-labelledby={
								displayLabel ? `label-${ inputId }` : undefined
							}
							placeholder={ ! displayLabel ? label : undefined }
							aria-label={ ! displayLabel ? label : undefined }
							onChange={ setter( 'inputValue', e => e.target.value ) }
						/>
						<div className="mdc-line-ripple"></div>
						{ displayLabel && (
							<label
								htmlFor={ inputId }
								className="mdc-floating-label"
								id={ `label-${ inputId }` }
							>
								{ label }
							</label>
						) }
					</div>
				) }
			</div>
		</>
	);
};

export default withInstanceId( TextInputEdit );
