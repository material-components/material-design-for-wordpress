/**
 * External dependencies
 */
import classnames from 'classnames';
import { MDCTextField } from '@material/textfield';
import { __ } from '@wordpress/i18n';

/**
 * WordPress dependencies
 */
import { withInstanceId } from '@wordpress/compose';
import { useLayoutEffect, useEffect, useContext } from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import '../editor.css';
import genericAttributesSetter from '../../../../../utils/generic-attributes-setter';
import InputInspectorControls from './inspector-controls';
import TextInputElement from './text-input-element';
import ContactFormContext from '../../../contact-form-context';

/**
 * Text Input Field Block Edit component.
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
			inputRole,
		},
		setAttributes,
		className,
		instanceId,
		isSelected,
	} = props;

	const { parentOutlined, parentFullWidth } = useContext( ContactFormContext );

	const setter = genericAttributesSetter( setAttributes );

	if ( ! id || id.length === 0 ) {
		setAttributes( { id: `mtb-${ inputRole }-${ instanceId }` } );
	}

	useEffect(
		() => {
			setAttributes( {
				outlined: parentOutlined,
				fullWidth: parentFullWidth,
			} );
		}, // eslint-disable-next-line react-hooks/exhaustive-deps
		[ parentOutlined, parentFullWidth ]
	);

	useLayoutEffect( () => {
		const textFields = document.querySelectorAll( '.mdc-text-field' );
		textFields.forEach( textField => new MDCTextField( textField ) );
	}, [ outlined, displayLabel, fullWidth, isRequired ] );

	const textInputProps = {
		inputValue,
		id,
		inputRole,
		inputType,
		displayLabel,
		label,
		onChange: setter( 'inputValue', e => e.target.value ),
		isRequired,
	};

	return (
		<>
			<InputInspectorControls { ...props } />

			<div
				className={ classnames( 'mdc-text-field-container', {
					'mdc-text-field-container--not-required': ! isRequired,
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
						<TextInputElement { ...textInputProps } />
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
						<TextInputElement { ...textInputProps } />
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

export default withInstanceId( TextInputEdit );
