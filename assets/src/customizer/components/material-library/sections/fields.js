/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import IconButtonLink from '../common/icon-button-link';

const Fields = ( { radius } ) => (
	<div>
		<h4 className="mdc-typography--headline4" style={ { margin: 0 } }>
			{ __( 'Fields', 'material-theme-builder' ) }
		</h4>
		<IconButtonLink href="https://material.io/components/text-fields"></IconButtonLink>
		<p>
			{ __(
				'Text fields let users enter and edit text. It is unavailable as a block in WordPress.',
				'material-theme-builder'
			) }
		</p>
		<div style={ { display: 'flex' } }>
			<div
				className="mdc-text-field mdc-text-field--with-leading-icon"
				style={ {
					borderTopLeftRadius: `${ radius }px`,
					borderTopRightRadius: `${ radius }px`,
				} }
			>
				<i className="material-icons mdc-text-field__icon mdc-text-field__icon--leading">
					account_circle
				</i>
				<input className="mdc-text-field__input" id="text-field-hero-input" />
				<div className="mdc-line-ripple"></div>
				<label htmlFor="text-field-hero-input" className="mdc-floating-label">
					{ __( 'First name', 'material-theme-builder' ) }
				</label>
			</div>

			<div
				className="mdc-text-field mdc-text-field--outlined mdc-text-field--with-leading-icon mdc-text-field--with-trailing-icon"
				style={ { marginLeft: '10px' } }
			>
				<i className="material-icons mdc-text-field__icon mdc-text-field__icon--leading">
					account_circle
				</i>
				<i className="material-icons mdc-text-field__icon mdc-text-field__icon--trailing">
					close
				</i>
				<input className="mdc-text-field__input" type="text" />
				<div className="mdc-notched-outline">
					<div
						className="mdc-notched-outline__leading"
						style={ {
							borderRadius: `${ radius }px 0 0 ${ radius }px`,
							minWidth: `${ radius }px`,
						} }
					></div>
					<div className="mdc-notched-outline__notch">
						<label htmlFor="outlined-textfield" className="mdc-floating-label">
							{ __( 'Last name', 'material-theme-builder' ) }
						</label>
					</div>
					<div
						className="mdc-notched-outline__trailing"
						style={ {
							borderRadius: `0 ${ radius }px ${ radius }px 0`,
							minWidth: `${ radius }px`,
						} }
					></div>
				</div>
			</div>
		</div>
	</div>
);

export default Fields;
