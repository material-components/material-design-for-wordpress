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
import { useState, useEffect } from '@wordpress/element';
import { PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { LIST_STYLES, ICON_POSITIONS, ICON_SIZES } from './options';
import ButtonGroup from '../../components/button-group';
import IconPicker from '../../components/icon-picker';
import ImageRadioControl from '../../components/image-radio-control';
import ToolbarUrlInputPopover from '../../components/toolbar-url-input-popover';
import genericAttributesSetter from '../../utils/generic-attributes-setter';
import ListItem from './components/list-item';

/**
 * Material list edit component.
 */
const ListEdit = ( {
	attributes: { style, iconPosition, iconSize, items, preview },
	className,
	setAttributes,
} ) => {
	// Insert first item when a list block is created.
	useEffect( () => {
		if ( 0 === items.length ) {
			setAttributes( {
				items: [
					{
						primaryText: '',
						secondaryText: '',
						icon: 'spa',
					},
				],
			} );
		}
	}, [ items, setAttributes ] );

	const [ selected, setSelected ] = useState( {
		index: 0,
		isSecondary: false,
		start: 0,
	} );

	const setter = genericAttributesSetter( setAttributes );
	const isSecondaryEnabled = style === 'two-line';

	/**
	 * Add an item to the list.
	 *
	 * @param {number} index Index the item should be inserted at.
	 * @param {string} text Primary text for the item.
	 */
	const addItem = ( index, text = '' ) => {
		const newItems = [ ...items ];
		const item = {
			primaryText: text,
			secondaryText: '',
			icon: 'spa',
		};

		if ( 'number' === typeof index ) {
			newItems.splice( index, 0, item );
		} else {
			newItems.push( item );
		}

		setAttributes( { items: newItems } );
		setSelected( { ...selected, index, isSecondary: false } );
	};

	/**
	 * Delete an item from list.
	 *
	 * @param {number} index Index the item should be deleted from.
	 * @param {string} primaryText Primary text of the item being deleted
	 * @param {string} secondaryText Secondary text of the item being deleted.
	 */
	const deleteItem = ( index, primaryText, secondaryText = '' ) => {
		if ( index === 0 ) {
			return;
		}

		const newItems = [ ...items ];
		newItems.splice( index, 1 );
		const prevItem = newItems[ index - 1 ];
		let start = 0;

		if ( isSecondaryEnabled ) {
			start = prevItem.secondaryText.length;
			prevItem.secondaryText = `${ prevItem.secondaryText }${ primaryText } ${ secondaryText }`;
		} else {
			start = prevItem.primaryText.length;
			prevItem.primaryText = `${ prevItem.primaryText }${ primaryText } ${ secondaryText }`;
		}

		setAttributes( { items: newItems } );
		setSelected( { index: index - 1, start, isSecondary: isSecondaryEnabled } );
	};

	/**
	 * Set an item in the list.
	 *
	 * @param {number} index Index of the item being set.
	 * @param {Object} newItem Item object.
	 */
	const setItem = ( index, newItem ) => {
		const newItems = [ ...items ];
		const item = newItems[ index ] || {};
		newItems[ index ] = { ...item, ...newItem };

		setAttributes( { items: newItems } );
		items = newItems;
	};

	/**
	 * Handle primary text change.
	 *
	 * @param {number} index Index of the list item.
	 * @param {string} text Primary text.
	 */
	const onPrimaryTextChange = ( index, text ) => {
		if ( ! items[ index ] ) {
			return;
		}

		items[ index ].primaryText = text;
		setAttributes( { items } );
	};

	/**
	 * Handle secondary text change.
	 *
	 * @param {number} index Index of the list item.
	 * @param {string} text Secondary text.
	 */
	const onSecondaryTextChange = ( index, text ) => {
		if ( ! items[ index ] ) {
			return;
		}

		items[ index ].secondaryText = text;
		setAttributes( { items } );
	};

	/**
	 * Handle splitting of a list item
	 *
	 * @param {number} index Index of the item being split.
	 * @param {string} text Text split.
	 */
	const onSplit = ( index, text ) => addItem( index + 1, text );

	/**
	 * Handle focus of a list item.
	 *
	 * @param {number}  index Index of the item.
	 * @param {boolean} isSecondary Detemine if the secondary text beng focused.
	 * @param {number}  start Start range of the cursor.
	 */
	const onFocus = ( index, isSecondary = false, start = false ) => {
		const newProps = { ...selected, index, isSecondary };
		if ( false !== start ) {
			newProps.start = start;
		}

		setSelected( newProps );
	};

	/**
	 * Handle icon change for a list item.
	 *
	 * @param {Object} icon Icon to be updated.
	 */
	const onIconChange = icon => {
		const newItems = [ ...items ];
		newItems[ selected.index ].icon = icon;
		setAttributes( { items: newItems } );
	};

	/**
	 * Handle URL change.
	 *
	 * @param {string} url URL to be updated.
	 */
	const onURLChange = url => {
		const newItems = [ ...items ];
		newItems[ selected.index ].url = url;
		setAttributes( { items: newItems } );
	};

	/**
	 * Handle New Tab change.
	 *
	 * @param {boolean} newTab Should the URL be opened in a new tab.
	 */
	const onNewTabChange = newTab => {
		const newItems = [ ...items ];
		newItems[ selected.index ].target = newTab ? '_blank' : '';
		setAttributes( { items: newItems } );
	};

	/**
	 * Get selected item.
	 */
	const getSelectedItem = () => {
		return items[ selected.index ] || {};
	};

	return (
		<>
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
				{ items.map( ( item, i ) => (
					<ListItem
						key={ i }
						index={ i }
						{ ...item }
						{ ...{
							iconPosition,
							isSecondaryEnabled,
						} }
						preview={ preview }
						onSplit={ onSplit }
						onFocus={ onFocus }
						isSelected={ i === selected.index }
						isSecondarySelected={ i === selected.index && selected.isSecondary }
						selectionStart={ selected.start }
						setItem={ setItem }
						deleteItem={ deleteItem }
						onPrimaryTextChange={ onPrimaryTextChange }
						onSecondaryTextChange={ onSecondaryTextChange }
					/>
				) ) }
			</ul>

			{ selected && (
				<ToolbarUrlInputPopover
					url={ getSelectedItem().url }
					setURL={ onURLChange }
					isSelected={ true }
					opensInNewTab={ getSelectedItem().target === '_blank' }
					onChangeNewTab={ onNewTabChange }
				/>
			) }

			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'material-design' ) }
					initialOpen={ true }
				>
					<ImageRadioControl
						selected={ style }
						options={ LIST_STYLES }
						onChange={ setter( 'style' ) }
					/>
					<ButtonGroup
						label={ __( 'Icon Position' ) }
						buttons={ ICON_POSITIONS }
						current={ iconPosition }
						onClick={ setter( 'iconPosition' ) }
					/>
					{ 'leading' === iconPosition && (
						<ButtonGroup
							label={ __( 'Icon Size' ) }
							buttons={ ICON_SIZES }
							current={ iconSize }
							onClick={ setter( 'iconSize' ) }
						/>
					) }
				</PanelBody>

				{ selected && 'none' !== iconPosition && (
					<PanelBody
						title={ __( 'List item Settings', 'material-design' ) }
						initialOpen={ true }
					>
						<IconPicker
							currentIcon={ getSelectedItem().icon }
							onChange={ onIconChange }
						/>
					</PanelBody>
				) }
			</InspectorControls>
		</>
	);
};

export default ListEdit;
