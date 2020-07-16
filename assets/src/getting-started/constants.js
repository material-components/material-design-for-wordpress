/* global mtbGsm, mtbOnboarding */
import { __ } from '@wordpress/i18n';

export const ACTIONS = {
	NEXT_STEP: 'NEXT_STEP',
	GOTO_STEP: 'GOTO_STEP',
	ERROR: 'ERROR',
	INSTALL_THEME: 'INSTALL_THEME',
	ACTIVATE_THEME: 'ACTIVATE_THEME',
	INSTALL_DEMO_CONTENT: 'INSTALL_DEMO_CONTENT',
};

/**
 * @todo Probably better if we turn these into components like the wizard
 */
export const TABS = {
	WIZARD: {
		title: __( 'Onboarding wizard', 'material-theme-builder' ),
		actionText: __( 'Re-run Wizard', 'material-theme-builder' ),
		link: mtbGsm.wizardUrl,
		icon: 'navigate_next',
		content:
			'Aenean egestas, ante vitae placerat tempor, felis ipsum finibus lectus, at eleifend neque tellus ac elit. Praesent cursus lectus felis, a ornare metus varius in.',
	},
	THEME: {
		title: __( 'Material theme', 'material-theme-builder' ),
		icon: 'ok' !== mtbOnboarding.themeStatus ? 'navigate_next' : null,
		actionText:
			'install' === mtbOnboarding.themeStatus
				? __( 'Install', 'material-theme-builder' )
				: 'activate' === mtbOnboarding.themeStatus
				? __( 'Activate', 'material-theme-builder' )
				: __( 'Activated', 'material-theme-builder' ),
		action:
			'install' === mtbOnboarding.themeStatus
				? ACTIONS.INSTALL_THEME
				: 'activate' === mtbOnboarding.themeStatus
				? ACTIONS.ACTIVATE_THEME
				: '',
		content:
			'Aenean egestas, ante vitae placerat tempor, felis ipsum finibus lectus, at eleifend neque tellus ac elit. Praesent cursus lectus felis, a ornare metus varius in.',
	},
	DEMO: {
		title: __( 'Demo content', 'material-theme-builder' ),
		action: 'ok' !== mtbGsm.contentStatus ? ACTIONS.INSTALL_DEMO_CONTENT : '',
		actionText:
			'ok' !== mtbGsm.contentStatus
				? __( 'Install', 'material-theme-builder' )
				: __( 'Installed', 'material-theme-builder' ),
		icon: 'ok' !== mtbGsm.contentStatus ? 'navigate_next' : null,
		content:
			'Aenean egestas, ante vitae placerat tempor, felis ipsum finibus lectus, at eleifend neque tellus ac elit. Praesent cursus lectus felis, a ornare metus varius in.',
	},
	EDITOR: {
		title: __( 'Material Theme Editor', 'material-theme-builder' ),
		actionText: __( 'Explore', 'material-theme-builder' ),
		icon: 'navigate_next',
		content:
			'Aenean egestas, ante vitae placerat tempor, felis ipsum finibus lectus, at eleifend neque tellus ac elit. Praesent cursus lectus felis, a ornare metus varius in.',
	},
	BLOCKS: {
		title: __( 'Material blocks', 'material-theme-builder' ),
		actionText: __( 'Explore', 'material-theme-builder' ),
		link: mtbGsm.redirect,
		icon: 'navigate_next',
		content:
			'Aenean egestas, ante vitae placerat tempor, felis ipsum finibus lectus, at eleifend neque tellus ac elit. Praesent cursus lectus felis, a ornare metus varius in.',
	},
};
