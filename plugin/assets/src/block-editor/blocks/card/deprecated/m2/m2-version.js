/*
 *  Copyright 2022 Google LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { useBlockProps } from '@wordpress/block-editor';
import VerticalCardLayout from '../../../cards-collection/deprecation/m2/vertical-card-layout';
import HorizontalCardLayout from '../../../cards-collection/deprecation/m2/horizontal-card-layout';

const attributesM2 = {
	contentLayout: {
		type: 'string',
		default: 'text-under-media',
	},
	title: {
		type: 'string',
		default: '',
	},
	displayTitle: {
		type: 'boolean',
		default: true,
	},
	secondaryText: {
		type: 'string',
		default: '',
	},
	displaySecondaryText: {
		type: 'boolean',
		default: true,
	},
	imageSourceUrl: {
		type: 'string',
	},
	isImageEditMode: {
		type: 'boolean',
	},
	displayImage: {
		type: 'boolean',
		default: true,
	},
	supportingText: {
		type: 'string',
		default: '',
	},
	displaySupportingText: {
		type: 'boolean',
		default: true,
	},
	primaryActionButtonLabel: {
		type: 'string',
		default: '',
	},
	primaryActionButtonUrl: {
		type: 'string',
	},
	primaryActionButtonNewTab: {
		type: 'bool',
		default: false,
	},
	primaryActionButtonNoFollow: {
		type: 'bool',
		default: false,
	},
	secondaryActionButtonLabel: {
		type: 'string',
		default: '',
	},
	secondaryActionButtonUrl: {
		type: 'string',
	},
	secondaryActionButtonNewTab: {
		type: 'bool',
		default: false,
	},
	secondaryActionButtonNoFollow: {
		type: 'bool',
		default: false,
	},
	displayActions: {
		type: 'boolean',
		default: true,
	},
	displaySecondaryActionButton: {
		type: 'bool',
		default: false,
	},
	cornerRadius: {
		type: 'number',
	},
	cardStyle: {
		enum: [ 'global', 'elevated', 'outlined' ],
		default: 'global',
		type: 'string',
	},
	imageElement: {
		type: 'boolean',
		default: true,
	},
};

const Save = ( { attributes } ) => {
	const {
		cardLayout = 'vertical',
		contentLayout,
		title,
		displayTitle,
		secondaryText,
		displaySecondaryText,
		imageSourceUrl,
		isImageEditMode,
		displayImage,
		supportingText,
		displaySupportingText,
		primaryActionButtonLabel,
		primaryActionButtonUrl,
		primaryActionButtonNewTab,
		primaryActionButtonNoFollow,
		secondaryActionButtonLabel,
		secondaryActionButtonUrl,
		secondaryActionButtonNewTab,
		secondaryActionButtonNoFollow,
		displayActions,
		displaySecondaryActionButton,
		cardStyle,
		cornerRadius,
		imageElement,
	} = attributes;

	const cardProps = {
		cardIndex: 0,
		contentLayout,
		title,
		displayTitle,
		secondaryText,
		displaySecondaryText,
		imageSourceUrl,
		isImageEditMode,
		displayImage,
		supportingText,
		displaySupportingText,
		primaryActionButtonLabel,
		primaryActionButtonUrl,
		primaryActionButtonNewTab,
		primaryActionButtonNoFollow,
		secondaryActionButtonLabel,
		secondaryActionButtonUrl,
		secondaryActionButtonNewTab,
		secondaryActionButtonNoFollow,
		displayActions,
		displaySecondaryActionButton,
		cardStyle,
		cornerRadius,
		imageElement,
		setter: () => {},
		isEditMode: false,
	};

	const blockProps = useBlockProps.save();

	return (
		<div { ...blockProps }>
			{ cardLayout === 'vertical' && (
				<VerticalCardLayout { ...cardProps } />
			) }
			{ cardLayout === 'horizontal' && (
				<HorizontalCardLayout { ...cardProps } />
			) }
		</div>
	);
};

export const SaveM2 = {
	attributes: attributesM2,
	supports: { align: [ 'left', 'right' ] },
	save: Save,
};
