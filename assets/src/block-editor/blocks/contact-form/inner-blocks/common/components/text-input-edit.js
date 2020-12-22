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
 * External dependencies
 */
import classnames from 'classnames';
import { MDCTextField } from '@material/textfield';
import { __ } from '@wordpress/i18n';

/**
 * WordPress dependencies
 */
import { withInstanceId, compose } from '@wordpress/compose';
import { useLayoutEffect, useEffect, useContext } from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';
import { withSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import '../editor.css';
import genericAttributesSetter from '../../../../../utils/generic-attributes-setter';
import InputInspectorControls from './inspector-controls';
import TextInputElement from './text-input-element';
import ContactFormContext from '../../../contact-form-context';
import FormInspectorControls from '../../../components/inspector-controls';

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
		parentBlock,
	} = props;

	const { parentOutlined, parentFullWidth, parentSetter } = useContext(
		ContactFormContext
	);

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
	}, [ outlined, displayLabel, fullWidth ] );

	useEffect( () => {
		if ( ! id || id.length === 0 ) {
			setAttributes( { id: `material-design-${ inputRole }-${ instanceId }` } );
		} // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ id ] );

	const setter = genericAttributesSetter( setAttributes );
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
			<FormInspectorControls { ...parentBlock } setter={ parentSetter } />
			<InputInspectorControls { ...props } />

			<div
				className={ classnames( 'mdc-text-field-container', {
					'mdc-text-field-container--not-required': ! isRequired,
				} ) }
			>
				{ isSelected ? (
					<ToggleControl
						label={ __( 'Required', 'material-design' ) }
						checked={ isRequired }
						onChange={ setter( 'isRequired' ) }
					/>
				) : (
					isRequired && (
						<div className="required">
							{ __( '(required)', 'material-design' ) }
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

export default compose( [
	withInstanceId,
	withSelect( ( select, ownProps ) => {
		const parentId = select( 'core/block-editor' ).getBlockRootClientId(
			ownProps.clientId
		);

		return {
			parentBlock: parentId
				? select( 'core/block-editor' ).getBlock( parentId )
				: {},
		};
	} ),
] )( TextInputEdit );
