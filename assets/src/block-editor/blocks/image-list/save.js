/**
 * Wordpress dependencies
 */
import { withInstanceId } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import Gallery from './components/gallery';

/**
 * ImageListSave component.
 *
 * @param {Object} props - Component props.
 * @param {Array} props.id - ID of the wrapping div.
 * @param {Array} props.images - List of images in the gallery.
 * @param {string} props.style - Layout style of the gallery.
 * @param {number} props.columns - Columns in the gallery.
 * @param {Object} props.gutter - Column gutter for various devices.
 * @param {number} props.cornerRadius - Corder radius.
 * @param {boolean} props.displayLightbox - Display/hide captions.
 * @param {boolean} props.displayCaptions - Display/hide captions.
 * @param {boolean} props.textProtection - Display/hide captions with text protection.
 * @param {string} props.linkTo - Image should link to.
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
		displayLightbox,
		displayCaptions,
		textProtection,
		linkTo,
	},
	className,
	instanceId,
} ) => (
	<div
		className={ className }
		id={ id || `block-material-image-list-${ instanceId }` }
	>
		<Gallery
			{ ...{
				images,
				style,
				columns,
				gutter,
				cornerRadius,
				displayCaptions,
				displayLightbox,
				textProtection,
				linkTo,
				isSaveContext: true,
			} }
		/>
	</div>
);

export default withInstanceId( ImageListSave );
