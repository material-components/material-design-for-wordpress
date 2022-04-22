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
import getConfig from '../../get-config';
import { LearnContent } from './learn-content';

export const Learn = () => {
	return (
		<Fragment>
			<div className="material-gsm__content mdc-layout-grid__cell mdc-layout-grid__cell--span-9">
				<h2 className="material-gsm__content-title headline-large">
					{ __(
						'Learn More about Material Design',
						'material-design'
					) }
				</h2>
				<LearnContent
					materialUrl={ getConfig( 'materialUrl' ) }
					newsLetterUrl={ getConfig( 'newsLetterUrl' ) }
				/>

				<div style={ { height: '20px' } }></div>
			</div>
		</Fragment>
	);
};
