/*
 *  Copyright 2022 Google LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import hasBg from '../../utils/has-bg';

/**
 * Button Children component.
 *
 * @param {Object} props              - Component props.
 * @param {string} props.icon         - Button icon name.
 * @param {string} props.iconPosition - Button icon position.
 * @param {string} props.label        - Button label.
 *
 * @return {JSX.Element} Function returning the HTML markup for the component.
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

const attributesM2 = {
	label: {
		type: 'string',
		source: 'html',
		selector: '.mdc-button__label',
		default: '',
	},
	type: {
		type: 'string',
		default: 'text',
	},
	style: {
		type: 'string',
		default: 'raised',
	},
	iconPosition: {
		type: 'string',
		default: 'leading',
	},
	cornerRadius: {
		type: 'number',
	},
	url: {
		type: 'string',
		source: 'attribute',
		selector: 'a',
		attribute: 'href',
		default: '',
	},
	rel: {
		type: 'string',
		source: 'attribute',
		selector: 'a',
		attribute: 'rel',
		default: '',
	},
	linkTarget: {
		type: 'string',
		source: 'attribute',
		selector: 'a',
		attribute: 'target',
	},
	icon: {
		type: 'string',
		default: '',
		source: 'text',
		selector: '.material-icons',
	},
	backgroundColor: {
		type: 'string',
	},
	textColor: {
		type: 'string',
	},
	tooltip: {
		type: 'string',
		default: '',
		source: 'text',
		selector: '.mdc-tooltip',
	},
	id: {
		type: 'string',
		source: 'attribute',
		attribute: 'id',
		selector: '*',
	},
	isSubmit: {
		type: 'boolean',
		default: false,
	},
	size: {
		type: 'string',
		default: 'normal',
	},
};

const Save = ( {
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
		tooltip,
		id,
		size,
	},
	className,
} ) => {
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
						target={
							linkTarget && ! isSubmit ? linkTarget : undefined
						}
						className={ classNames(
							'material-icons',
							'mdc-icon-button'
						) }
						style={ {
							...( textColor ? { color: textColor } : {} ),
						} }
						{ ...tooltipProps }
					>
						{ icon }
					</a>
				) : (
					<button
						className={ classNames(
							'material-icons',
							'mdc-icon-button'
						) }
						style={ {
							...( textColor ? { color: textColor } : {} ),
						} }
						type={ isSubmit ? 'submit' : undefined }
						{ ...tooltipProps }
					>
						<div className="mdc-button__ripple"></div>
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
						...( backgroundColor && hasBg( style )
							? { backgroundColor }
							: {} ),
						...( textColor ? { color: textColor } : {} ),
						...( cornerRadius !== undefined
							? { borderRadius: `${ cornerRadius }px` }
							: {} ),
					} }
					className={ classNames( 'mdc-button', {
						[ `mdc-button--${ style }` ]: true,
						[ `is-large` ]: size === 'large',
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
						[ `is-large` ]: size === 'large',
					} ) }
					style={ {
						...( backgroundColor && hasBg( style )
							? { backgroundColor }
							: {} ),
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

export const SaveM2 = {
	attributes: attributesM2,
	migrate( attributes ) {
		const { style } = attributes;

		let elevationStyle = style;

		if ( 'raised' === style ) {
			elevationStyle = 'elevated';
		} else if ( 'unelevated' === style ) {
			elevationStyle = 'filled';
		}

		return {
			...attributes,
			...{
				elevationStyle,
			},
		};
	},
	isEligible( attr ) {
		return 'undefined' === typeof attr.elevationStyle;
	},
	save: Save,
};
