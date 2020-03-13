/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { LEFT, RIGHT, BACKSPACE, DELETE } from '@wordpress/keycodes';

const Image = ( { caption, url, id, link, cornerRadius } ) => {
	return (
		<img
			className="mdc-image-list__image"
			alt={ caption }
			src={ url }
			data-id={ id }
			data-link={ link }
			style={ { borderRadius: `${ cornerRadius }px` } }
		/>
	);
};

const Gallery = ( {
	images,
	style,
	columns,
	gutter,
	cornerRadius,
	aspectRatio,
	displayCaptions,
	textProtection,
	selectedImage,
	onRemove,
	onMove,
	onSelect,
	isSaveContext = false,
} ) => {
	const wrapStyles =
		'masonry' === style
			? {
					columnCount: columns,
					columnGap: `${ gutter }px`,
			  }
			: {};

	const itemStyles =
		'masonry' !== style
			? {
					width: `calc(100% / ${ columns } - ${ gutter + 1 / columns }px)`,
					margin: `${ gutter / 2 }px`,
			  }
			: {
					marginBottom: `${ gutter / 2 }px`,
			  };

	const aspectStyles =
		'grid' === style
			? {
					paddingBottom: `${ aspectRatio }%`,
			  }
			: {};
	console.log( aspectStyles );
	/**
	 * Interprets keypress event intent to remove or move an image.
	 *
	 * @param {KeyboardEvent} event Keydown event.
	 * @param {number} imageId Id of the Image.
	 */
	const onKeyPress = ( event, imageId ) => {
		const { keyCode } = event;

		switch ( keyCode ) {
			case LEFT:
				event.preventDefault();
				onMove( imageId, 'left' );
				break;
			case RIGHT:
				event.preventDefault();
				onMove( imageId, 'right' );
				break;
			case BACKSPACE:
			case DELETE:
				event.preventDefault();
				onRemove( imageId );
				break;
		}
	};

	return (
		<ul
			className={ classNames( 'mdc-image-list', {
				'mdc-image-list--masonry': 'masonry' === style,
				'mdc-image-list--with-text-protection': textProtection,
			} ) }
			style={ wrapStyles }
		>
			{ images.map( image => (
				<li
					key={ image.id }
					className={ classNames( 'mdc-image-list__item', {
						'is-selected': ! isSaveContext && selectedImage === image.id,
					} ) }
					style={ itemStyles }
					role="presentation"
					onClick={ () => onSelect( image.id ) }
					onKeyPress={ event => onKeyPress( event, image.id ) }
				>
					<a
						className="mdc-image-list__item-wrap"
						href={ isSaveContext ? image.link : '#' }
					>
						{ 'masonry' !== style ? (
							<div
								className="mdc-image-list__image-aspect-container"
								style={ aspectStyles }
							>
								<Image { ...image } cornerRadius={ cornerRadius } />
							</div>
						) : (
							<Image { ...image } cornerRadius={ cornerRadius } />
						) }

						{ displayCaptions && '' !== image.caption && (
							<div className="mdc-image-list__supporting">
								<span className="mdc-image-list__label">{ image.caption }</span>
							</div>
						) }

						{ ! isSaveContext && (
							<div className="move-image">
								<button
									title={ __( 'Move left', 'material-theme-builder' ) }
									onClick={ () => onMove( image.id, 'left' ) }
								>
									<i className="material-icons">arrow_left</i>
								</button>
								<button
									title={ __( 'Move right', 'material-theme-builder' ) }
									onClick={ () => onMove( image.id, 'right' ) }
								>
									<i className="material-icons">arrow_right</i>
								</button>
							</div>
						) }

						{ ! isSaveContext && (
							<div className="remove-image">
								<button
									title={ __( 'Remove image', 'material-theme-builder' ) }
									onClick={ () => onRemove( image.id ) }
								>
									<i className="material-icons">close</i>
								</button>
							</div>
						) }
					</a>
				</li>
			) ) }
		</ul>
	);
};

export default Gallery;
