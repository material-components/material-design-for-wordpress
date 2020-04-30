/* eslint-disable jsx-a11y/no-static-element-interactions */
/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const Tab = ( {
	icon,
	label,
	active,
	onInput,
	onChange,
	onDelete,
	iconPosition,
	index,
	frontend = false,
} ) => {
	return (
		<div
			role="tab"
			tabIndex={ 0 }
			onClick={ onChange }
			onFocus={ onChange }
			className={ classNames( 'mdc-tab', 'tab', {
				'mdc-tab--active': active,
				'mdc-tab--stacked': icon && iconPosition === 'above',
			} ) }
		>
			<span className="mdc-tab__content">
				{ icon && iconPosition !== 'none' && (
					<i className="material-icons mdc-tab__icon">
						{ String.fromCharCode( icon?.hex ) }
					</i>
				) }

				<span className="mdc-tab__text-label tab__label-field">
					{ frontend ? (
						<span role="tab" tabIndex={ 0 }>
							{ label }
						</span>
					) : (
						<RichText
							tagName={ 'span' }
							placeholder={ __( 'Title', 'material-theme-builder' ) }
							value={ label }
							onChange={ value => onInput( value, index ) }
							withoutInteractiveFormatting
							allowedFormats={ [] }
						/>
					) }
				</span>
			</span>
			<span
				className={ classNames( 'mdc-tab-indicator', {
					'mdc-tab-indicator--active': active,
				} ) }
			>
				<span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
			</span>
			<span className="mdc-tab__ripple"></span>
			{ ! frontend && (
				<button className="material-icons tab__delete" onClick={ onDelete }>
					cancel
				</button>
			) }
		</div>
	);
};
class TabSchema {
	constructor( { label, icon, content = null } ) {
		this.label = label;
		this.icon = icon;
		this.content = content;
	}
}

export { Tab, TabSchema };
