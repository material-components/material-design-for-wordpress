/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { STYLES_MAP } from './button';

const ButtonSave = ( { attributes: { label, url, style }, className } ) => {
	return (
		<div className={ className }>
			<a
				href={ url }
				className={ classNames( 'mdc-button', {
					[ `mdc-button--${ STYLES_MAP[ style ] }` ]: true,
				} ) }
			>
				<div className="mdc-button__ripple"></div>
				<span className="mdc-button__label">{ label }</span>
			</a>
		</div>
	);
};

export default ButtonSave;
