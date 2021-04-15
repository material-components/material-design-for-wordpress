/**
 * Copyright 2021 Google LLC
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

import { forwardRef } from '@wordpress/element';
import { jest } from '@jest/globals';

const original = jest.requireActual( '@wordpress/rich-text' );

const RichText = forwardRef(
	(
		{ tagName: Tag = 'div', value, placeholder, onChange, className = '' },
		// eslint-disable-next-line no-unused-vars
		ref
	) => {
		let classes = [ 'rich-text', 'block-editor-rich-text__editable' ];

		if ( className ) {
			classes = classes.concat( className.split( ' ' ) );
		}

		return (
			<Tag
				aria-label={ placeholder }
				aria-multiline="true"
				className={ [ ...new Set( classes ) ].join( ' ' ) }
				style={ { whiteSpace: 'pre-wrap' } }
				role="textbox"
				onInput={ node => onChange( node.currentTarget.textContent ) }
			>
				{ value }
			</Tag>
		);
	}
);

RichText.isEmpty = () => false;
RichText.Content = ( { tagName: Tag = 'div', value, className = '' } ) => (
	<Tag className={ className }>
		<div>{ value }</div>
	</Tag>
);

module.exports = {
	__experimentalRichText: RichText,
	...original,
};
