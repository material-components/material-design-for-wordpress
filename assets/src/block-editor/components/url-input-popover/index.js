/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { withState } from '@wordpress/compose';
import {
	Dashicon,
	Popover,
	IconButton,
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

const UrlInputPopover = withState( {
	openAdvanced: false,
} )(
	( {
		value,
		newTab,
		onChange,
		setState,
		onPopupClose,
		openAdvanced,
		onChangeNewTab,
		onFocusOutside,
		disableSuggestions,
	} ) => {
		if ( ! onChange && ! onChangeNewTab ) {
			return null;
		}

		const mainClassName = classnames( [ 'mtb-url-input-popover' ], {
			'mtb--show-advanced': openAdvanced,
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
							<IconButton
								className={ classnames(
									[ 'mtb-url-input-control__more-button' ],
									{ 'mtb--active': newTab }
								) }
								onClick={ () => setState( { openAdvanced: ! openAdvanced } ) }
								label={ openAdvanced ? ariaOpen : ariaClosed }
								aria-expanded={ openAdvanced }
								icon="ellipsis"
							/>
						) }
						{ onPopupClose && (
							<IconButton
								className={ classnames(
									[ 'mtb-url-input-control__close-button' ],
									{ 'mtb--active': newTab }
								) }
								label={ __( 'Close', 'material-theme-builder' ) }
								onClick={ onPopupClose }
								icon="no"
							/>
						) }
					</div>
					{ onChangeNewTab && openAdvanced && (
						<ToggleControl
							label={ __( 'Open link in new tab', 'material-theme-builder' ) }
							checked={ newTab }
							onChange={ onChangeNewTab }
						/>
					) }
				</PanelBody>
			</Popover>
		);
	}
);

UrlInputPopover.defaultProps = {
	value: '',
	newTab: false,
	onChange: null,
	onPopupClose: null,
	onChangeNewTab: null,
	disableSuggestions: false,
};

export default UrlInputPopover;
