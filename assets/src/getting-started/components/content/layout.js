import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import Button from '../../../wizard/components/navigation/button';

export const Layout = props => {
	return (
		<Fragment>
			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ __( 'Posts Settings', 'material-theme-builder' ) }
			</h2>
			<p className="material-gsm__content-description">
				{ __(
					'Select how posts display on your site using cards or image lists in a wide or normal width layout. Card display options include raised or outlined cards, show or hide post comments, author, excerpt, and date.',
					'material-theme-builder'
				) }
			</p>
			<p className="material-gsm__content-description">
				{ __(
					'Choose how your comment fields display within each post, options include outlines of filled text fields.',
					'material-theme-builder'
				) }
			</p>

			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ __( 'Site Navigation (Top app bar)', 'material-theme-builder' ) }
			</h2>
			<p className="material-gsm__content-description">
				{ __(
					'Choose tabs, navigation drawer, or both for your site navigation. Give users the ability to search your site on every page directly from within the top app bar. By default the top app bar will hide when scrolling up, choose “Fixed” to keep the app bar in place above all content.',
					'material-theme-builder'
				) }
			</p>

			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ __( 'Site Navigation (Footer)', 'material-theme-builder' ) }
			</h2>
			<p className="material-gsm__content-description">
				{ __(
					'Add footer text and give your users a quick way to jump back to the top. Looking to add widgets? Add widgets to the bottom of your site in Widgets settings.',
					'material-theme-builder'
				) }
			</p>

			<div className="material-gsm__content-actions">
				<Button
					style="mdc-button--raised"
					text={ __( 'Customize', 'material-theme-builder' ) }
					trailingIcon="navigate_next"
					link={ mtbGsm.customize }
				/>
			</div>

			<div style={ { height: '20px' } }></div>
		</Fragment>
	);
};
