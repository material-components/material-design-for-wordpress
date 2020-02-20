/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

const IconPositionButtons = ( { currentPosition, onClick } ) => {
	return (
		<div>
			<ul className="icon-position">
				<li className="icon-position__list-item">
					<button
						type="button"
						onClick={ onClick.bind( this, 'none' ) }
						className={ classNames( 'icon-position__list-item__button', {
							'icon-position__list-item__button--active':
								currentPosition === 'none',
						} ) }
					>
						{ __( 'None', 'material-theme-builder' ) }
					</button>
				</li>
				<li className="icon-position__list-item">
					<button
						type="button"
						onClick={ onClick.bind( this, 'leading' ) }
						className={ classNames( 'icon-position__list-item__button', {
							'icon-position__list-item__button--active':
								currentPosition === 'leading',
						} ) }
					>
						{ __( 'Leading', 'material-theme-builder' ) }
					</button>
				</li>
				<li className="icon-position__list-item">
					<button
						type="button"
						onClick={ onClick.bind( this, 'trailing' ) }
						className={ classNames( 'icon-position__list-item__button', {
							'icon-position__list-item__button--active':
								currentPosition === 'trailing',
						} ) }
					>
						{ __( 'Trailing', 'material-theme-builder' ) }
					</button>
				</li>
			</ul>
		</div>
	);
};

export default IconPositionButtons;
