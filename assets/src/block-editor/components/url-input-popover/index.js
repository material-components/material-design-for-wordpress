/**
 * WordPress dependencies
 */
import { withState } from '@wordpress/compose';
import {
	Dashicon,
	IconButton,
	Popover,
	PanelBody,
	ToggleControl,
	TextControl,
} from '@wordpress/components';
import { URLInput } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import classnames from 'classnames';
import './editor.css';

const ariaClosed = __( 'Show more tools & options', 'material-theme-builder' );
const ariaOpen = __( 'Hide more tools & options', 'material-theme-builder' );

const UrlInputPopover = withState( {
	openAdvanced: false,
} )( props => {
	const { openAdvanced, setState } = props;

	if (
		! props.onChange &&
		! props.onChangeNewTab &&
		! props.onChangeNoFollow
	) {
		return null;
	}

	const mainClassName = classnames( [ 'mtb-url-input-popover' ], {
		'mtb--show-advanced': openAdvanced,
	} );

	const moreButtonClasses = classnames(
		[ 'mtb-url-input-control__more-button' ],
		{
			'mtb--active': props.newTab || props.noFollow,
		}
	);

	return (
		<Popover
			className={ mainClassName }
			focusOnMount={ false }
			position="bottom center"
		>
			<PanelBody>
				<div className="mtb-url-input-popover__input-wrapper">
					<Dashicon
						className="mtb-url-input-control__icon"
						icon="admin-links"
					/>
					{ props.onChange &&
					! props.disableSuggestions && ( // Auto-suggestions for inputting url.
							<URLInput
								className="mtb-url-input-control__input"
								value={ props.value }
								onChange={ props.onChange }
								autoFocus={ false } // eslint-disable-line
							/>
						) }
					{ props.onChange &&
					props.disableSuggestions && ( // Plain text control for inputting url.
							<TextControl
								className="mtb-url-input-control__input mtb-url-input-control__input--plain"
								value={ props.value }
								onChange={ props.onChange }
								autoFocus={ false } // eslint-disable-line
								placeholder={ __(
									'Paste or type URL',
									'material-theme-builder'
								) }
							/>
						) }
					{ ( props.onChangeNewTab || props.onChangeNoFollow ) && (
						<IconButton
							className={ moreButtonClasses }
							icon="ellipsis"
							label={ openAdvanced ? ariaOpen : ariaClosed }
							onClick={ () => setState( { openAdvanced: ! openAdvanced } ) }
							aria-expanded={ openAdvanced }
						/>
					) }
					<IconButton
						className={ moreButtonClasses }
						icon="no"
						label={ __( 'Close', 'material-theme-builder' ) }
						onClick={ props.onPopupClose }
					/>
				</div>
				{ props.onChangeNewTab && openAdvanced && (
					<ToggleControl
						label={ __( 'Open link in new tab', 'material-theme-builder' ) }
						checked={ props.newTab }
						onChange={ props.onChangeNewTab }
					/>
				) }
				{ props.onChangeNoFollow && openAdvanced && (
					<ToggleControl
						label={ __( 'Nofollow link', 'material-theme-builder' ) }
						checked={ props.noFollow }
						onChange={ props.onChangeNoFollow }
					/>
				) }
			</PanelBody>
		</Popover>
	);
} );

UrlInputPopover.defaultProps = {
	value: '',
	disableSuggestions: false,
	onChange: null,

	newTab: false,
	noFollow: false,
	onChangeNewTab: null,
	onChangeNoFollow: null,
};

export default UrlInputPopover;
