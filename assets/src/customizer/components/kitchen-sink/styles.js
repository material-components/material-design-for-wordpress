import styled, { createGlobalStyle } from 'styled-components';

export const GlobalFonts = createGlobalStyle`
  :root {
    --body-font: ${ props => props.body };
    --heading-font: ${ props => props.headings };
  }

  #mcb-kitchen-sink-preview p, 
  #mcb-kitchen-sink-preview span {
    font-family: var(--body-font) !important;
  }
`;

export const RippleColor = styled.div`
	--mdc-theme-primary: ${props => props.primaryColor};
	--mdc-theme-secondary: ${props => props.secondaryColor};
	--mdc-theme-on-primary: ${props => props.primaryTextColor};
	--mdc-theme-on-secondary: ${props => props.secondaryTextColor};

	[class*='__ripple']::before {
		background-color: ${props => props.primaryColor} !important;
	}
`;

export const H1 = styled.h1`
	font-family: var( --heading-font );
	font-size: 4rem;
`;

export const H2 = styled.h2`
	font-family: var( --heading-font );
	font-size: 2.5rem;
`;

export const H3 = styled.h3`
	font-family: var( --heading-font );
	font-size: 1.7rem;
`;
