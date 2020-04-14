/**
 * Internal dependencies
 */
import Gallery from './components/gallery';

/**
 * ImageListSave component.
 *
 * @param {Object} props - Component props.
 * @param {Array} props.attributes.id - ID of the wrapping div.
 * @param {Array} props.attributes.images - List of images in the gallery.
 * @param {string} props.attributes.style - Layout style of the gallery.
 * @param {number} props.attributes.columns - Columns in the gallery.
 * @param {Object} props.attributes.gutter - Column gutter for various devices.
 * @param {number} props.attributes.cornerRadius - Corner radius.
 * @param {boolean} props.attributes.displayCaptions - Display/hide captions.
 * @param {boolean} props.attributes.textProtection - Display/hide captions with text protection.
 * @param {string} props.attributes.linkTo - Image should link to.
 * @param {string} props.className - Class name for the block.
 * @param {number} props.instanceId - Unique instance ID.
 *
 * @return {Function} A functional component.
 */
const ImageListSave = ( {
	attributes: {
		id,
		images,
		style,
		columns,
		gutter,
		cornerRadius,
		displayCaptions,
		textProtection,
		linkTo,
	},
	className,
} ) => (
	<div className={ className } id={ id }>
		<Gallery
			{ ...{
				images,
				style,
				columns,
				gutter,
				cornerRadius,
				displayCaptions,
				textProtection,
				linkTo,
				isSaveContext: true,
			} }
		/>
	</div>
);

export default ImageListSave;
