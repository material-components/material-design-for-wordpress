/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Card from './card';
import getConfig from '../../../admin/get-config';

/**
 * Congrats and how we work screen
 */
const Work = () => {
	return (
		<div className="mdc-layout-grid__cell--span-12">
			<Card image={ `${ getConfig( 'assetsPath' ) }complete-build-with-blocks.png` } imageSpan="5">
				<h3 className="mdc-typography--headline3">
					{ __( 'Congrats!', 'material-theme-builder' ) }
				</h3>

				<p>
					{ __(
						`You've installed Material. Click "Finish" and check out the rest of the Getting Started guide to customize your theme, build with Material Blocks, and apply the theme to your site.`,
						'material-theme-builder'
					) }
				</p>
			</Card>
		</div>
	);
};

export default Work;
