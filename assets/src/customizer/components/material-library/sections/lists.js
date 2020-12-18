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
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import IconButtonLink from '../common/icon-button-link';

const Lists = ( { iconStyle } ) => (
	<div>
		<h4 className="mdc-typography--headline4" style={ { margin: 0 } }>
			{ __( 'Lists', 'material-design' ) }
		</h4>
		<IconButtonLink href="https://material.io/components/lists"></IconButtonLink>
		<p>
			{ __(
				'Lists are continuous, vertical indexes of text or images.',
				'material-design'
			) }
		</p>
		<div style={ { display: 'flex' } }>
			<ul
				className="wp-block-material-list mdc-list"
				style={ { width: '33%' } }
			>
				<li
					className="wp-block-material-list-item mdc-list-item list-item"
					tabIndex="0"
				>
					<i className={ classNames( iconStyle, 'mdc-list-item__graphic' ) }>
						wifi
					</i>
					<span className="mdc-list-item__text list-item__text">
						{ __( 'List item', 'material-design' ) }
					</span>
				</li>
				<li
					className="wp-block-material-list-item mdc-list-item list-item"
					tabIndex="0"
				>
					<i className={ classNames( 'mdc-list-item__graphic', iconStyle ) }>
						bluetooth
					</i>
					<span className="mdc-list-item__text list-item__text">
						{ __( 'List item', 'material-design' ) }
					</span>
				</li>
				<li
					className="wp-block-material-list-item mdc-list-item list-item"
					tabIndex="0"
				>
					<i className={ classNames( iconStyle, 'mdc-list-item__graphic' ) }>
						http
					</i>
					<span className="mdc-list-item__text list-item__text">
						{ __( 'List item', 'material-design' ) }
					</span>
				</li>
			</ul>

			<ul
				style={ { width: '33%' } }
				className="mdc-list mdc-list--two-line inline-demo-list"
			>
				<li className="mdc-list-item mdc-ripple-upgraded" tabIndex="0">
					<i
						className={ classNames( iconStyle, 'mdc-list-item__graphic' ) }
						aria-hidden="true"
					>
						spa
					</i>

					<span className="mdc-list-item__text">
						<span className="mdc-list-item__primary-text">
							{ __( 'List item', 'material-design' ) }
						</span>
						<span className="mdc-list-item__secondary-text">
							{ __( 'Secondary Text...', 'material-design' ) }
						</span>
					</span>
				</li>
				<li className="mdc-list-item mdc-ripple-upgraded" tabIndex="-1">
					<i
						className={ classNames( 'mdc-list-item__graphic', iconStyle ) }
						aria-hidden="true"
					>
						grade
					</i>

					<span className="mdc-list-item__text">
						<span className="mdc-list-item__primary-text">
							{ __( 'List item', 'material-design' ) }
						</span>
						<span className="mdc-list-item__secondary-text">
							{ __( 'Secondary Text...', 'material-design' ) }
						</span>
					</span>
				</li>
				<li className="mdc-list-item mdc-ripple-upgraded" tabIndex="-1">
					<i
						className={ classNames( iconStyle, 'mdc-list-item__graphic' ) }
						aria-hidden="true"
					>
						search
					</i>

					<span className="mdc-list-item__text">
						<span className="mdc-list-item__primary-text">
							{ __( 'List item', 'material-design' ) }
						</span>
						<span className="mdc-list-item__secondary-text">
							{ __( 'Secondary Text...', 'material-design' ) }
						</span>
					</span>
				</li>
			</ul>

			<ul
				style={ { width: '33%' } }
				className="mdc-list mdc-list--two-line inline-demo-list"
			>
				<li className="mdc-list-item mdc-ripple-upgraded" tabIndex="0">
					<span className="mdc-list-item__text">
						<span className="mdc-list-item__primary-text">
							{ __( 'List item', 'material-design' ) }
						</span>
						<span className="mdc-list-item__secondary-text">
							{ __( 'Secondary Text...', 'material-design' ) }
						</span>
					</span>

					<span aria-hidden="true" className="mdc-list-item__meta">
						<button
							className={ classNames(
								iconStyle,
								'mdc-icon-button',
								'mdc-ripple-upgraded',
								'mdc-ripple-upgraded--unbounded'
							) }
						>
							remove_red_eye
						</button>
					</span>
				</li>
				<li className="mdc-list-item mdc-ripple-upgraded" tabIndex="-1">
					<span className="mdc-list-item__text">
						<span className="mdc-list-item__primary-text">
							{ __( 'List item', 'material-design' ) }
						</span>
						<span className="mdc-list-item__secondary-text">
							{ __( 'Secondary Text...', 'material-design' ) }
						</span>
					</span>

					<span aria-hidden="true" className="mdc-list-item__meta">
						<button
							className={ classNames(
								iconStyle,
								'mdc-icon-button',
								'mdc-ripple-upgraded',
								'mdc-ripple-upgraded--unbounded'
							) }
						>
							email
						</button>
					</span>
				</li>
				<li className="mdc-list-item mdc-ripple-upgraded" tabIndex="-1">
					<span className="mdc-list-item__text">
						<span className="mdc-list-item__primary-text">
							{ __( 'List item', 'material-design' ) }
						</span>
						<span className="mdc-list-item__secondary-text">
							{ __( 'Secondary Text...', 'material-design' ) }
						</span>
					</span>

					<span aria-hidden="true" className="mdc-list-item__meta">
						<button
							className={ classNames(
								iconStyle,
								'mdc-icon-button',
								'mdc-ripple-upgraded',
								'mdc-ripple-upgraded--unbounded'
							) }
						>
							share
						</button>
					</span>
				</li>
			</ul>
		</div>
	</div>
);

export default Lists;
