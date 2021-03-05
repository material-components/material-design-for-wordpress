/**
 * External dependencies
 */
import _uniqueId from 'lodash/uniqueId';
import { MDCSwitch } from '@material/switch';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';

const Updater = ( { title, disabled, lastUpdated, needsKey } ) => {
	const [ id ] = useState( _uniqueId( 'updater-' ) );
	const isDisabled = disabled || needsKey;

	useEffect( () => {
		const switches = document.querySelectorAll( '.mdc-switch' );

		switches.forEach( item => new MDCSwitch( item ) );
	}, [] );

	return (
		<div className="material-settings__updater">
			<div className="mdc-layout-grid">
				<div className="mdc-layout-grid__inner">
					<div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-8 mdc-layout-grid__cell--align-middle">
						<h3 className="mdc-typography--headline6">{ title }</h3>

						{ isDisabled && (
							<p
								className="mdc-typography--body1"
								dangerouslySetInnerHTML={ {
									__html: sprintf(
										__(
											'To enable Google Fonts updates please %s first',
											'material-design'
										),
										`<a href="http://google.com">${ __(
											'activate Google API Key',
											'material-design'
										) }</a>`
									),
								} }
							></p>
						) }

						{ ! isDisabled && (
							<p className="mdc-typography--body1">{ lastUpdated }</p>
						) }
					</div>

					<div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-2 mdc-layout-grid__cell--align-middle material-settings__cell--justify-end">
						<div className="material-settings__switch">
							<div className="mdc-switch material-wizard-switch">
								<div className="mdc-switch__track"></div>
								<div className="mdc-switch__thumb-underlay">
									<div className="mdc-switch__thumb"></div>
									<input
										type="checkbox"
										id={ id }
										className="mdc-switch__native-control"
										role="switch"
										aria-checked="true"
									/>
								</div>
							</div>
							<label id={ `label-${ id }` } htmlFor={ id }>
								{ __( 'Auto-updates enabled', 'material-design' ) }
							</label>
						</div>
					</div>

					<div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-2 mdc-layout-grid__cell--align-middle material-settings__cell--justify-end">
						{ isDisabled && __( 'Updates disabled', 'material-design' ) }

						{ ! disabled && (
							<button className="mdc-button mdc-button--raised">
								<i className="material-icons mdc-button__icon leading-icon">
									cached
								</i>
								<span className="mdc-button__label">
									{ __( 'Update', 'material-design' ) }
								</span>
							</button>
						) }
					</div>
				</div>
			</div>
		</div>
	);
};

export default Updater;
