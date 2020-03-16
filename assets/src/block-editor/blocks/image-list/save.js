/**
 * Wordpress dependencies
 */
import { withInstanceId } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import Gallery from './components/gallery';

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
				linkTo,
				isSaveContext: true,
			} }
		/>
	</div>
);

export default withInstanceId( ImageListSave );
