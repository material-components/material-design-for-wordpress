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
import { createHigherOrderComponent } from '@wordpress/compose';
import { select, dispatch } from '@wordpress/data';
import domReady from '@wordpress/dom-ready';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import DataTableSave from './save';
import DataTableEdit from './edit';

export const isMaterialTableBlock = ( name, attributes ) => {
	return (
		'core/table' === name &&
		attributes &&
		attributes.className &&
		-1 !== attributes.className.indexOf( 'material' )
	);
};

/**
 * Maybe use material data table edit component.
 *
 * @param {WPElement} element    Block save result.
 * @param {WPBlock}   blockType  Block type definition.
 * @param {Object}    attributes Block attributes.
 */
export const withDataTableEdit = createHigherOrderComponent( BlockEdit => {
	return props => {
		if ( isMaterialTableBlock( props.name, props.attributes ) ) {
			return (
				<>
					<DataTableEdit { ...props } />
				</>
			);
		}

		return <BlockEdit { ...props } />;
	};
}, 'withMaterialDataTableEdit' );

/**
 * Maybe use material data table save component.
 *
 * @param {WPElement} element    Block save result.
 * @param {WPBlock}   blockType  Block type definition.
 * @param {Object}    attributes Block attributes.
 */
export const save = ( element, blockType, attributes ) => {
	if ( isMaterialTableBlock( blockType.name, attributes ) ) {
		return <DataTableSave { ...{ attributes } } />;
	}

	return element;
};

/**
 * Add `Material` style.
 *
 * @param {Object} settings Block settings.
 * @param {string} name     Block name.
 */
export const addMaterialStyle = ( settings, name ) => {
	if ( 'core/table' === name ) {
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

addFilter(
	'editor.BlockEdit',
	'material/data-table-edit',
	withDataTableEdit,
	1
);

addFilter( 'blocks.getSaveElement', 'material/data-table-save', save );

domReady( () => {
	const stylePreferences = select( 'core/edit-post' ).getPreference(
		'preferredStyleVariations'
	);

	if (
		stylePreferences &&
		( ! stylePreferences[ 'core/table' ] ||
			'material' !== stylePreferences[ 'core/table' ] )
	) {
		dispatch( 'core/edit-post' ).updatePreferredStyleVariations(
			'core/table',
			'material'
		);
	}
} );
