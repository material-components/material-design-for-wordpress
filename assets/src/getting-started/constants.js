import { __ } from '@wordpress/i18n';

export const ACTIONS = {
	NEXT_STEP: 'NEXT_STEP',
	GOTO_STEP: 'GOTO_STEP',
	MARK_COMPLETE: 'MARK_COMPLETE',
	ERROR: 'ERROR',
	SET_THEME_OK: 'SET_THEME_OK',
	SET_DEMO_OK: 'SET_DEMO_OK',
	INSTALL_THEME: 'INSTALL_THEME',
	ACTIVATE_THEME: 'ACTIVATE_THEME',
	INSTALL_DEMO_CONTENT: 'INSTALL_DEMO_CONTENT',
	THEME_INSTALLED: 'THEME_INSTALLED',
	DEMO_INSTALLED: 'DEMO_INSTALLED',
};

/**
 * @todo Probably better if we turn these into components like the wizard
 */
export const TABS = {
	WIZARD: __( 'Quick Start', 'material-theme-builder' ),
	OVERVIEW: __( 'Overview', 'material-theme-builder' ),
	CUSTOMIZE: __( 'Customize your Theme', 'material-theme-builder' ),
	LAYOUT: __( 'Layout Settings', 'material-theme-builder' ),
};
