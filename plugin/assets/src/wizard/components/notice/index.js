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
import sanitizeHtml from 'sanitize-html';

/**
 * Prepare for notices
 *
 * @param {*} props Component props
 */
const Notice = props => {
	return (
		<div className={ `notice material-wizard__notice ${ props.type }` }>
			<p
				dangerouslySetInnerHTML={ {
					__html: sanitizeHtml( props.message, {
						allowedTags: [ 'a' ],
						allowedAttributes: {
							a: [ 'href' ],
						},
					} ),
				} }
			></p>
		</div>
	);
};

export default Notice;
