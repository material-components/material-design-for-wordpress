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
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
	Dashicon,
	Button,
	Tooltip,
	Icon,
	Popover,
	PanelBody,
	ToggleControl,
	TextControl,
} from '@wordpress/components';
import { URLInput } from '@wordpress/block-editor';

/**
 * External dependencies
 */
import './editor.css';
import classnames from 'classnames';

const ariaClosed = __( 'Show more tools & options', 'material-design' );
const ariaOpen = __( 'Hide more tools & options', 'material-design' );

const UrlInputPopover = ( {
	value = '',
	newTab = false,
	noFollow = false,
	onChange = null,
	onPopupClose = null,
	onChangeNewTab = null,
	onChangeNoFollow = null,
	onFocusOutside = null,
	disableSuggestions = false,
	focusOnMount = 'firstElement',
} ) => {
	const [ expanded, setExpanded ] = useState( false );

	if ( ! onChange ) {
		return null;
	}

	const mainClassName = classnames( [ 'material-design-url-input-popover' ], {
		'material-design--show-advanced': expanded,
	} );

	return (
		<Popover
			className={ mainClassName }
			focusOnMount={ focusOnMount }
			position="bottom center"
			onFocusOutside={ onFocusOutside }
		>
			<PanelBody>
				<div className="material-design-url-input-popover__input-wrapper">
					<Dashicon
						className="material-design-url-input-control__icon"
						icon="admin-links"
					/>
					{ onChange &&
					! disableSuggestions && ( // Auto-suggestions for inputting url.
							<URLInput
								className="material-design-url-input-control__input"
								value={ value }
								onChange={ onChange }
								autoFocus={ false } // eslint-disable-line
							/>
						) }
					{ onChange &&
					disableSuggestions && ( // Plain text control for inputting url.
							<TextControl
								className="material-design-url-input-control__input material-design-url-input-control__input--plain"
								value={ value }
								onChange={ onChange }
								autoFocus={ false } // eslint-disable-line
								placeholder={ __( 'Paste or type URL', 'material-design' ) }
							/>
						) }
					{ onChangeNewTab && (
						<Tooltip text={ expanded ? ariaOpen : ariaClosed }>
							<Button
								className={ classnames(
									[ 'material-design-url-input-control__more-button' ],
									{
										'material-design--active': newTab || noFollow,
									}
								) }
								onClick={ () => setExpanded( ! expanded ) }
								aria-expanded={ expanded }
								style={ { padding: 6 } }
							>
								<Icon icon="ellipsis" />
							</Button>
						</Tooltip>
					) }
					{ onPopupClose && (
						<Tooltip text={ __( 'Close', 'material-design' ) }>
							<Button
								className={ classnames(
									[ 'material-design-url-input-control__close-button' ],
									{
										'material-design--active': newTab || noFollow,
									}
								) }
								onClick={ onPopupClose }
								style={ { padding: 6 } }
							>
								<Icon icon="no" />
							</Button>
						</Tooltip>
					) }
				</div>
				{ onChangeNewTab && expanded && (
					<ToggleControl
						label={ __( 'Open link in new tab', 'material-design' ) }
						checked={ newTab }
						onChange={ onChangeNewTab }
					/>
				) }
				{ onChangeNoFollow && expanded && (
					<ToggleControl
						label={ __( 'Nofollow link', 'material-design' ) }
						checked={ noFollow }
						onChange={ onChangeNoFollow }
					/>
				) }
			</PanelBody>
		</Popover>
	);
};

export default UrlInputPopover;
