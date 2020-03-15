/**
 * External dependencies
 */
import { sortBy, isEqual } from 'lodash';

/**
 * Internal dependencies
 */
import './style.css';
import { ICON_POSITIONS } from './options';
import { Tab, TabSchema } from './components/tab';
import OrderToolbar from './components/order-toolbar';
import IconPicker from '../../components/icon-picker';
import ButtonGroup from '../../components/button-group';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { dispatch, withSelect } from '@wordpress/data';
import { useState, useEffect, useCallback } from '@wordpress/element';
import {
	InspectorControls,
	BlockControls,
	InnerBlocks,
} from '@wordpress/block-editor';

/**
 * Material button edit component.
 */
const TabBarEdit = ( {
	attributes: { tabs, iconPosition, forceUpdate },
	setAttributes,
	clientId,
	tabContent,
} ) => {
	const [ activeTab, setActiveTab ] = useState( tabs[ 0 ] );

	useEffect( () => {
		// If there's content, put it in the editor
		if ( activeTab && activeTab.content && activeTab.content.length ) {
			dispatch( 'core/block-editor' ).replaceInnerBlocks(
				clientId,
				activeTab.content,
				false
			);
		} else {
			// Otherwise empty the editor
			const clientIds = tabContent.map( block => block.clientId );
			dispatch( 'core/block-editor' ).removeBlocks( clientIds );
		}
	}, [ activeTab ] );

	useEffect( () => {
		if ( activeTab && ! isEqual( activeTab.content, tabContent ) ) {
			activeTab.content = tabContent;
			setAttributes( { tabs } );
		}
	} );

	/**
	 * Initialize and create a new tab. Save it to the Tab Bar.
	 */
	const createTab = useCallback( () => {
		const newPosition = tabs[ tabs.length - 1 ].position + 1;

		tabs.push(
			new TabSchema( {
				position: newPosition,
				label: sprintf( __( 'Tab %d', 'material-theme-builder' ), newPosition ),
			} )
		);

		setAttributes( { tabs, forceUpdate: ! forceUpdate } );
		changeTab( tabs.length - 1 );
	} );

	/**
	 * Switch the active tab.
	 *
	 * @param {number} index The index of the tab to make active.
	 */
	const changeTab = useCallback( index => {
		setActiveTab( tabs[ index ] );
	} );

	/**
	 * Filter out (delete) a tab
	 *
	 * @param {number} index The index of the tab to delete.
	 */
	const deleteTab = useCallback( index => {
		tabs = tabs.filter( ( _, i ) => index !== i );
		setAttributes( { tabs } );
	} );

	/**
	 * Set the icon position.
	 *
	 * @param {string} val The icon position.
	 */
	const setIconPosition = useCallback( val =>
		setAttributes( { iconPosition: val } )
	);

	/**
	 * Move a tab left or right
	 *
	 * @param {string} direction The direction to move towards.
	 */
	const moveTab = useCallback( direction => {
		let newPos =
			direction === 'left' ? activeTab.position - 1 : activeTab.position + 1;

		// Prevent going out of bounds
		if ( newPos < 1 ) {
			newPos = 1;
		} else if ( newPos > tabs.length ) {
			newPos = tabs.length;
		}

		const currentTab = tabs.find( t => t.position === newPos );

		// Swap the tabs positions
		currentTab.position = activeTab.position;
		activeTab.position = newPos;

		setAttributes( { tabs: sortBy( tabs, [ 'position' ] ) } );
	} );

	const setTabIcon = useCallback( icon => {
		activeTab.icon = icon;
		setAttributes( { tabs, forceUpdate: ! forceUpdate } );
	} );

	const setTabLabel = useCallback( label => {
		activeTab.label = label;
		setAttributes( { tabs, forceUpdate: ! forceUpdate } );
	} );

	return (
		<>
			<div className="mdc-tab-bar" role="tablist">
				<div className="mdc-tab-scroller">
					<div className="mdc-tab-scroller__scroll-area mdc-tab-scroller__scroll-area--scroll">
						<div className="mdc-tab-scroller__scroll-content">
							{ tabs.map( ( props, index ) => (
								<Tab
									{ ...props }
									key={ props.position }
									iconPosition={ iconPosition }
									onChange={ changeTab.bind( this, index ) }
									onDelete={ deleteTab.bind( this, index ) }
									onInput={ setTabLabel }
									active={ tabs.indexOf( activeTab ) === index }
								/>
							) ) }
							<button className="tab-add" onClick={ createTab }>
								<i className="material-icons tab-add__icon">add</i>
								<span>{ __( 'New Tab', 'material-theme-builder' ) }</span>
							</button>
						</div>
					</div>
				</div>
			</div>

			<InnerBlocks />

			<BlockControls>
				<OrderToolbar onChange={ moveTab } />
			</BlockControls>

			<InspectorControls>
				<PanelBody
					title={ __( 'Icon', 'material-theme-builder' ) }
					initialOpen={ true }
				>
					<ButtonGroup
						buttons={ ICON_POSITIONS }
						current={ iconPosition }
						onClick={ setIconPosition }
					/>

					{ iconPosition !== 'none' && (
						<IconPicker
							currentIcon={ activeTab?.icon }
							onChange={ setTabIcon }
						/>
					) }
				</PanelBody>
			</InspectorControls>
		</>
	);
};

export default withSelect( ( select, { clientId } ) => ( {
	tabContent: select( 'core/block-editor' ).getBlocks( clientId ),
} ) )( TabBarEdit );
