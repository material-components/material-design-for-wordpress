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

import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import Button from '../../../wizard/components/navigation/button';
import getConfig from '../../get-config';

export const Overview = () => {
	return (
		<Fragment>
			<h2 className="material-gsm__content-title mdc-typography--headline3">
				{ __( 'Build with Material Blocks', 'material-design' ) }
			</h2>

			<p>
				{ __(
					'Add Material Components like buttons and cards, and create layouts for things like image-heavy pages or styled contact forms. Customize the look of your blocks by adjusting global theme styles, or setting the style of a single component in the block editor.',
					'material-design'
				) }
			</p>

			<img
				src={ `${ getConfig(
					'assetsPath'
				) }material-blocks-getting-started.gif` }
				alt=""
				style={ { maxWidth: '100%' } }
			/>

			<div style={ { height: '15px' } }></div>

			<div className="material-gsm__content-actions">
				<Button
					style="mdc-button--raised"
					text={ __( 'Customize Material Blocks', 'material-design' ) }
					trailingIcon="navigate_next"
					link={ getConfig( 'blocks' ) }
				/>
			</div>

			<div style={ { height: '20px' } }></div>
		</Fragment>
	);
};
