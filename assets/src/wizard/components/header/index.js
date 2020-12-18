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
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { Logo } from '../svg/logo';

/**
 * Header Layout
 */
const Header = () => {
	return (
		<div className="mdc-layout-grid__inner">
			<div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-1 mdc-layout-grid__cell--align-middle">
				{ <Logo /> }
			</div>
			<div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-11 mdc-layout-grid__cell--align-middle">
				<h2 className="mdc-typography--headline5">
					{ __( 'Material Design for WordPress', 'material-design' ) }
				</h2>
			</div>
		</div>
	);
};

export default Header;
