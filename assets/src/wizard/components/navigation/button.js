/**
 * Internal dependencies
 */
import { Loader } from './loader';

/**
 * Action button
 *
 * @param {*} props Inherited props
 */
const Button = props => {
	if ( props.link ) {
		return <Link { ...props } />;
	}

	const {
		style,
		text,
		leadingIcon,
		trailingIcon,
		onClick,
		loading,
		disabled,
	} = props;
	const showLeadingIcon = ! loading && leadingIcon;
	const showTrailingIcon = ! loading && trailingIcon;
	const loadingClass = loading ? ' is-loading' : '';

	return (
		<button
			className={ `mdc-button ${ style }${ loadingClass }` }
			onClick={ onClick }
			disabled={ disabled }
		>
			{ showLeadingIcon && (
				<i
					className="material-icons mdc-button__icon leading-icon"
					aria-hidden="true"
				>
					{ leadingIcon }
				</i>
			) }

			{ ! loading && <span className="mdc-button__label">{ text }</span> }

			{ loading && <Loader /> }

			{ showTrailingIcon && (
				<i
					className="material-icons mdc-button__icon trailing-icon"
					aria-hidden="true"
				>
					{ trailingIcon }
				</i>
			) }
		</button>
	);
};

/**
 * Link "button"
 *
 * @param {*} props Inherited props
 */
export const Link = props => {
	const { style, text, leadingIcon, trailingIcon, link } = props;

	return (
		<a href={ link } className={ `mdc-button ${ style }` }>
			{ leadingIcon && (
				<i
					className="material-icons mdc-button__icon leading-icon"
					aria-hidden="true"
				>
					{ leadingIcon }
				</i>
			) }
			<span className="mdc-button__label">{ text }</span>
			{ trailingIcon && (
				<i
					className="material-icons mdc-button__icon trailing-icon"
					aria-hidden="true"
				>
					{ trailingIcon }
				</i>
			) }
		</a>
	);
};

export default Button;
