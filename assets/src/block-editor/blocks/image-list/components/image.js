/**
 * Single Image component.
 *
 * @param {Object} props - Component props.
 * @param {string} props.alt - Image alt text.
 * @param {string} props.caption - Image caption.
 * @param {string} props.url - Image src URL.
 * @param {string} props.id - WordPress media ID.
 * @param {string} props.link - Link the image should point to.
 * @param {number} props.cornerRadius - Corner radius.
 * @param {boolean} props.isSaveContext - Determine if this is save context.
 *
 * @return {Function} A functional component.
 */
const Image = ( {
	alt,
	caption,
	url,
	id,
	link,
	cornerRadius,
	isSaveContext,
} ) => {
	const style = ! isSaveContext ? { borderRadius: `${ cornerRadius }px` } : {};
	return (
		<img
			className="mdc-image-list__image"
			alt={ alt || caption }
			src={ url }
			data-id={ id }
			data-link={ link }
			style={ { ...style } }
		/>
	);
};

export default Image;
