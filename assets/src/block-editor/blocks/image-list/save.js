/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import Gallery from './components/gallery';

const ImageListSave = ( {
	attributes: {
		images,
		style,
		columns,
		gutter,
		cornerRadius,
		displayLightbox,
		displayCaptions,
		linkTo,
	},
	className,
} ) => (
	<div className={ className }>
		<Gallery
			{ ...{
				images,
				style,
				columns,
				gutter,
				cornerRadius,
				displayCaptions,
				displayLightbox,
				linkTo,
				isSaveContext: true,
			} }
		/>
	</div>
);

export default ImageListSave;
