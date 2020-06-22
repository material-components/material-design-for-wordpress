/**
 * External dependencies
 */
import classNames from 'classnames';
import { debounce } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
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
	attributes: { style, iconPosition, iconSize, items },
	className,
	setAttributes,
} ) => {
	const setter = genericAttributesSetter( setAttributes );
	const isSecondaryEnabled = style === 'two-line';
	const [ selected, setSelected ] = useState( {
		index: 0,
		isSecondary: false,
	} );

	const addItem = () => {
		items.push( {
			primaryText: '',
			secondaryText: '',
			icon: 'favorite',
		} );
	};

	const setItem = debounce( ( index, newItem ) => {
		const newItems = [ ...items ];
		const item = newItems[ index ] || {};
		newItems[ index ] = { ...item, ...newItem };

		setAttributes( { items: newItems } );
	}, 300 );

	const deleteItem = ( index, text ) => {
		if ( index === 0 ) {
			return;
		}

		const newItems = [ ...items ];
		newItems.splice( index, 1 );
		const prevItem = newItems[ index - 1 ];
		prevItem.primaryText = `${ prevItem.primaryText } ${ text }`;
		setAttributes( { items: newItems } );
		setSelected( { index: index - 1 } );
	};

	const onEnter = ( index, isSecondary = false ) => {
		if ( index >= items.length ) {
			addItem();
		}

		setSelected( { index, isSecondary } );
	};

	const onIconChange = debounce( icon => {
		const newItems = [ ...items ];
		newItems[ selected.index ].icon = icon.name;
		setAttributes( { items: newItems } );
	}, 300 );

	const onURLChange = debounce( url => {
		const newItems = [ ...items ];
		newItems[ selected.index ].url = url;
		setAttributes( { items: newItems } );
	}, 300 );

	const onNewTabChange = debounce( newTab => {
		const newItems = [ ...items ];
		newItems[ selected.index ].target = newTab ? '_blank' : '';
		setAttributes( { items: newItems } );
	}, 300 );

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
						onEnter={ onEnter }
						onFocus={ ( index, isSecondary = false ) =>
							setSelected( { index, isSecondary } )
						}
						isSelected={ i === selected.index }
						isSecondarySelected={ i === selected.index && selected.isSecondary }
						setItem={ setItem }
						deleteItem={ deleteItem }
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
					title={ __( 'Block Settings', 'material-theme-builder' ) }
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
						title={ __( 'List item Settings', 'material-theme-builder' ) }
						initialOpen={ true }
					>
						<IconPicker
							currentIcon={ {
								name: getSelectedItem().icon,
							} }
							onChange={ onIconChange }
						/>
					</PanelBody>
				) }
			</InspectorControls>
		</>
	);
};

export default ListEdit;
