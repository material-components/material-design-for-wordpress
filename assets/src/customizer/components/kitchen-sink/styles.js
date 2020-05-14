import styled, { createGlobalStyle } from 'styled-components';
import colorUtils from '../../../common/color-utils';

export const Overrides = createGlobalStyle`
	:root {
    	--body-font: ${ props => props.body };
    	--heading-font: ${ props => props.headings };

		--mdc-theme-primary: ${ props => props.primaryColor };
		--mdc-theme-secondary: ${ props => props.secondaryColor };
		--mdc-theme-on-primary: ${ props => props.primaryTextColor };
		--mdc-theme-on-secondary: ${ props => props.secondaryTextColor };
		--mdc-theme-surface: ${ props => props.surfaceColor };
		--mdc-theme-on-surface: ${ props => props.surfaceTextColor };
		--mdc-theme-on-surface-rgb: ${ props =>
			colorUtils.hexToRgb( props.surfaceTextColor ).join( ',' ) };
		--mdc-theme-surface-mix-4: ${ props => props.surfaceColorMix4 };
		--mdc-theme-surface-mix-12: ${ props => props.surfaceColorMix12 };
		--mdc-theme-background: ${ props => props.backgroundColor };
		--mdc-theme-on-background: ${ props => props.backgroundTextColor };
		--mdc-theme-on-background-rgb: ${ props =>
			colorUtils.hexToRgb( props.backgroundTextColor ).join( ',' ) };

		--mdc-icons-font-family: ${ props => props.iconCollection };

		--mdc-theme-text-primary-on-background: rgba(--mdc-theme-on-background-rgb, 0.87);
		--mdc-theme-text-secondary-on-background: rgba(--mdc-theme-on-background-rgb, 0.54);
		--mdc-theme-text-hint-on-background: rgba(--mdc-theme-on-background-rgb, 0.38);
		--mdc-theme-text-disabled-on-background: rgba(--mdc-theme-on-background-rgb, 0.38);
		--mdc-theme-text-icon-on-background: rgba(--mdc-theme-on-background-rgb, 0.38);
	}

	#mcb-kitchen-sink-preview .mdc-typography {
		font-family: var(--heading-font) !important;
	}

	#mcb-kitchen-sink-preview .mdc-text-field--focused .mdc-floating-label {
		color: var(--mdc-theme-primary) !important;
	}

	#mcb-kitchen-sink-preview p,
	#mcb-kitchen-sink-preview th,
	#mcb-kitchen-sink-preview td,
	#mcb-kitchen-sink-preview input[type="text"],
	#mcb-kitchen-sink-preview button:not([class*="material-icons"]),
	#mcb-kitchen-sink-preview span:not([class*="material-icons"]) {
		font-family: var(--body-font) !important;
		font-size: 16px;
	}

	#mcb-kitchen-sink-preview h1,
	#mcb-kitchen-sink-preview h2,
	#mcb-kitchen-sink-preview h3,
	#mcb-kitchen-sink-preview h4 {
		color: var(--mdc-theme-on-background) !important;
		font-family: var(--heading-font);
	}

	#mcb-kitchen-sink-preview hr {
		border-color: rgba(var(--mdc-theme-on-surface-rgb, 0, 0, 0), .12);
	}
`;

export const RippleColor = styled.div`
	[class*='__ripple']::before {
		background-color: ${props => props.primaryColor} !important;
	}
`;
