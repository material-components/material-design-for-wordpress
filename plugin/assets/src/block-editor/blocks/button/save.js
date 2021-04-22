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
import getButtonClass, { isLarge } from './utils/get-button-class';

/**
 * Button Children component.
 *
 * @param {Object} props - Component props.
 * @param {string} props.icon - Button icon name.
 * @param {string} props.iconPosition - Button icon position.
 * @param {string} props.label - Button label.
 * @param {string} props.size - Button size.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const ButtonChildren = ( { icon, iconPosition, label, size } ) => {
	const buttonPrefix = getButtonClass( size );
	return (
		<>
			{ icon && iconPosition === 'leading' && (
				<i className={ `material-icons ${ buttonPrefix }__icon` }>{ icon }</i>
			) }
			<div className={ `${ buttonPrefix }__ripple` }></div>
			<span className={ `${ buttonPrefix }__label` }>{ label }</span>
			{ icon && iconPosition === 'trailing' && (
				<i className={ `material-icons ${ buttonPrefix }__icon` }>{ icon }</i>
			) }
		</>
	);
};

const ButtonSave = ( {
	attributes: {
		rel,
		url,
		icon,
		type,
		label,
		style,
		size,
		textColor,
		linkTarget,
		cornerRadius,
		iconPosition,
		backgroundColor,
		isSubmit,
		tooltip,
		id,
	},
	className,
} ) => {
	const prefixClass = getButtonClass( size );
	if ( 'icon' === type ) {
		const tooltipId = tooltip ? `${ id }-tooltip` : false;
		const tooltipProps = tooltipId
			? {
					'aria-describedby': tooltipId,
			  }
			: {};

		return (
			<div className={ className } id={ id }>
				{ url && ! isSubmit ? (
					<a
						href={ url }
						rel={ rel && ! isSubmit ? rel : undefined }
						target={ linkTarget && ! isSubmit ? linkTarget : undefined }
						className={ classNames( 'material-icons', 'mdc-icon-button' ) }
						style={ { ...( textColor ? { color: textColor } : {} ) } }
						{ ...tooltipProps }
					>
						{ icon }
					</a>
				) : (
					<button
						className={ classNames( 'material-icons', 'mdc-icon-button' ) }
						style={ { ...( textColor ? { color: textColor } : {} ) } }
						type={ isSubmit ? 'submit' : undefined }
						{ ...tooltipProps }
					>
						<div className={ `${ prefixClass }__ripple` }></div>
						{ icon }
					</button>
				) }

				{ tooltipId && (
					<div
						id={ tooltipId }
						className="mdc-tooltip"
						role="tooltip"
						aria-hidden="true"
					>
						<div className="mdc-tooltip__surface">{ tooltip }</div>
					</div>
				) }
			</div>
		);
	}

	return (
		<div className={ className } id={ id }>
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
					className={ classNames( prefixClass, {
						[ `${ prefixClass }--${ style }` ]: true,
						[ `mdc-fab--extended` ]: size === 'large',
					} ) }
				>
					<ButtonChildren
						icon={ icon }
						iconPosition={ iconPosition }
						label={ label }
						size={ size }
					/>
				</a>
			) : (
				<button
					className={ classNames( prefixClass, {
						[ `${ prefixClass }--${ style }` ]: true,
						[ `mdc-fab--extended` ]: isLarge( size ),
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
						size={ size }
					/>
				</button>
			) }
		</div>
	);
};

export default ButtonSave;
