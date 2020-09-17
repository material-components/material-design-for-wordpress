import { Fragment, useContext } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import Button from '../../../wizard/components/navigation/button';
import getConfig from '../../../admin/get-config';

export const Overview = () => {
	return (
		<Fragment>
			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ __(
					'Build with Material Blocks',
					'material-theme-builder'
				) }
			</h2>

			<p>
				{ __(
					'Add Material Components like buttons and cards, and create layouts for things like image-heavy pages or styled contact forms. Customize the look of your blocks by adjusting global theme styles, or setting the style of a single component in the block editor.',
					'material-theme-builder'
				) }
			</p>

			<img src={ `${ getConfig( 'assetsPath' ) }build-with-material-blocks.png` } alt="" />

			<div className="material-gsm__content-actions">
				<Button
					style="mdc-button--raised"
					text={ __( 'Customize', 'material-theme-builder' ) }
					trailingIcon="navigate_next"
					link={ getConfig( 'customize' ) }
				/>
			</div>

			<div style={ { height: '20px' } }></div>
		</Fragment>
	);
};
