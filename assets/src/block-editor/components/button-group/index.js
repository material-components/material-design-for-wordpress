/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import './style.css';

const ButtonGroup = ( { buttons, current, onClick } ) => (
	<ul className="icon-position">
		{ buttons.map( ( button, i ) => (
			<li
				key={ button.value }
				className="icon-position__list-item"
				style={
					buttons.length > 3 && i > 1 ? { borderLeft: 'none' } : undefined
				}
			>
				<button
					type="button"
					onClick={ onClick.bind( this, button.value ) }
					className={ classNames( 'icon-position__list-item__button', {
						'icon-position__list-item__button--active':
							current === button.value,
					} ) }
				>
					{ button.label }
				</button>
			</li>
		) ) }
	</ul>
);

export default ButtonGroup;
