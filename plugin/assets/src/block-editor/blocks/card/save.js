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
 * Internal dependencies
 */
import './style.css';
import VerticalCardLayout from './components/vertical-card-layout';
import HorizontalCardLayout from './components/horizontal-card-layout';

/**
 * Card Save component.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.attributes - Block attributes.
 * @param {string} props.className - Block classes.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Save = ( { attributes, className } ) => {
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
		outlined,
		cornerRadius,
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
		outlined,
		cornerRadius,
		setter: () => {},
		isEditMode: false,
	};

	return (
		<div className={ className }>
			{ cardLayout === 'vertical' && <VerticalCardLayout { ...cardProps } /> }
			{ cardLayout === 'horizontal' && (
				<HorizontalCardLayout { ...cardProps } />
			) }
		</div>
	);
};

export default Save;
