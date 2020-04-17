export const inlineFontFamily = font => `'${ font }', sans-serif`;

export const materialIconClass = style =>
	'material-icons' + ( style === 'filled' ? '' : '-' + style );
