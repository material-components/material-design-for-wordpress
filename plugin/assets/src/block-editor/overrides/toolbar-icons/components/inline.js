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
import { useAnchorRef } from '@wordpress/rich-text';
import { Popover } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { icon as settings } from '../index';
import IconPicker from '../../../components/icon-picker';


function InlineIconUI( { contentRef, onChange, value } ) {
	const anchorRef = useAnchorRef( { ref: contentRef, value, settings } );

	return (
		<Popover
			// value={ value }
			// onClose={ onClose }
			className="components-inline-icon-popover"
			anchorRef={ anchorRef }
			focusOnMount={ false }
			position="bottom center"
		>
			<IconPicker
				currentIcon={ null }
				onChange={ onChange }
				contentRef={ contentRef }
			/>
		</Popover>
	)
}

export default InlineIconUI;
