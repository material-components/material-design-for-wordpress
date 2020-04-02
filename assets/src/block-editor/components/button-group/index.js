/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import './style.css';

const ButtonGroup = ( { buttons, current, onClick } ) => (
	<div className="btn-group">
		<ul className="btn-group__list">
			{ buttons.map( ( button, i ) => (
				<li
					key={ button.value }
					className="btn-group__list__list-item"
					style={
						buttons.length > 3 && i > 1 ? { borderLeft: 'none' } : undefined
					}
				>
					<button
						type="button"
						onClick={ onClick.bind( this, button.value ) }
						className={ classNames( 'btn-group__list__list-item__button', {
							'btn-group__list__list-item__button--active':
								current === button.value,
						} ) }
					>
						{ button.label }
					</button>
				</li>
			) ) }
		</ul>
	</div>
);

export default ButtonGroup;
