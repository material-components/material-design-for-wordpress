/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { Tab } from './components/tab';

/**
 * WordPress dependencies
 */
import { RawHTML } from '@wordpress/element';
import { getBlockContent } from '@wordpress/blocks';

const TabBarSave = ( { attributes: { tabs, iconPosition } } ) => (
	<div className="mdc-tab-bar-container">
		<div className="mdc-tab-bar" role="tablist">
			<div className="mdc-tab-scroller">
				<div className="mdc-tab-scroller__scroll-area mdc-tab-scroller__scroll-area--scroll">
					<div className="mdc-tab-scroller__scroll-content">
						{ tabs.map( ( props, index ) => (
							<Tab
								frontend
								{ ...props }
								active={ index === 0 }
								key={ index }
								iconPosition={ iconPosition }
							/>
						) ) }
					</div>
				</div>
			</div>
		</div>
		<div>
			{ tabs.map( ( tab, index ) => (
				<RawHTML
					key={ tab.label + tab.position }
					className={ classNames( 'mdc-tab-content mdc-typography--body1', {
						'mdc-tab-content--active': index === 0,
					} ) }
				>
					{ tab.content &&
						tab.content[ 0 ] &&
						getBlockContent( tab.content[ 0 ] ) }
				</RawHTML>
			) ) }
		</div>
	</div>
);

export default TabBarSave;
