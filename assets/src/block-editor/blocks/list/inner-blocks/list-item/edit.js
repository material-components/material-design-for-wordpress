/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { ListContext } from '../../edit';
import IconPicker from '../../../../components/icon-picker';
import genericAttributesSetter from '../../../../utils/generic-attributes-setter';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { PanelBody } from '@wordpress/components';
import { dispatch, select } from '@wordpress/data';
import { InspectorControls } from '@wordpress/block-editor';
import { useCallback, useContext, useEffect } from '@wordpress/element';

const ListItemEdit = ( {
	attributes: { primaryText, secondaryText, leadingIcon, trailingIcon },
	setAttributes,
	className,
	clientId,
} ) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const setter = useCallback( genericAttributesSetter( setAttributes ) );

	const { parentClientId, leadingIcons, trailingIcons } = useContext(
		ListContext
	);

	/**
	 * Handle ENTER key within our primaryText conntentEditable.
	 *
	 * @param {Event} e The onKeyPress event object.
	 */
	const handleEnterPress = e => {
		if ( e.key !== 'Enter' ) {
			return true;
		}

		if ( e.key === 'Enter' && e.shiftKey ) {
			// Create help-text line
			setter( 'secondaryText' )(
				__( 'Secondary text...', 'material-theme-builder' )
			);
		} else {
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
		}

		e.currentTarget.blur();
	};

	// Sync with parent icon settings
	useEffect( () => {
		if ( ! leadingIcons && leadingIcon ) {
			setAttributes( { leadingIcon: undefined } );
		}

		if ( ! trailingIcons && trailingIcon ) {
			setAttributes( { trailingIcon: undefined } );
		}
	}, [ leadingIcons, leadingIcon, trailingIcons, trailingIcon ] );

	return (
		<>
			<li
				className={ classNames( 'mdc-list-item', 'list-item', className, {
					'list-item--with-secondary': secondaryText,
				} ) }
				tabIndex={ 0 }
			>
				{ leadingIcon && leadingIcons && (
					<i className="mdc-list-item__graphic material-icons">
						{ String.fromCharCode( leadingIcon?.hex ) }
					</i>
				) }
				<span className="mdc-list-item__text list-item__text-container">
					<span
						className={ classNames(
							'mdc-list-item__primary-text',
							'list-item__text-container__text'
						) }
						role="textbox"
						tabIndex={ 0 }
						contentEditable
						suppressContentEditableWarning
						onBlur={ setter( 'primaryText', e => e.currentTarget.textContent ) }
						onKeyPress={ handleEnterPress }
					>
						{ primaryText }
					</span>

					{ secondaryText && (
						<>
							<br />
							<span
								className="mdc-list-item__secondary-text list-item__text-container__text"
								role="textbox"
								tabIndex={ 0 }
								contentEditable
								suppressContentEditableWarning
								onKeyPress={ e => e.key === 'Enter' && e.currentTarget.blur() }
								onBlur={ setter(
									'secondaryText',
									e => e.currentTarget.textContent || null
								) }
							>
								{ secondaryText }
							</span>
						</>
					) }
				</span>

				{ trailingIcon && trailingIcons && (
					<i className="mdc-list-item__meta material-icons">
						{ String.fromCharCode( trailingIcon?.hex ) }
					</i>
				) }
			</li>

			<InspectorControls>
				{ leadingIcons && (
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

				{ trailingIcons && (
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
