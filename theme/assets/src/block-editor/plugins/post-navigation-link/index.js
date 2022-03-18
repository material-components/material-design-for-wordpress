/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	PanelRow,
	Button,
	ButtonGroup,
} from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { InspectorControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import { chevronLeft, chevronRight } from '@wordpress/icons';
import Edit from './edit';
import genericAttributesSetter from '../../../../../../plugin/assets/src/block-editor/utils/generic-attributes-setter';

const targetBlock = 'core/post-navigation-link';

// Add additional attributes to Cover block.
const overrideAttributes = ( settings, name ) => {
	if ( targetBlock === name ) {
		if ( ! settings.attributes ) {
			settings.attributes = {};
		}

		settings.attributes.position = {
			type: 'string',
			default: 'before',
		};
	}

	return settings;
};

addFilter(
	'blocks.registerBlockType',
	targetBlock + '/attributes',
	overrideAttributes
);

// Add inspector controls to Cover block.
const editElement = createHigherOrderComponent(
	BlockEdit => props => {
		if ( props.name !== targetBlock ) {
			return <BlockEdit { ...props } />;
		}

		const { attributes, setAttributes } = props;

		const onChangePosition = genericAttributesSetter( setAttributes )(
			'position'
		);
		return (
			<>
				<Edit { ...props } />
				<InspectorControls>
					<PanelBody
						title={ __(
							'Label position',
							'material-design-google'
						) }
						initialOpen
					>
						<PanelRow>
							<ButtonGroup>
								<Button
									variant={
										attributes.position === 'before'
											? 'primary'
											: undefined
									}
									icon={ chevronLeft }
									onClick={ () => {
										console.log( 'before' );
										onChangePosition( 'before' );
									} }
									label={ __(
										'Before',
										'material-design-google'
									) }
								>
									{ __( 'Before', 'material-design-google' ) }
								</Button>
								<Button
									variant={
										attributes.position === 'after'
											? 'primary'
											: undefined
									}
									icon={ chevronRight }
									onClick={ () => {
										console.log( 'after' );
										onChangePosition( 'after' );
									} }
									label={ __(
										'After',
										'material-design-google'
									) }
								>
									{ __( 'After', 'material-design-google' ) }
								</Button>
							</ButtonGroup>
						</PanelRow>
					</PanelBody>
				</InspectorControls>
			</>
		);
	},
	'withInspectorControl'
);

addFilter( 'editor.BlockEdit', targetBlock + '/settings', editElement );
