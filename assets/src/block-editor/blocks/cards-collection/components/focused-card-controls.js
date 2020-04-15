/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { IconButton } from '@wordpress/components';

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
		<IconButton
			className="mtb-card-buttons mtb-card-move-button mtb-card-move-button-left-up"
			icon="arrow-left"
			label={
				style !== 'list'
					? __( 'Move left', 'material-theme-builder' )
					: __( 'Move up', 'material-theme-builder' )
			}
			onClick={ onMoveLeftOrUp }
			disabled={ cardIndex === 0 }
		/>
		<IconButton
			className="mtb-card-buttons mtb-card-move-button mtb-card-move-button-right-down"
			icon="arrow-right"
			label={
				style !== 'list'
					? __( 'Move right', 'material-theme-builder' )
					: __( 'Move down', 'material-theme-builder' )
			}
			onClick={ onMoveRightOrDown }
			disabled={ numberOfCards === cardIndex + 1 }
		/>
		<span className="card-number-title">
			{ sprintf( __( 'Card #%d', 'material-theme-builder' ), cardIndex + 1 ) }{ ' ' }
		</span>
		<IconButton
			className="mtb-card-buttons mtb-card-close-button"
			icon="no"
			label={ __( 'Remove card', 'material-theme-builder' ) }
			onClick={ onRemove }
		/>
	</div>
);

export default FocusedCardControls;
