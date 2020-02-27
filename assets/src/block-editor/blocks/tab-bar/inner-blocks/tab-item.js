/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
// import { Toolbar } from '@wordpress/components';
// import { BlockControls } from '@wordpress/block-editor';

export const name = 'tab-item';

export const settings = {
	title: __( 'Tab Item', 'material-theme-builder' ),
	category: 'material',
	icon: <i className="material-icons">tab</i>,
	parent: [ 'material/tab-bar' ],
	attributes: {
		label: {
			type: 'string',
			default: 'Tab',
		},
	},
	supports: {
		inserter: false,
		alignWide: false,
	},
	edit( { attributes: { label }, isSelected } ) {
		return (
			<>
				<div
					className={ classNames( 'mdc-tab', {
						'mdc-tab--active': isSelected,
					} ) }
				>
					<span className="mdc-tab__content">
						<span className="mdc-tab__icon material-icons" aria-hidden="true">
							favorite
						</span>
						<span
							className="mdc-tab__text-label"
							contentEditable
							suppressContentEditableWarning
						>
							{ label }
						</span>
					</span>
					<span className="mdc-tab-indicator mdc-tab-indicator--active">
						<span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
					</span>
				</div>
			</>
		);
	},
};
