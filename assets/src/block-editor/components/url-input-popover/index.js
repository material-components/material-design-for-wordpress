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

const ariaClosed = __( 'Show more tools & options', 'material-theme-builder' );
const ariaOpen = __( 'Hide more tools & options', 'material-theme-builder' );

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
} ) => {
	const [ expanded, setExpanded ] = useState( false );

	if ( ! onChange ) {
		return null;
	}

	const mainClassName = classnames( [ 'mtb-url-input-popover' ], {
		'mtb--show-advanced': expanded,
	} );

	return (
		<Popover
			className={ mainClassName }
			focusOnMount="firstElement"
			position="bottom center"
			onFocusOutside={ onFocusOutside }
		>
			<PanelBody>
				<div className="mtb-url-input-popover__input-wrapper">
					<Dashicon
						className="mtb-url-input-control__icon"
						icon="admin-links"
					/>
					{ onChange &&
					! disableSuggestions && ( // Auto-suggestions for inputting url.
							<URLInput
								className="mtb-url-input-control__input"
								value={ value }
								onChange={ onChange }
							autoFocus={ false } // eslint-disable-line
							/>
						) }
					{ onChange &&
					disableSuggestions && ( // Plain text control for inputting url.
							<TextControl
								className="mtb-url-input-control__input mtb-url-input-control__input--plain"
								value={ value }
								onChange={ onChange }
							autoFocus={ false } // eslint-disable-line
								placeholder={ __(
									'Paste or type URL',
									'material-theme-builder'
								) }
							/>
						) }
					{ onChangeNewTab && (
						<Tooltip text={ expanded ? ariaOpen : ariaClosed }>
							<Button
								className={ classnames(
									[ 'mtb-url-input-control__more-button' ],
									{
										'mtb--active': newTab || noFollow,
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
						<Tooltip text={ __( 'Close', 'material-theme-builder' ) }>
							<Button
								className={ classnames(
									[ 'mtb-url-input-control__close-button' ],
									{
										'mtb--active': newTab || noFollow,
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
						label={ __( 'Open link in new tab', 'material-theme-builder' ) }
						checked={ newTab }
						onChange={ onChangeNewTab }
					/>
				) }
				{ onChangeNoFollow && expanded && (
					<ToggleControl
						label={ __( 'Nofollow link', 'material-theme-builder' ) }
						checked={ noFollow }
						onChange={ onChangeNoFollow }
					/>
				) }
			</PanelBody>
		</Popover>
	);
};

export default UrlInputPopover;
