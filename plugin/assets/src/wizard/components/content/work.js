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
 * Congrats and how we work screen
 */
const Work = () => {
	return (
		<div className="mdc-layout-grid__cell--span-12">
			<Card
				image={ `${ getConfig( 'assetsPath' ) }complete-build-with-blocks.png` }
				imageSpan="5"
			>
				<h3 className="mdc-typography--headline3">
					{ __( 'Congrats!', 'material-design' ) }
				</h3>

				<p>
					{ __(
						'You\'ve installed Material. Click "Finish" and check out the rest of the Getting Started guide to customize your theme, build with Material Blocks, and apply the theme to your site.',
						'material-design'
					) }
				</p>
			</Card>
		</div>
	);
};

export default Work;
