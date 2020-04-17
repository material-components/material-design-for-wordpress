/**
 * External dependencies
 */
import classnames from 'classnames';
import { MDCTextField } from '@material/textfield';

/**
 * WordPress dependencies
 */
import { withInstanceId } from '@wordpress/compose';
import { useLayoutEffect, useEffect, useContext } from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import '../editor.css';
import '../style.css';
import genericAttributesSetter from '../../../../../utils/generic-attributes-setter';
import InputInspectorControls from './inspector-controls';
import TextareaInputElement from './textarea-input-element';
import ContactFormContext from '../../../contact-form-context';

/**
 * Text Input Field Block Save component.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.attributes - Component attributes.
 * @param {Function} props.setAttributes - Function to save component attributes.
 * @param {string} props.className - Component classes.
 * @param {number} props.instanceId - Component instance id.
 * @param {boolean} props.isSelected - Whether or not the component is selected.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const TextAreaInputEdit = props => {
	const {
		attributes: {
			id,
			label,
			inputValue,
			outlined,
			fullWidth,
			displayLabel,
			isRequired,
			inputRole,
		},
		setAttributes,
		className,
		instanceId,
		isSelected,
	} = props;

	const setter = genericAttributesSetter( setAttributes );

	if ( ! id || id.length === 0 ) {
		setAttributes( { id: `mtb-${ inputRole }-${ instanceId }` } );
	}

	const textareaInputProps = {
		inputValue,
		id,
		inputRole,
		displayLabel,
		label,
		onChange: setter( 'inputValue', e => e.target.value ),
		isRequired,
	};

	const { parentOutlined, parentFullWidth } = useContext( ContactFormContext );

	useEffect( () => {
		setAttributes( {
			outlined: parentOutlined,
			fullWidth: parentFullWidth,
		} );
	}, [ parentOutlined, parentFullWidth, setAttributes ] );

	useLayoutEffect( () => {
		const textFields = document.querySelectorAll( '.mdc-text-field' );
		textFields.forEach( textField => new MDCTextField( textField ) );
	}, [ outlined, displayLabel, fullWidth ] );

	return (
		<>
			<InputInspectorControls { ...props } />

			<div className="mdc-text-field-container">
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
							'mdc-text-field--textarea',
							{ 'mdc-text-field--no-label': ! displayLabel },
							{ 'mdc-text-field--custom-full': fullWidth }
						) }
					>
						<span className="mdc-text-field__ripple"></span>
						<TextareaInputElement { ...textareaInputProps } />

						<div className="mdc-notched-outline">
							<div className="mdc-notched-outline__leading"></div>
							{ displayLabel && (
								<div className="mdc-notched-outline__notch">
									<label
										htmlFor={ id }
										className="mdc-floating-label"
										id={ `label-${ id }` }
									>
										{ label }
									</label>
								</div>
							) }
							<span className="mdc-notched-outline__trailing"></span>
						</div>
					</div>
				) : (
					<div
						className={ classnames(
							className,
							'mdc-text-field',
							'mdc-text-field--textarea',
							{ 'mdc-text-field--no-label': ! displayLabel },
							{ 'mdc-text-field--custom-full': fullWidth }
						) }
					>
						<span className="mdc-text-field__ripple"></span>
						<TextareaInputElement { ...textareaInputProps } />
						<div className="mdc-line-ripple"></div>
						{ displayLabel && (
							<label
								htmlFor={ id }
								className="mdc-floating-label"
								id={ `label-${ id }` }
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

export default withInstanceId( TextAreaInputEdit );
