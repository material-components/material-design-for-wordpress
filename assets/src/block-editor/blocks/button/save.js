/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

const ButtonSave = ( { attributes: { label, url, style }, className } ) => (
	<div className={ className }>
		<a
			href={ url }
			className={ classNames( 'mdc-button', {
				[ `mdc-button--${ style }` ]: true,
			} ) }
		>
			<div className="mdc-button__ripple"></div>
			<span className="mdc-button__label">
				{ label ?? __( 'BUTTON TEXT', 'material-theme-builder' ) }
			</span>
		</a>
	</div>
);

export default ButtonSave;
