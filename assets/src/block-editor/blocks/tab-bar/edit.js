/**
 * External dependencies
 */
import { isEqual } from 'lodash';

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
import { useState, useEffect } from '@wordpress/element';
import {
	InspectorControls,
	BlockControls,
	InnerBlocks,
} from '@wordpress/block-editor';
import { getBlockTypes } from '@wordpress/blocks';

/**
 * Material button edit component.
 */
const TabBarEdit = ( {
	attributes: { tabs, iconPosition, forceUpdate },
	setAttributes,
	clientId,
	tabContent,
} ) => {
	// Set the default tabs when a new block instance is added.
	if ( 0 === tabs.length ) {
		tabs = [
			...[
				new TabSchema( {
					label: __( 'Tab 1', 'material-theme-builder' ),
				} ),
				new TabSchema( {
					label: __( 'Tab 2', 'material-theme-builder' ),
				} ),
			],
		];
		setAttributes( { tabs } );
	}

	const [ activeTabIndex, setActiveTabIndex ] = useState( 0 );

	useEffect( () => {
		const activeTab = tabs[ activeTabIndex ] || {};
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
			if ( 0 < clientIds.length ) {
				dispatch( 'core/block-editor' ).removeBlocks( clientIds );
			}
		}
	}, [ activeTabIndex ] ); // eslint-disable-line

	useEffect( () => {
		const newTabs = [ ...tabs ];
		const activeTab = newTabs[ activeTabIndex ] || false;

		if ( activeTab && ! isEqual( activeTab.content, tabContent ) ) {
			activeTab.content = tabContent;
			setAttributes( { tabs: newTabs } );
		}
	} );

	/**
	 * Initialize and create a new tab. Save it to the Tab Bar.
	 */
	const createTab = () => {
		const newTabs = [ ...tabs ];

		newTabs.push(
			new TabSchema( {
				label: sprintf(
					__( 'Tab %d', 'material-theme-builder' ),
					tabs.length + 1
				),
			} )
		);

		setAttributes( { tabs: newTabs, forceUpdate: ! forceUpdate } );
		changeTab( newTabs.length - 1 );
	};

	/**
	 * Switch the active tab.
	 *
	 * @param {number} index The index of the tab to make active.
	 */
	const changeTab = index => {
		if ( index !== activeTabIndex ) {
			setActiveTabIndex( index );
		}
	};

	/**
	 * Filter out (delete) a tab
	 *
	 * @param {number} index The index of the tab to delete.
	 */
	const deleteTab = index => {
		if ( 1 >= tabs.length ) {
			return;
		}
		// If active tab is being deleted, set the prev/next tab as active.
		if ( activeTabIndex === index ) {
			setActiveTabIndex( index > 0 ? index - 1 : 1 );
		}

		setAttributes( { tabs: tabs.filter( ( _, i ) => index !== i ) } );
	};

	/**
	 * Set the icon position.
	 *
	 * @param {string} val The icon position.
	 */
	const setIconPosition = val => setAttributes( { iconPosition: val } );

	/**
	 * Move a tab left or right
	 *
	 * @param {string} direction The direction to move towards.
	 */
	const moveTab = direction => {
		const newPos =
			direction === 'left' ? activeTabIndex - 1 : activeTabIndex + 1;

		if ( -1 < newPos && newPos < tabs.length ) {
			const newTabs = [ ...tabs ];
			const tab = newTabs.splice( activeTabIndex, 1 );
			newTabs.splice( newPos, 0, tab.pop() );

			setActiveTabIndex( newPos );
			setAttributes( { tabs: newTabs } );
		}
	};

	/**
	 * Set a tab's icon.
	 *
	 * @param {Object} icon The icon object
	 */
	const setTabIcon = icon => {
		const newTabs = [ ...tabs ];
		newTabs[ activeTabIndex ].icon = icon;
		setAttributes( { tabs: newTabs, forceUpdate: ! forceUpdate } );
	};

	/**
	 * Set the tab's label.
	 *
	 * @param {string} label The new tab label.
	 * @param {number} tabIndex Index of the tab.
	 */
	const setTabLabel = ( label, tabIndex ) => {
		const newTabs = [ ...tabs ];
		if ( ! newTabs[ tabIndex ] ) {
			return;
		}

		newTabs[ tabIndex ].label = label;
		setAttributes( { tabs: newTabs, forceUpdate: ! forceUpdate } );
	};

	/**
	 * Create a list of all blocks to be allowed in the tab bar, except tab bar itself.
	 */
	const ALLOWED_BLOCKS = getBlockTypes()
		.map( block => block.name )
		.filter( blockName => blockName !== 'material/tab-bar' );

	return (
		<>
			<div className="mdc-tab-bar" role="tablist">
				<div className="mdc-tab-scroller">
					<div className="mdc-tab-scroller__scroll-area mdc-tab-scroller__scroll-area--scroll">
						<div className="mdc-tab-scroller__scroll-content">
							{ tabs.map( ( props, index ) => (
								<Tab
									{ ...props }
									key={ `${ clientId }-${ index }` }
									iconPosition={ iconPosition }
									onChange={ changeTab.bind( this, index ) }
									onDelete={ deleteTab.bind( this, index ) }
									onInput={ setTabLabel }
									active={ activeTabIndex === index }
									index={ index }
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

			<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />

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
							currentIcon={ ( tabs[ activeTabIndex ] || {} ).icon }
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
