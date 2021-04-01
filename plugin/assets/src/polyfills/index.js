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

import { useSelect } from '@wordpress/data';
import '@wordpress/escape-html';
import { __experimentalRichText } from '@wordpress/rich-text';

if (
	window.wp &&
	window.wp.richText &&
	! window.wp.richText.__experimentalRichText
) {
	window.wp.richText.__experimentalRichText = __experimentalRichText;
}

if ( window.wp && window.wp.data && ! window.wp.data.useSelect ) {
	window.wp.data.useSelect = useSelect;
}
