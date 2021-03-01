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
						Array.isArray( tab.content ) &&
						tab.content
							.map( content => getBlockContent( content ) )
							.join( ' ' ) }
				</RawHTML>
			) ) }
		</div>
	</div>
);

export default TabBarSave;
