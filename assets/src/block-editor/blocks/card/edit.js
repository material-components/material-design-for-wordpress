/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { BlockControls } from '@wordpress/block-editor';
import { Toolbar } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './stlye.css';
import './editor.css';
import genericAttributesSetter from '../../utils/generic-attributes-setter';
import CardInspectorControls from './components/inspector-controls';
import CardImage from './components/card-image';
import CardPrimary from './components/card-primary';
import CardSecondaryText from './components/card-secondary-text';
import CardActions from './components/card-actions';

/**
 * Card Edit component.
 *
 * @param {Object} props - Component props.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Edit = props => {
	const { attributes, setAttributes, className, isSelected } = props;
	const {
		contentLayout,
		title,
		displayTitle,
		subTitle,
		displaySubTitle,
		imageSourceUrl,
		imageEditMode,
		displayImage,
		secondaryText,
		displaySecondaryText,
		buttonActionText,
		buttonActionUrl,
		buttonActionNewTab,
		buttonActionNoFollow,
		displayActions,
		outlined,
		cornerRadius,
	} = attributes;

	const setter = genericAttributesSetter( setAttributes );

	const cardPrimaryProps = {
		title,
		displayTitle,
		subTitle,
		displaySubTitle,
		setter,
	};

	const cardImageProps = {
		imageSourceUrl,
		imageEditMode,
		contentLayout,
		cardPrimaryProps,
		setAttributes,
	};

	return (
		<>
			<CardInspectorControls { ...props } />
			<BlockControls>
				<Toolbar
					controls={ [
						{
							icon: 'edit',
							title: __( 'Edit Image', 'material-theme=builder' ),
							onClick: setter( 'imageEditMode', () => ! imageEditMode ),
							isActive: imageEditMode,
						},
					] }
				/>
			</BlockControls>
			<div
				className={ classnames(
					'mdc-card',
					'mtb-card',
					{ 'mdc-card--outlined': outlined },
					className
				) }
				style={ {
					...( cornerRadius !== undefined
						? { borderRadius: `${ cornerRadius }px` }
						: {} ),
				} }
			>
				<div
					className="mdc-card__primary-action mtb-card__primary-action mdc-ripple-upgraded"
					tabIndex={ 0 }
				>
					{ contentLayout === 'text-above-media' && (
						<CardPrimary { ...cardPrimaryProps } />
					) }

					{ contentLayout === 'text-over-media' &&
						displayImage &&
						! imageSourceUrl && <CardPrimary { ...cardPrimaryProps } /> }

					{ contentLayout === 'text-over-media' && ! displayImage && (
						<CardPrimary { ...cardPrimaryProps } />
					) }

					{ displayImage && <CardImage { ...cardImageProps } /> }

					{ contentLayout === 'text-under-media' && (
						<CardPrimary { ...cardPrimaryProps } />
					) }

					{ displaySecondaryText && (
						<CardSecondaryText
							secondaryText={ secondaryText }
							contentLayout={ contentLayout }
							setter={ setter }
						/>
					) }
				</div>
				{ displayActions && (
					<CardActions
						buttonActionText={ buttonActionText }
						buttonActionUrl={ buttonActionUrl }
						buttonActionNewTab={ buttonActionNewTab }
						buttonActionNoFollow={ buttonActionNoFollow }
						isSelected={ isSelected }
						setter={ setter }
					/>
				) }
			</div>
		</>
	);
};

export default Edit;
