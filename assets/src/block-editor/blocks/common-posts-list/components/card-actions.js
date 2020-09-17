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
 * Card Actions component.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.displayPostAuthor - Whether or not to display the post author field.
 * @param {boolean} props.displayCommentsCount - Whether or not to display the post comments count field.
 * @param {Object} props.post - Post data.
 *
 * @return {Function} A functional component.
 */
const CardActions = ( { displayPostAuthor, displayCommentsCount, post } ) => (
	<div className="mdc-card__actions">
		<div className="mdc-card__action-buttons">
			{ displayPostAuthor && (
				<button className="mdc-button mdc-card__action mdc-card__action--button mdc-button__post-author">
					<span className="mdc-button__ripple"></span>
					<i className="material-icons mdc-button__icon" aria-hidden="true">
						face
					</i>
					<span className="mdc-button__label">{ post.authorDisplayName }</span>
				</button>
			) }
			{ displayCommentsCount && (
				<>
					<button className="mdc-button mdc-card__action mdc-card__action--button mdc-button__comment-count">
						<span className="mdc-button__ripple"></span>
						<i className="material-icons mdc-button__icon" aria-hidden="true">
							comment
						</i>
						<span className="mdc-button__label">{ post.commentsCount }</span>
					</button>
				</>
			) }
		</div>
	</div>
);

export default CardActions;
