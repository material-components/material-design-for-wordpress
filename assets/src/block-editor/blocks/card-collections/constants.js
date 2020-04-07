/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export const CARD_ATTRIBUTES_VALUE = {
	contentLayout: 'text-under-media',
	title: '',
	displayTitle: true,
	secondaryText: '',
	displaySecondaryText: true,
	imageSourceUrl: '',
	imageEditMode: false,
	displayImage: true,
	supportingText: '',
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
	cornerRadius: 4,
};

export const DEFAULT_NUMBER_OF_CARDS = 2;
export const MIN_NUMBER_OF_CARDS = 1;
export const MAX_NUMBER_OF_CARDS = 20;
