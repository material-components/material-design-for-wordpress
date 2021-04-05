/**
 * WordPress dependencies
 */
import { useContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import SettingsContext from '../context';

const Errors = () => {
	const { state } = useContext( SettingsContext );

	return Object.keys( state.errors ).map( key => (
		<div
			key={ key }
			className="material-settings__message material-settings__message--error"
		>
			<i
				className="material-icons mdc-button__icon leading-icon"
				aria-hidden="true"
			>
				error
			</i>
			<span className="material-settings__message-text">
				{ state.errors[ key ] }
			</span>
		</div>
	) );
};

export default Errors;
