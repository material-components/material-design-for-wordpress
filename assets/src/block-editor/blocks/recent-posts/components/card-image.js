/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import CardHeader from './card-header';

/**
 * Card Image component.
 *
 * @param {Object} props - Component props.
 * @param {string} props.imageSourceUrl - Image source URL.
 * @param {string} props.type - Media type ('16-9' or 'square').
 * @param {string} props.contentLayout - Content layout ('text-above-media', 'text-over-media' or text-under-media).
 *
 * @return {Function} A functional component.
 */
const CardImage = props => {
	const { imageSourceUrl, type, contentLayout } = props;

	return (
		<div
			className={ classnames(
				`mdc-card__media mdc-card__media--${ type }`,
				'single-post-card__media',
				`single-post-card-with-${ contentLayout }`
			) }
			style={ { backgroundImage: `url(${ imageSourceUrl })` } }
		>
			{ contentLayout === 'text-over-media' && (
				<div className="mdc-card__media-content">
					<CardHeader { ...props } />
				</div>
			) }
		</div>
	);
};

export default CardImage;
