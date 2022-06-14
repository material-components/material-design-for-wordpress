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
import Button from '../../../wizard/components/navigation/button';
import getConfig from '../../get-config';

export const Wizard = props => {
	return (
		<>
			<h2 className="material-gsm__content-title mdc-typography--headline3">
				{ __(
					'Install the Material Design Theme and quick start examples',
					'material-design'
				) }
			</h2>

			<p>
				{ __(
					'The theme applies Material Design principles and Material Theming to your site, so you can customize built-in WordPress elements like your site’s header and footer. Example layouts include pages for home, about, projects, blog, and contact.',
					'material-design'
				) }
			</p>

			<img
				src={ `${ getConfig( 'assetsPath' ) }apply-your-theme.png` }
				alt=""
				style={ { maxWidth: '40%' } }
			/>

			<div style={ { height: '15px' } }></div>

			<div className="material-gsm__content-actions">
				<Button
					style="mdc-button--raised"
					text={ __( 'Re-run quick start', 'material-design' ) }
					trailingIcon="navigate_next"
					onClick={ props.handleClick }
					link={ getConfig( 'wizardUrl' ) }
				/>
			</div>

			<div style={ { height: '20px' } }></div>
		</>
	);
};
