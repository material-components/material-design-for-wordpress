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
import styled, { createGlobalStyle } from 'styled-components';

/**
 * Internal dependencies
 */
import colorUtils from '../../../common/color-utils';

export const Overrides = createGlobalStyle`
	:root {
		--md-sys-typescale-headline-large-font: ${ props => props.headline };
		--md-sys-typescale-headline-medium-font: ${ props => props.headline };
		--md-sys-typescale-headline-small-font: ${ props => props.headline };
		--md-sys-typescale-body-large-font: ${ props => props.body };
		--md-sys-typescale-body-medium-font: ${ props => props.body };
		--md-sys-typescale-body-small-font: ${ props => props.body };
		--md-sys-typescale-display-large-font: ${ props => props.display };
		--md-sys-typescale-display-medium-font: ${ props => props.display };
		--md-sys-typescale-display-small-font: ${ props => props.display };
		--md-sys-typescale-label-large-font: ${ props => props.label };
		--md-sys-typescale-label-medium-font: ${ props => props.label };
		--md-sys-typescale-label-small-font: ${ props => props.label };
		--md-sys-typescale-title-large-font: ${ props => props.title };
		--md-sys-typescale-title-medium-font: ${ props => props.title };
		--md-sys-typescale-title-small-font: ${ props => props.title };

		--md-sys-color-primary: ${ props => props.primaryColor };
		--mdc-theme-secondary: ${ props => props.secondaryColor };
		--md-sys-color-on-primary: ${ props => props.onPrimaryColor };
		--mdc-theme-on-secondary: ${ props => props.onSecondaryColor };
		--md-sys-color-surface: ${ props => props.surfaceColor };
		--md-sys-color-on-surface: ${ props => props.onSurfaceColor };
		--md-sys-color-on-surface-rgb: ${ props =>
			colorUtils.hexToRgbValues( props.onSurfaceColor ).join( ',' ) };
		--mdc-theme-surface-mix-4: ${ props => props.surfaceColorMix4 };
		--mdc-theme-surface-mix-12: ${ props => props.surfaceColorMix12 };
		--md-sys-color-background: ${ props => props.backgroundColor };
		--md-sys-color-on-background: ${ props => props.onBackgroundColor };
		--md-sys-color-on-background-rgb: ${ props =>
			colorUtils.hexToRgbValues( props.onBackgroundColor ).join( ',' ) };

		--mdc-icons-font-family: ${ props => props.iconCollection };

		--md-sys-color-on-surface-variant: rgba(--md-sys-color-on-background-rgb, 0.87);
		--mdc-theme-text-secondary-on-background: rgba(--md-sys-color-on-background-rgb, 0.54);
		--mdc-theme-text-hint-on-background: rgba(--md-sys-color-on-background-rgb, 0.38);
		--mdc-theme-text-disabled-on-background: rgba(--md-sys-color-on-background-rgb, 0.38);
		--mdc-theme-text-icon-on-background: rgba(--md-sys-color-on-background-rgb, 0.38);
	}

	#mcb-material-library-preview .{
		font-family: var(--heading-font) !important;
	}

	#mcb-material-library-preview .mdc-text-field--focused .mdc-floating-label {
		color: var(--md-sys-color-primary) !important;
	}

	#mcb-material-library-preview p,
	#mcb-material-library-preview th,
	#mcb-material-library-preview td,
	#mcb-material-library-preview input[type="text"],
	#mcb-material-library-preview button:not([class*="material-icons"]),
	#mcb-material-library-preview span:not([class*="material-icons"]) {
		font-family: var(--md-sys-typescale-body-large-font) !important;
		font-size: 16px;
	}

	#mcb-material-library-preview h1,
	#mcb-material-library-preview h2,
	#mcb-material-library-preview h3,
	#mcb-material-library-preview h4 {
		color: var(--md-sys-color-on-background) !important;
		font-family: var(--md-sys-typescale-title-large-font);
	}

	#mcb-material-library-preview .mdc-list-item__secondary-text {
		font-size: .875rem !important;
	}

	#mcb-material-library-preview hr {
		border-color: var(--md-sys-color-on-surface, #000);
	}

	#material-library-preview {
		h4, form, button {
			display: inline-block;
			button {
				color: var(--md-sys-color-on-background) !important;
				vertical-align: sub;
			}
		}
	}
`;

export const RippleColor = styled.div`
	[class*='__ripple']::before {
		background-color: ${ props => props.primaryColor } !important;
	}
`;
