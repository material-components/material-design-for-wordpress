import classNames from 'classnames';

const StyleBox = ( { children, label, active, onClick } ) => (
	<button
		className={ classNames( 'styles-container__style-box', {
			'styles-container__style-box--active': active,
		} ) }
		type="button"
		role="checkbox"
		tabIndex={ 0 }
		onClick={ onClick }
	>
		<div className="styles-container__style-box__icon">{ children }</div>
		<div className="styles-container__style-box__text">{ label }</div>
	</button>
);

export default StyleBox;
