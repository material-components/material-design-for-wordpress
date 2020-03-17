/**
 * Single Image component.
 *
 * @param {Object} props - Component props.
 * @param {string} props.caption - Image caption.
 * @param {string} props.url - Image src URL.
 * @param {string} props.id - WordPress media ID.
 * @param {string} props.link - Link the iamge should point to.
 * @param {number} props.cornerRadius - Corder radius.
 *
 * @return {Function} A functional component.
 */
const Image = ( { caption, url, id, link, cornerRadius, isSaveContext } ) => {
	const style = ! isSaveContext ? { borderRadius: `${ cornerRadius }px` } : {};
	return (
		<img
			className="mdc-image-list__image"
			alt={ caption }
			src={ url }
			data-id={ id }
			data-link={ link }
			style={ { ...style } }
		/>
	);
};

export default Image;
