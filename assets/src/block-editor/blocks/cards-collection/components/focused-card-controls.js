/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
				className="material-design-card-move-button-left-up"
				title={
					style !== 'list'
						? __( 'Move left', 'material-design' )
						: __( 'Move up', 'material-design' )
				}
				onClick={ onMoveLeftOrUp }
				disabled={ cardIndex === 0 }
			>
				<i className="material-icons">arrow_left</i>
			</button>
			<button
				className="material-design-card-move-button-right-down"
				title={
					style !== 'list'
						? __( 'Move right', 'material-design' )
						: __( 'Move down', 'material-design' )
				}
				onClick={ onMoveRightOrDown }
				disabled={ numberOfCards === cardIndex + 1 }
			>
				<i className="material-icons">arrow_right</i>
			</button>
		</div>

		<span className="card-number-title">
			{ sprintf( __( 'Card #%d', 'material-design' ), cardIndex + 1 ) }
		</span>

		<div className="remove-card">
			<button
				className="material-design-card-close-button"
				title={ __( 'Remove card', 'material-design' ) }
				onClick={ onRemove }
			>
				<i className="material-icons">close</i>
			</button>
		</div>
	</div>
);

export default FocusedCardControls;
