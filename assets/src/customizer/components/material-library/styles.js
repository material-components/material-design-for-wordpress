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
    	--body-font: ${ props => props.body };
    	--heading-font: ${ props => props.headings };

		--mdc-theme-primary: ${ props => props.primaryColor };
		--mdc-theme-secondary: ${ props => props.secondaryColor };
		--mdc-theme-on-primary: ${ props => props.onPrimaryColor };
		--mdc-theme-on-secondary: ${ props => props.onSecondaryColor };
		--mdc-theme-surface: ${ props => props.surfaceColor };
		--mdc-theme-on-surface: ${ props => props.onSurfaceColor };
		--mdc-theme-on-surface-rgb: ${ props =>
			colorUtils.hexToRgb( props.onSurfaceColor ).join( ',' ) };
		--mdc-theme-surface-mix-4: ${ props => props.surfaceColorMix4 };
		--mdc-theme-surface-mix-12: ${ props => props.surfaceColorMix12 };
		--mdc-theme-background: ${ props => props.backgroundColor };
		--mdc-theme-on-background: ${ props => props.onBackgroundColor };
		--mdc-theme-on-background-rgb: ${ props =>
			colorUtils.hexToRgb( props.onBackgroundColor ).join( ',' ) };

		--mdc-icons-font-family: ${ props => props.iconCollection };

		--mdc-theme-text-primary-on-background: rgba(--mdc-theme-on-background-rgb, 0.87);
		--mdc-theme-text-secondary-on-background: rgba(--mdc-theme-on-background-rgb, 0.54);
		--mdc-theme-text-hint-on-background: rgba(--mdc-theme-on-background-rgb, 0.38);
		--mdc-theme-text-disabled-on-background: rgba(--mdc-theme-on-background-rgb, 0.38);
		--mdc-theme-text-icon-on-background: rgba(--mdc-theme-on-background-rgb, 0.38);
	}

	#mcb-material-library-preview .mdc-typography {
		font-family: var(--heading-font) !important;
	}

	#mcb-material-library-preview .mdc-text-field--focused .mdc-floating-label {
		color: var(--mdc-theme-primary) !important;
	}

	#mcb-material-library-preview p,
	#mcb-material-library-preview th,
	#mcb-material-library-preview td,
	#mcb-material-library-preview input[type="text"],
	#mcb-material-library-preview button:not([class*="material-icons"]),
	#mcb-material-library-preview span:not([class*="material-icons"]) {
		font-family: var(--body-font) !important;
		font-size: 16px;
	}

	#mcb-material-library-preview h1,
	#mcb-material-library-preview h2,
	#mcb-material-library-preview h3,
	#mcb-material-library-preview h4 {
		color: var(--mdc-theme-on-background) !important;
		font-family: var(--heading-font);
	}

	#mcb-material-library-preview .mdc-list-item__secondary-text {
		font-size: .875rem !important;
	}

	#mcb-material-library-preview hr {
		border-color: rgba(var(--mdc-theme-on-surface-rgb, 0, 0, 0), .12);
	}

	#material-library-preview {
		h4, form, button {
			display: inline-block;
			button {
				color: var(--mdc-theme-on-background) !important;
				vertical-align: sub;
			}
		}
	}
`;

export const RippleColor = styled.div`
	[class*='__ripple']::before {
		background-color: ${props => props.primaryColor} !important;
	}
`;
