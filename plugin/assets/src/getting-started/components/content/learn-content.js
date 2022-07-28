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
import Button from '../../../wizard/components/navigation/button';

export const LearnContent = ( { materialUrl, newsLetterUrl } ) => {
	return (
		<Fragment>
			<p className="body-large">
				{ __(
					'Learn about the concepts behind material Design',
					'material-design'
				) }
			</p>

			<div className="material-gsm__content-actions">
				<Button
					style="mdc-button--raised mdc-button--offsite"
					text={ __( 'Visit material.io', 'material-design' ) }
					trailingIcon="arrow_downward"
					link={ materialUrl }
					target="_blank"
				/>
			</div>

			<p className="body-large">
				{ __(
					'Sign up to get updates and news about material design via email',
					'material-design'
				) }
			</p>

			<div className="material-gsm__content-actions">
				<Button
					style="mdc-button--raised mdc-button--offsite"
					text={ __( 'Subscribe to Newsletter', 'material-design' ) }
					trailingIcon="arrow_downward"
					link={ newsLetterUrl }
					target="_blank"
				/>
			</div>
		</Fragment>
	);
};
