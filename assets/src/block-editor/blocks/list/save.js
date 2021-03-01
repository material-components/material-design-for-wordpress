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
 * External dependencies
 */
import classNames from 'classnames';

/**
 * Material list save component.
 */
const ListSave = ( {
	attributes: { style, iconPosition, iconSize, items },
	className,
} ) => {
	const isSecondaryEnabled = style === 'two-line';

	return (
		<div className={ className }>
			<ul
				className={ classNames(
					'mdc-list',
					className ? className.replace( 'mdc-list--two-line', '' ) : '',
					{
						'mdc-list--two-line': isSecondaryEnabled,
						'mdc-list--avatar-list': 'large' === iconSize,
					}
				) }
			>
				{ items.map(
					( { primaryText, secondaryText, icon, url, target }, i ) => (
						<li key={ i } className="mdc-list-item">
							{ url && (
								<a
									href={ url || '#' }
									target={ target }
									className="list-item__link"
									rel={ target ? 'noopener noreferrer' : undefined }
								>
									&nbsp;
								</a>
							) }

							{ 'leading' === iconPosition && (
								<span className="mdc-list-item__graphic material-icons">
									{ icon }
								</span>
							) }

							<span className="mdc-list-item__text">
								<span className="mdc-list-item__primary-text">
									{ primaryText }
								</span>

								{ isSecondaryEnabled && (
									<span className="mdc-list-item__secondary-text">
										{ secondaryText }
									</span>
								) }
							</span>

							{ 'trailing' === iconPosition && (
								<span className="mdc-list-item__meta material-icons">
									{ icon }
								</span>
							) }
						</li>
					)
				) }
			</ul>
		</div>
	);
};

export default ListSave;
