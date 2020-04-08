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
 * @param {Function} props.onMoveLeft - Move card left handler.
 * @param {Function} props.onMoveRight - Move card right handler.
 * @param {Function} props.onRemove - Remove card  handler.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const FocusedCardControls = ( {
	cardIndex,
	style,
	numberOfCards,
	onMoveLeft,
	onMoveRight,
	onRemove,
} ) => (
	<div className="card-container-controls">
		<IconButton
			className="mtb-card-buttons mtb-card-move-button"
			icon="arrow-left"
			label={
				style !== 'list'
					? __( 'Move left', 'material-theme-builder' )
					: __( 'Move up', 'material-theme-builder' )
			}
			onClick={ onMoveLeft }
			disabled={ cardIndex === 0 }
		/>
		<IconButton
			className="mtb-card-buttons mtb-card-move-button"
			icon="arrow-right"
			label={
				style !== 'list'
					? __( 'Move right', 'material-theme-builder' )
					: __( 'Move down', 'material-theme-builder' )
			}
			onClick={ onMoveRight }
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
