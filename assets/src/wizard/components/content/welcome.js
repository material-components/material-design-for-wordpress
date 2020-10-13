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
import Card from './card';
import getConfig from '../../../admin/get-config';

/**
 * Welcome screen
 */
const Welcome = () => {
	return (
		<div className="mdc-layout-grid__cell--span-12">
			<Card image={ `${ getConfig( 'assetsPath' ) }welcome.png` } imageSpan="5">
				<h3 className="mdc-typography--headline3">
					{ __( 'Start building', 'material-design' ) }
				</h3>

				<p>
					{ __(
						'Material Design for WordPress lets you use Material Components and custom styles in your WordPress site.',
						'material-design'
					) }
				</p>
			</Card>
		</div>
	);
};

export default Welcome;
