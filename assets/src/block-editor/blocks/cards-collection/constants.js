/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export const CARD_ATTRIBUTES_VALUE = {
	contentLayout: 'text-under-media',
	title: __( 'Title goes here', 'material-theme-builder' ),
	displayTitle: true,
	secondaryText: __( 'Secondary text', 'material-theme-builder' ),
	displaySecondaryText: true,
	imageSourceUrl: '',
	isImageEditMode: false,
	displayImage: true,
	supportingText: __( 'Supporting text', 'material-theme-builder' ),
	displaySupportingText: true,
	primaryActionButtonLabel: __( 'Button text', 'material-theme-builder' ),
	primaryActionButtonUrl: '',
	primaryActionButtonNewTab: false,
	primaryActionButtonNoFollow: false,
	secondaryActionButtonLabel: __( 'Button text', 'material-theme-builder' ),
	secondaryActionButtonUrl: '',
	secondaryActionButtonNewTab: false,
	secondaryActionButtonNoFollow: false,
	displayActions: true,
	displaySecondaryActionButton: false,
	outlined: false,
	cornerRadius: undefined,
};

export const DEFAULT_NUMBER_OF_CARDS = 2;
export const MIN_NUMBER_OF_CARDS = 1;
export const MAX_NUMBER_OF_CARDS = 20;
