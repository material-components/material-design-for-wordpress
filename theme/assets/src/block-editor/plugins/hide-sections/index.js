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
 * Wordpress Dependencies
 */
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { Icon, CheckboxControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { compose, ifCondition } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { useState } from '@wordpress/element';

function HideSection( { settings, updateSectionsSettings } ) {
	/**
	 * If you add a new property here, make sure to also add it
	 * in the "properties" array at block-editor.php.
	 */
	const settingsOptionsInitial = [
		{
			label: __( 'Hide Title', 'material' ),
			key: 'title',
		},
	];

	settingsOptionsInitial.forEach( settingOption => {
		settingOption.value = settings[ settingOption.key ]
			? settings[ settingOption.key ]
			: false;
	} );

	const [ settingsOptions, setSettingOptions ] = useState(
		settingsOptionsInitial
	);

	return (
		<PluginDocumentSettingPanel
			name="sections-control"
			title={ __( 'Hide Sections', 'material' ) }
			className="custom-panel"
		>
			{ settingsOptions.map( settingOption => {
				return (
					<CheckboxControl
						checked={
							settings[ settingOption.key ]
								? settings[ settingOption.key ]
								: false
						}
						onChange={ state => {
							const newSettings = { ...settings };
							newSettings[ settingOption.key ] = state;
							const newSettingsOptions = settingsOptions;
							newSettingsOptions.forEach( newSettingOption => {
								if (
									newSettingOption.key === settingOption.key
								) {
									newSettingOption.value = state;
								}
							} );
							updateSectionsSettings( newSettings );
							setSettingOptions( newSettingsOptions );
						} }
						label={ settingOption.label }
						key={ settingOption.key }
					/>
				);
			} ) }
		</PluginDocumentSettingPanel>
	);
}

const WrappedSectionControl = compose( [
	withSelect( select => {
		const { getCurrentPostType } = select( 'core/editor' );
		const { getPostType } = select( 'core' );
		return {
			postTypeObj: getPostType( getCurrentPostType() ),
		};
	} ),
	ifCondition( ( { postTypeObj } ) => {
		return postTypeObj?.supports?.[ 'custom-fields' ];
	} ),
	withSelect( select => {
		const { getEditedPostAttribute } = select( 'core/editor' );
		return {
			settings: getEditedPostAttribute( 'meta' )[
				'material-hide-sections'
			],
		};
	} ),
	withDispatch( dispatch => {
		return {
			updateSectionsSettings( settings ) {
				dispatch( 'core/editor' ).editPost( {
					meta: { 'material-hide-sections': settings },
				} );
			},
		};
	} ),
	ifCondition( ( { settings } ) => {
		return !! settings;
	} ),
] )( HideSection );

registerPlugin( 'material-hide-sections', {
	render: WrappedSectionControl,
	icon: <Icon icon="admin-customizer" />,
} );
