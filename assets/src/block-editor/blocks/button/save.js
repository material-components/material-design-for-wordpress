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
			<i className="material-icons mdc-button__icon">
				{ String.fromCharCode( icon?.hex ) }
			</i>
		) }
		<div className="mdc-button__ripple"></div>
		<span className="mdc-button__label">{ label }</span>
		{ icon && iconPosition === 'trailing' && (
			<i className="material-icons mdc-button__icon">
				{ String.fromCharCode( icon?.hex ) }
			</i>
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
		tooltip,
		id,
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
						target={ linkTarget && ! isSubmit ? linkTarget : undefined }
						className={ classNames( 'material-icons', 'mdc-icon-button' ) }
						style={ { ...( textColor ? { color: textColor } : {} ) } }
						{ ...tooltipProps }
					>
						{ String.fromCharCode( icon?.hex ) }
					</a>
				) : (
					<button
						className={ classNames( 'material-icons', 'mdc-icon-button' ) }
						style={ { ...( textColor ? { color: textColor } : {} ) } }
						type={ isSubmit ? 'submit' : undefined }
						{ ...tooltipProps }
					>
						<div className="mdc-button__ripple"></div>
						{ String.fromCharCode( icon?.hex ) }
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
