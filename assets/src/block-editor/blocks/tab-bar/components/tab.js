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

/* eslint-disable jsx-a11y/no-static-element-interactions */
/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { getIconName } from '../../../utils';

const Tab = ( {
	icon,
	label,
	active,
	onInput,
	onChange,
	onDelete,
	iconPosition,
	index,
	frontend = false,
} ) => {
	icon = getIconName( icon );

	return (
		<div
			role="tab"
			tabIndex={ 0 }
			onClick={ onChange }
			onFocus={ onChange }
			className={ classNames( 'mdc-tab', 'tab', {
				'mdc-tab--active': active,
				'mdc-tab--stacked': icon && iconPosition === 'above',
			} ) }
		>
			<span className="mdc-tab__content">
				{ icon && iconPosition !== 'none' && (
					<i className="material-icons mdc-tab__icon">{ icon }</i>
				) }

				<span className="mdc-tab__text-label tab__label-field">
					{ frontend ? (
						<span role="tab" tabIndex={ 0 }>
							{ label }
						</span>
					) : (
						<RichText
							tagName={ 'span' }
							placeholder={ __( 'Tab Title', 'material-design' ) }
							value={ label }
							onChange={ value => onInput( value, index ) }
							withoutInteractiveFormatting
							allowedFormats={ [] }
						/>
					) }
				</span>
			</span>
			<span
				className={ classNames( 'mdc-tab-indicator', {
					'mdc-tab-indicator--active': active,
				} ) }
			>
				<span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
			</span>
			<span className="mdc-tab__ripple"></span>
			{ ! frontend && (
				<button className="material-icons tab__delete" onClick={ onDelete }>
					cancel
				</button>
			) }
		</div>
	);
};
class TabSchema {
	constructor( { label, icon, content = null } ) {
		this.label = label;
		this.icon = icon;
		this.content = content;
	}
}

export { Tab, TabSchema };
