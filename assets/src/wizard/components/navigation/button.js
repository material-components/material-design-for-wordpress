import React from 'react';

const Button = props => {
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

export default Button;
