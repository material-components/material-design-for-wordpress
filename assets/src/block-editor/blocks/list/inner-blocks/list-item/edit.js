/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { ListContext } from '../../edit';
import findIcon from '../../../../utils/find-icon';
import ListItemText from '../../components/list-item-text';
import IconPicker from '../../../../components/icon-picker';
import genericAttributesSetter from '../../../../utils/generic-attributes-setter';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { dispatch, select } from '@wordpress/data';
import { InspectorControls } from '@wordpress/block-editor';
import { useCallback, useContext, useEffect } from '@wordpress/element';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

const ListItemEdit = ( {
	attributes: {
		rel,
		url,
		linkTarget,
		leadingIcon,
		primaryText,
		trailingIcon,
		secondaryText,
	},
	setAttributes,
	className,
	clientId,
} ) => {
	const setter = useCallback( genericAttributesSetter( setAttributes ) );

	const {
		style,
		parentClientId,
		leadingIconsEnabled,
		trailingIconsEnabled,
	} = useContext( ListContext );

	/**
	 * Handle ENTER key within our primaryText conntentEditable.
	 *
	 * @param {Event} e The onKeyPress event object.
	 */
	/* istanbul ignore next */
	const handleEnterPress = e => {
		if ( e.key !== 'Enter' ) {
			return true;
		}

		// Create list item block under the current selection
		const block = createBlock( 'material/list-item' );
		const parent = select( 'core/editor' ).getBlocksByClientId(
			parentClientId
		)[ 0 ];

		dispatch( 'core/editor' ).insertBlocks(
			block,
			parent.innerBlocks.findIndex( blk => blk.clientId === clientId ) + 1,
			parent.clientId
		);

		e.currentTarget.blur();
		return false;
	};

	/**
	 * Handles setting linkTarget and rel based on the new tab toggle
	 *
	 * @param {string} value The value of the toggle.
	 */
	const onToggleOpenInNewTab = value => {
		const newLinkTarget = value ? '_blank' : '';

		let updatedRel = rel;
		if ( newLinkTarget && ! rel ) {
			updatedRel = 'noreferrer noopener';
		} else if (
			/* istanbul ignore next */ ! newLinkTarget &&
			rel === 'noreferrer noopener'
		) {
			updatedRel = '';
		}

		setAttributes( {
			linkTarget: newLinkTarget,
			rel: updatedRel,
		} );
	};

	// Sync with parent icon settings
	useEffect( () => {
		if ( ! leadingIconsEnabled && leadingIcon ) {
			setAttributes( { leadingIcon: undefined } );
		} else if ( leadingIconsEnabled && ! leadingIcon ) {
			setAttributes( { leadingIcon: findIcon( 'account circle' ) } );
		}

		if ( ! trailingIconsEnabled && trailingIcon ) {
			setAttributes( { trailingIcon: undefined } );
		} else if ( trailingIconsEnabled && ! trailingIcon ) {
			setAttributes( { trailingIcon: findIcon( 'more vert' ) } );
		}
	}, [
		leadingIconsEnabled,
		leadingIcon,
		trailingIconsEnabled,
		trailingIcon,
		setAttributes,
	] );

	// Sync with parent regarding style and secondaryText
	useEffect( () => {
		if ( style !== 'two-line' && secondaryText ) {
			setAttributes( { secondaryText: undefined } );
		} else if ( style === 'two-line' && ! secondaryText ) {
			setAttributes( {
				secondaryText: __( 'Secondary text...', 'material-theme-builder' ),
			} );
		}
	}, [ style, secondaryText, setAttributes ] );

	return (
		<>
			<div
				className={ classNames( 'mdc-list-item', 'list-item', className, {
					'list-item--with-secondary': style === 'two-line',
				} ) }
				tabIndex={ 0 }
			>
				{ leadingIcon && leadingIconsEnabled && (
					<i className="mdc-list-item__graphic material-icons">
						{ String.fromCharCode( leadingIcon?.hex ) }
					</i>
				) }

				<ListItemText
					editable={ true }
					primaryText={ primaryText }
					secondaryText={ secondaryText }
					onBlurPrimary={
						/* istanbul ignore next */
						setter( 'primaryText', e => e.currentTarget.textContent )
					}
					onEnterPrimary={ handleEnterPress }
					onBlurSecondary={
						/* istanbul ignore next */
						setter( 'secondaryText', e => e.currentTarget.textContent || null )
					}
					onEnterSecondary={ e => e.key === 'Enter' && e.currentTarget.blur() }
				/>

				{ trailingIcon && trailingIconsEnabled && (
					<i className="mdc-list-item__meta material-icons">
						{ String.fromCharCode( trailingIcon?.hex ) }
					</i>
				) }
			</div>

			<InspectorControls>
				{ leadingIconsEnabled && (
					<PanelBody
						title={ __( 'Leading Icon', 'material-theme-builder' ) }
						initialOpen={ true }
					>
						<IconPicker
							currentIcon={ leadingIcon }
							onChange={ setter( 'leadingIcon' ) }
						/>
					</PanelBody>
				) }

				{ trailingIconsEnabled && (
					<PanelBody
						title={ __( 'Trailing Icon', 'material-theme-builder' ) }
						initialOpen={ true }
					>
						<IconPicker
							currentIcon={ trailingIcon }
							onChange={ setter( 'trailingIcon' ) }
						/>
					</PanelBody>
				) }

				<PanelBody
					title={ __( 'Link Settings', 'material-theme-builder' ) }
					initialOpen={ true }
				>
					<TextControl
						value={ url }
						label={ __( 'URL', 'material-theme-builder' ) }
						onChange={ setter( 'url' ) }
					/>
					<ToggleControl
						label={ __( 'Open in new tab', 'material-theme-builder' ) }
						onChange={ onToggleOpenInNewTab }
						checked={ linkTarget === '_blank' }
					/>
					<TextControl
						value={ rel }
						label={ __( 'Link rel', 'material-theme-builder' ) }
						onChange={ setter( 'rel' ) }
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
};

export default ListItemEdit;
