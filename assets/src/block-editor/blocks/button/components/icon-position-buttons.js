/**
 * External dependencies
 */
import classNames from 'classnames';

const IconPositionButtons = ( { currentPosition, handleClick } ) => {
	return (
		<div>
			<ul className="icon-position">
				<li className="icon-position__list-item">
					<button
						type="button"
						onClick={ handleClick.bind( this, 'none' ) }
						className={ classNames( 'icon-position__list-item__button', {
							'icon-position__list-item__button--active':
								currentPosition === 'none',
						} ) }
					>
						None
					</button>
				</li>
				<li className="icon-position__list-item">
					<button
						type="button"
						onClick={ handleClick.bind( this, 'leading' ) }
						className={ classNames( 'icon-position__list-item__button', {
							'icon-position__list-item__button--active':
								currentPosition === 'leading',
						} ) }
					>
						Leading
					</button>
				</li>
				<li className="icon-position__list-item">
					<button
						type="button"
						onClick={ handleClick.bind( this, 'trailing' ) }
						className={ classNames( 'icon-position__list-item__button', {
							'icon-position__list-item__button--active':
								currentPosition === 'trailing',
						} ) }
					>
						Trailing
					</button>
				</li>
			</ul>
		</div>
	);
};

export default IconPositionButtons;
