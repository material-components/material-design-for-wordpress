const StyleBox = ( { children, label, active, handleClick } ) => {
	const activeClass = active ? ' styles-container__style-box--active' : '';
	return (
		<button
			className={ `styles-container__style-box${ activeClass }` }
			type="button"
			role="checkbox"
			tabIndex={ 0 }
			onClick={ handleClick }
		>
			<div className="styles-container__style-box__icon">{ children }</div>
			<div className="styles-container__style-box__text">{ label }</div>
		</button>
	);
};

export default StyleBox;
