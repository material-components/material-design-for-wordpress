/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';

/**
 * Focused Card Controls component.
 *
 * @param {Object} props - Component props.
 * @param {number} props.cardIndex - Card index.
 * @param {string} props.style - Grid style.
 * @param {number} props.numberOfCards - Total number of cards.
 * @param {Function} props.onMoveLeftOrUp - Move card left or up  handler.
 * @param {Function} props.onMoveRightOrDown - Move card right or down handler.
 * @param {Function} props.onRemove - Remove card  handler.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const FocusedCardControls = ( {
	cardIndex,
	style,
	numberOfCards,
	onMoveLeftOrUp,
	onMoveRightOrDown,
	onRemove,
} ) => (
	<div className="card-container-controls">
		<div className="move-card">
			<button
				className="mtb-card-move-button-left-up"
				title={
					style !== 'list'
						? __( 'Move left', 'material-theme-builder' )
						: __( 'Move up', 'material-theme-builder' )
				}
				onClick={ onMoveLeftOrUp }
				disabled={ cardIndex === 0 }
			>
				<i className="material-icons">arrow_left</i>
			</button>
			<button
				className="mtb-card-move-button-right-down"
				title={
					style !== 'list'
						? __( 'Move right', 'material-theme-builder' )
						: __( 'Move down', 'material-theme-builder' )
				}
				onClick={ onMoveRightOrDown }
				disabled={ numberOfCards === cardIndex + 1 }
			>
				<i className="material-icons">arrow_right</i>
			</button>
		</div>

		<span className="card-number-title">
			{ sprintf( __( 'Card #%d', 'material-theme-builder' ), cardIndex + 1 ) }{ ' ' }
		</span>

		<div className="remove-card">
			<button
				className="mtb-card-close-button"
				title={ __( 'Remove card', 'material-theme-builder' ) }
				onClick={ onRemove }
			>
				<i className="material-icons">close</i>
			</button>
		</div>
	</div>
);

export default FocusedCardControls;
