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
import { select, dispatch } from '@wordpress/data';
import domReady from '@wordpress/dom-ready';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

const targetBlock = 'core/table';

export const isMaterialTableBlock = ( name, attributes ) => {
	return (
		targetBlock === name &&
		attributes &&
		attributes.className &&
		-1 !== attributes.className.indexOf( 'material' )
	);
};

/**
 * Add `Material` style.
 *
 * @param {Object} settings Block settings.
 * @param {string} name     Block name.
 */
export const addMaterialStyle = ( settings, name ) => {
	if ( targetBlock === name ) {
		settings.styles = [
			{
				name: 'material',
				label: __( 'Material', 'material-design' ),
				isDefault: true,
			},
			{
				name: 'regular',
				label: __( 'Regular', 'material-design' ),
			},
			settings.styles[ 1 ],
		];
	}

	return settings;
};

addFilter(
	'blocks.registerBlockType',
	'material/data-table-style',
	addMaterialStyle
);

domReady( () => {
	const stylePreferences = select( 'core/edit-post' ).getPreference(
		'preferredStyleVariations'
	);

	if (
		stylePreferences &&
		( ! stylePreferences[ targetBlock ] ||
			'material' !== stylePreferences[ targetBlock ] )
	) {
		dispatch( 'core/edit-post' ).updatePreferredStyleVariations(
			targetBlock,
			'material'
		);
	}
} );
