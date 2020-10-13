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

/**
 * Internal dependencies
 */
import IconButtonLink from '../common/icon-button-link';

const TabBar = ( { iconStyle } ) => (
	<div>
		<h4 className="mdc-typography--headline4" style={ { margin: 0 } }>
			{ __( 'Tabs', 'material-design' ) }
		</h4>
		<IconButtonLink href="https://material.io/components/tabs"></IconButtonLink>
		<p>
			{ __(
				'Tabs organize content across different screens, data sets, and other interactions.',
				'material-design'
			) }
		</p>
		<div
			className="wp-block-material-tab-bar mdc-tab-bar-container"
			style={ { width: '80%' } }
		>
			<div className="mdc-tab-bar" role="tablist">
				<div className="mdc-tab-scroller">
					<div
						className="mdc-tab-scroller__scroll-area mdc-tab-scroller__scroll-area--scroll"
						style={ { marginBottom: 0 } }
					>
						<div className="mdc-tab-scroller__scroll-content">
							<div
								role="tab"
								tabIndex="0"
								className="mdc-tab tab mdc-tab--active"
								id="mdc-tab-1"
								aria-selected="true"
							>
								<span className="mdc-tab__content">
									<i className={ classNames( iconStyle, 'mdc-tab__icon' ) }>
										wifi
									</i>
									<span className="mdc-tab__text-label tab__label-field">
										<span role="tab" tabIndex="0">
											{ __( 'Tab 1', 'material-design' ) }
										</span>
									</span>
								</span>
								<span className="mdc-tab-indicator mdc-tab-indicator--active">
									<span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
								</span>
								<span className="mdc-tab__ripple mdc-ripple-upgraded"></span>
							</div>
							<div
								role="tab"
								tabIndex="-1"
								className="mdc-tab tab"
								id="mdc-tab-2"
								aria-selected="false"
							>
								<span className="mdc-tab__content">
									<i className={ classNames( iconStyle, 'mdc-tab__icon' ) }>
										bluetooth
									</i>
									<span className="mdc-tab__text-label tab__label-field">
										<span role="tab" tabIndex="0">
											{ __( 'Tab 2', 'material-design' ) }
										</span>
									</span>
								</span>
								<span className="mdc-tab-indicator">
									<span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
								</span>
								<span className="mdc-tab__ripple mdc-ripple-upgraded"></span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div className="mdc-tab-content mdc-tab-content--active">
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
						congue massa velit, venenatis egestas sapien finibus vitae. Praesent
						eu arcu eleifend, rutrum dui at, sodales dui. Vestibulum ante ipsum
						primis in faucibus orci luctus et ultrices posuere cubilia Curae;
						Maecenas sed arcu vel lectus accumsan rutrum volutpat et risus. Sed
						tristique sit amet nisl vitae congue. Praesent vestibulum quam et
						luctus convallis. Fusce a enim ut purus venenatis pulvinar eu
						ullamcorper arcu. Sed laoreet augue nisi, at convallis sem placerat
						sit amet. Praesent varius congue nibh, sit amet aliquam libero
						tincidunt eget. Nulla et magna lobortis, pellentesque arcu
						sollicitudin, pellentesque justo. Mauris rutrum nunc felis, sed
						cursus dui feugiat vitae.
					</p>
				</div>
				<div className="mdc-tab-content">
					<p>
						Proin quis ornare leo. In pellentesque libero a consequat ultricies.
						Aliquam ornare neque non justo dignissim, vel gravida purus posuere.
						Cras a neque eu nisi facilisis aliquet. Integer faucibus, lorem et
						tempor pellentesque, est tellus molestie libero, a ullamcorper
						ligula est et sapien. Nunc placerat sollicitudin nisl et viverra.
						Sed pellentesque nunc sed tellus dignissim, et rhoncus velit
						porttitor.
					</p>
				</div>
			</div>
		</div>
	</div>
);

export default TabBar;
