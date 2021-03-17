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
import { ADDONS } from '../../constants';
import Card from './card';
import getConfig from '../../../admin/get-config';

/**
 * Addon selection screen
 */
const Addons = () => {
	return (
		<div className="mdc-layout-grid__cell--span-12">
			<h3 className="mdc-typography--headline3 material-wizard__title">
				{ __( 'Install addons', 'material-design' ) }
			</h3>

			<Card
				image={ `${ getConfig( 'assetsPath' ) }addon-material-theme.png` }
				switch={ ADDONS.THEME }
				disabled={ 'ok' === getConfig( 'themeStatus' ) }
			>
				<h4 className="mdc-typography--headline4">
					{ __( 'Material Design Theme', 'material-design' ) }
				</h4>

				<p>
					{ __(
						'This applies Material Design principles and Material Theming to your site, so you can customize its style.',
						'material-design'
					) }
				</p>
			</Card>

			<hr />

			<Card
				image={ `${ getConfig( 'assetsPath' ) }addon-quick-start-examples.png` }
				switch={ ADDONS.DEMO }
			>
				<h4 className="mdc-typography--headline4">
					{ __( 'Quick Start Examples', 'material-design' ) }
				</h4>

				<p>
					{ __(
						'See examples of how you can use Material Components to build popular pages and flows, like a homepage, contact page, or blog.',
						'material-design'
					) }
				</p>
			</Card>
		</div>
	);
};

export default Addons;
