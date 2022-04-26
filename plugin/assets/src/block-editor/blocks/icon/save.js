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
import classNames from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';

const IconSave = ( {
	attributes: { icon, textColor, customSize, iconSize, align },
	className,
} ) => {
	const style = { ...( textColor ? { color: textColor } : {} ) };
	const isCustom = 'custom' === iconSize;
	if ( isCustom ) {
		style.fontSize = `${ customSize }px`;
	}
	const blockProps = useBlockProps.save( {
		className: classNames( className, {
			[ `has-text-align-${ align }` ]: align,
		} ),
	} );
	return (
		<div { ...blockProps }>
			<i
				className={ classNames( 'material-icons', {
					[ `md-${ iconSize }` ]: ! isCustom,
				} ) }
				style={ style }
			>
				{ icon }
			</i>
		</div>
	);
};

export default IconSave;
