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
import UrlInputPopover from '../../../../components/url-input-popover';
import genericAttributesSetter from '../../../../utils/generic-attributes-setter';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import {
	KeyboardShortcuts,
	PanelBody,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';
import { dispatch, select } from '@wordpress/data';
import { useContext, useEffect, useState } from '@wordpress/element';
import { rawShortcut, displayShortcut } from '@wordpress/keycodes';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';
import { link } from '@wordpress/icons';

function URLPicker( {
	isSelected,
	url,
	setURL,
	opensInNewTab,
	onChangeNewTab,
} ) {
	const [ isURLPickerOpen, setIsURLPickerOpen ] = useState( false );
	const openLinkControl = () => {
		setIsURLPickerOpen( true );
	};
	const linkControl = isURLPickerOpen && (
		<UrlInputPopover
			value={ url }
			onChange={ setURL }
			newTab={ opensInNewTab }
			onChangeNewTab={ onChangeNewTab }
			showNoFollow={ false }
			onPopupClose={ () => setIsURLPickerOpen( false ) }
			onFocusOutside={ () => setIsURLPickerOpen( false ) }
		/>
	);
	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						name="link"
						icon={ link }
						title={ __( 'Link' ) }
						shortcut={ displayShortcut.primary( 'k' ) }
						onClick={ openLinkControl }
					/>
				</ToolbarGroup>
			</BlockControls>
			{ isSelected && (
				<KeyboardShortcuts
					bindGlobal
					shortcuts={ {
						[ rawShortcut.primary( 'k' ) ]: openLinkControl,
					} }
				/>
			) }
			{ linkControl }
		</>
	);
}

const ListItemEdit = ( {
	attributes: {
		url,
		linkTarget,
		leadingIcon,
		primaryText,
		trailingIcon,
		secondaryText,
	},
	setAttributes,
	isSelected,
	className,
	clientId,
} ) => {
	const setter = genericAttributesSetter( setAttributes );

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
		const parent = select( 'core/block-editor' ).getBlocksByClientId(
			parentClientId
		)[ 0 ];

		dispatch( 'core/block-editor' ).insertBlocks(
			block,
			parent.innerBlocks.findIndex( blk => blk.clientId === clientId ) + 1,
			parent.clientId
		);

		e.currentTarget.blur();
		return false;
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
		leadingIcon,
		trailingIcon,
		setAttributes,
		leadingIconsEnabled,
		trailingIconsEnabled,
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
						value => setter( 'primaryText', e => value )
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

			{ isSelected && (
				<URLPicker
					url={ url }
					setURL={ setter( 'url' ) }
					isSelected={ isSelected }
					newTab={ linkTarget === '_blank' }
					onChangeNewTab={ setter(
						'linkTarget',
						newTab => ( newTab ? '_blank' : undefined ),
						true
					) }
				/>
			) }

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
			</InspectorControls>
		</>
	);
};

export default ListItemEdit;
