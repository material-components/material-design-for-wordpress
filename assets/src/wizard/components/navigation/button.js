import React from 'react';

const Button = props => {
	if ( props.link ) {
		return <Link { ...props } />;
	}

	const { style, text, leadingIcon, trailingIcon, onClick } = props;

	return (
		<button className={ `mdc-button ${ style }` } onClick={ onClick }>
			{ leadingIcon && (
				<i className="material-icons mdc-button__icon" aria-hidden="true">
					{ leadingIcon }
				</i>
			) }
			<span className="mdc-button__label">{ text }</span>
			{ trailingIcon && (
				<i className="material-icons mdc-button__icon" aria-hidden="true">
					{ trailingIcon }
				</i>
			) }
		</button>
	);
};

const Link = props => {
	const { style, text, leadingIcon, trailingIcon, link } = props;

	return (
		<a href={ link } className={ `mdc-button ${ style }` }>
			{ leadingIcon && (
				<i className="material-icons mdc-button__icon" aria-hidden="true">
					{ leadingIcon }
				</i>
			) }
			<span className="mdc-button__label">{ text }</span>
			{ trailingIcon && (
				<i className="material-icons mdc-button__icon" aria-hidden="true">
					{ trailingIcon }
				</i>
			) }
		</a>
	);
};

export default Button;
