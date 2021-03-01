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
import { isEqual } from 'lodash';
import { MDCTabBar } from '@material/tab-bar';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { dispatch, withSelect } from '@wordpress/data';
import { useState, useEffect, useRef } from '@wordpress/element';
import {
	InspectorControls,
	BlockControls,
	InnerBlocks,
} from '@wordpress/block-editor';
import { getBlockTypes } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './style.css';
import { ICON_POSITIONS } from './options';
import { Tab, TabSchema } from './components/tab';
import OrderToolbar from './components/order-toolbar';
import IconPicker from '../../components/icon-picker';
import ButtonGroup from '../../components/button-group';
import getConfig from '../../utils/get-config';

/**
 * Material button edit component.
 */
const TabBarEdit = ( {
	attributes: { tabs, iconPosition, forceUpdate, preview },
	setAttributes,
	clientId,
	tabContent,
} ) => {
	// Set the default tabs when a new block instance is added.
	if ( 0 === tabs.length ) {
		tabs = [
			...[
				new TabSchema( {
					label: '',
				} ),
				new TabSchema( {
					label: '',
				} ),
			],
		];
		setAttributes( { tabs } );
	}

	const [ activeTabIndex, setActiveTabIndex ] = useState( 0 );

	const tabBar = useRef( null );
	const mdcTabs = useRef( null );
	useEffect( () => {
		// Rebuild the Tabbar when tabs length changes.
		if ( tabBar.current ) {
			if ( mdcTabs.current ) {
				mdcTabs.current.destroy();
			}
			mdcTabs.current = new MDCTabBar( tabBar.current );
			mdcTabs.current.unlisten( 'keydown', mdcTabs.current.handleKeyDown_ );

			// Remove tab click event and add our own to scroll the tab into view.
			mdcTabs.current.unlisten(
				'MDCTab:interacted',
				mdcTabs.current.handleTabInteraction_
			);
			mdcTabs.current.listen( 'MDCTab:interacted', evt => {
				mdcTabs.current.foundation_.scrollIntoView(
					mdcTabs.current.foundation_.adapter_.getIndexOfTabById(
						evt.detail.tabId
					)
				);
			} );
		}
	}, [ tabBar, mdcTabs, tabs.length ] );

	useEffect( () => {
		const activeTab = tabs[ activeTabIndex ] || {};
		// If there's content, put it in the editor.
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
	 * Initialize and create a new tab. Save it to the Tabs.
	 */
	const createTab = () => {
		const newTabs = [ ...tabs ];

		newTabs.push(
			new TabSchema( {
				label: '',
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
	 * Filter out (delete) a tab.
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
	 * Move a tab left or right.
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
	 * @param {Object} icon The icon object.
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
	 * Create a list of all blocks to be allowed in the Tabs, except Tabs itself.
	 */
	const ALLOWED_BLOCKS = getBlockTypes()
		.map( block => block.name )
		.filter(
			blockName =>
				blockName !== 'material/tab-bar' &&
				! blockName.match( /material\/(.+)?-input-field/ )
		);

	// Display preview if available.
	if ( preview ) {
		return (
			<img
				src={ getConfig( 'tab_bar_preview' ) }
				alt={ __( 'Tabs Preview', 'material-design' ) }
			/>
		);
	}

	return (
		<>
			<div className="tab-wrap">
				<div className="mdc-tab-bar" role="tablist" ref={ tabBar }>
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
							</div>
						</div>
					</div>
				</div>

				<button className="tab-add" onClick={ createTab }>
					<i className="material-icons tab-add__icon">add</i>
					<span>{ __( 'New Tab', 'material-design' ) }</span>
				</button>
			</div>

			<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />

			<BlockControls>
				<OrderToolbar onChange={ moveTab } />
			</BlockControls>

			<InspectorControls>
				<PanelBody
					title={ __( 'Icon', 'material-design' ) }
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
