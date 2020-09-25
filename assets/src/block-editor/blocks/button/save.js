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
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import hasBg from './utils/has-bg';

/**
 * Button Children component.
 *
 * @param {Object} props - Component props.
 * @param {string} props.icon - Button icon name.
 * @param {string} props.iconPosition - Button icon position.
 * @param {string} props.label - Button label.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const ButtonChildren = ( { icon, iconPosition, label } ) => (
	<>
		{ icon && iconPosition === 'leading' && (
			<i className="material-icons mdc-button__icon">{ icon }</i>
		) }
		<div className="mdc-button__ripple"></div>
		<span className="mdc-button__label">{ label }</span>
		{ icon && iconPosition === 'trailing' && (
			<i className="material-icons mdc-button__icon">{ icon }</i>
		) }
	</>
);

const ButtonSave = ( {
	attributes: {
		rel,
		url,
		icon,
		type,
		label,
		style,
		textColor,
		linkTarget,
		cornerRadius,
		iconPosition,
		backgroundColor,
		isSubmit,
	},
	className,
} ) => {
	if ( 'icon' === type ) {
		return (
			<div className={ className }>
				{ url && ! isSubmit ? (
					<a
						href={ url }
						rel={ rel && ! isSubmit ? rel : undefined }
						target={ linkTarget && ! isSubmit ? linkTarget : undefined }
						className={ classNames( 'material-icons', 'mdc-icon-button' ) }
						style={ { ...( textColor ? { color: textColor } : {} ) } }
					>
						{ icon }
					</a>
				) : (
					<button
						className={ classNames( 'material-icons', 'mdc-icon-button' ) }
						style={ { ...( textColor ? { color: textColor } : {} ) } }
						type={ isSubmit ? 'submit' : undefined }
					>
						<div className="mdc-button__ripple"></div>
						{ icon }
					</button>
				) }
			</div>
		);
	}

	return (
		<div className={ className }>
			{ url && ! isSubmit ? (
				<a
					href={ url }
					rel={ rel && ! isSubmit ? rel : undefined }
					target={ linkTarget && ! isSubmit ? linkTarget : undefined }
					style={ {
						...( backgroundColor && hasBg( style ) ? { backgroundColor } : {} ),
						...( textColor ? { color: textColor } : {} ),
						...( cornerRadius !== undefined
							? { borderRadius: `${ cornerRadius }px` }
							: {} ),
					} }
					className={ classNames( 'mdc-button', {
						[ `mdc-button--${ style }` ]: true,
					} ) }
				>
					<ButtonChildren
						icon={ icon }
						iconPosition={ iconPosition }
						label={ label }
					/>
				</a>
			) : (
				<button
					className={ classNames( 'mdc-button', {
						[ `mdc-button--${ style }` ]: true,
					} ) }
					style={ {
						...( backgroundColor && hasBg( style ) ? { backgroundColor } : {} ),
						...( textColor ? { color: textColor } : {} ),
						...( cornerRadius !== undefined
							? { borderRadius: `${ cornerRadius }px` }
							: {} ),
					} }
					type={ isSubmit ? 'submit' : undefined }
				>
					<ButtonChildren
						icon={ icon }
						iconPosition={ iconPosition }
						label={ label }
					/>
				</button>
			) }
		</div>
	);
};

export default ButtonSave;
