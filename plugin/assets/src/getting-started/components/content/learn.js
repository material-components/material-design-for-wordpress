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
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import Button from "../../../wizard/components/navigation/button";
import getConfig from "../../get-config";

export const Learn = () => {
	return (
		<Fragment>
			<div className="material-gsm__content mdc-layout-grid__cell mdc-layout-grid__cell--span-9">
				<h2 className="material-gsm__content-title mdc-typography--headline3">
					{ __( 'Learn More about Material Design', 'material-design' ) }
				</h2>
				<p>
					{ __(
						'Leran about the concepts behind material Desgin','material-design'
					) }
				</p>

				<div className="material-gsm__content-actions">
					<Button
						style="mdc-button--raised mdc-button--offsite"
						text={ __( 'Vist material.io', 'material-design' ) }
						trailingIcon="arrow_downward"
						link={ getConfig( 'materialUrl' ) }
						target="blank"
					/>
				</div>

				<p>
					{ __(
						'Sign up to get update and news about material design via email','material-design'
					) }
				</p>

				<div className="material-gsm__content-actions">
					<Button
						style="mdc-button--raised mdc-button--offsite"
						text={ __( 'Subscribe to Newsletter', 'material-design' ) }
						trailingIcon="arrow_downward"
						link={ getConfig( 'newsLetterUrl' ) }
						target="blank"
					/>
				</div>

				<div style={ { height: '20px' } }></div>
			</div>
		</Fragment>
	);
};
