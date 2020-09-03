import { Fragment, useContext } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { STATUS } from '../../../wizard/constants';
import Button from '../../../wizard/components/navigation/button';
import TabContext from '../../context';
import { ACTIONS } from '../../constants';

export const Overview = props => {
	const { state, dispatch } = useContext( TabContext );
	const { themeStatus, status } = state;
	const icon = 'ok' !== themeStatus ? 'navigate_next' : null;
	const isDisabled = 'ok' === themeStatus;
	const isLoading = STATUS.PENDING === status;
	const text =
		'ok' !== themeStatus
			? __( 'Activate', 'material-theme-builder' )
			: __( 'Activated', 'material-theme-builder' );

	const handleClick = () => {
		if ( 'install' === themeStatus ) {
			dispatch( { type: ACTIONS.INSTALL_THEME } );
		}

		if ( 'activate' === themeStatus ) {
			dispatch( { type: ACTIONS.ACTIVATE_THEME } );
		}
	};
	return (
		<Fragment>
			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ __(
					'Time to make Material Design look the way you want',
					'material-theme-builder'
				) }
			</h2>
			<p className="material-gsm__content-description">
				With Material Design you can customize your navigation, colors,
				typography, shapes, and access the full set of{ ' ' }
				<a href="https://fonts.google.com/" target="_blank">
					Google Fonts
				</a>{ ' ' }
				and{ ' ' }
				<a
					href="https://material.io/resources/icons/?style=baseline"
					target="_blank"
				>
					Material Design icons.
				</a>
				Check out the Customize your Theme section to dig into all the ways you
				can make Material your own.
			</p>

			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ __( 'Material Theme', 'material-theme-builder' ) }
			</h2>
			<p className="material-gsm__content-description">
				{ __(
					"Applies Material Design colors, typography, shapes, and icons to built-in WordPress elements like your site's header and posts.",
					'material-theme-builder'
				) }
			</p>
			<div className="material-gsm__content-actions">
				<Button
					style="mdc-button--raised"
					text={ text }
					trailingIcon={ icon }
					onClick={ handleClick }
					disabled={ isDisabled }
					loading={ isLoading }
				/>
			</div>

			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ __( 'Material Design Plugin', 'material-theme-builder' ) }
			</h2>
			<p className="material-gsm__content-description">
				{ __(
					'Customize your Material Theme styles and Material Components blocks. Choose from over 1,000 Google Fonts and Material Design icons.',
					'material-theme-builder'
				) }
			</p>

			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ __(
					'Material Components available in the Block Editor',
					'material-theme-builder'
				) }
			</h2>
			<p className="material-gsm__content-description">
				{ __(
					'Start building your custom site with Material Blocks available in the WordPress editor, no code required.',
					'material-theme-builder'
				) }
			</p>
			<div className="material-gsm__content-actions">
				<Button
					style="mdc-button--raised"
					text={ __( 'View all Material Blocks', 'material-theme-builder' ) }
					trailingIcon="navigate_next"
					link={ mtbGsm.customize }
				/>
			</div>

			<div style={ { height: '20px' } }></div>
		</Fragment>
	);
};
