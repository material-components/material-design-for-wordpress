/* global mtbWizard */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Card from './card';

/**
 * Congrats and how we work screen
 */
const Work = () => {
	return (
		<div className="mdc-layout-grid__cell--span-12">
			<h3 className="mdc-typography--headline3 material-wizard__title">
				{ __(
					'Congrats! You’ve installed Material. Here’s how it works:',
					'material-theme-builder'
				) }
			</h3>

			<Card image={ `${ mtbWizard.assetsPath }welcome.png` }>
				<h4 className="mdc-typography--headline4">
					{ __( 'Customize Your Material Theme', 'material-theme-builder' ) }
				</h4>

				<p>
					{ __(
						'Set up and preview your global theme styles within the customizer. Choose colors, typography, shapes, and icons to express your unique style.',
						'material-theme-builder'
					) }
				</p>
			</Card>

			<hr />

			<Card image={ `${ mtbWizard.assetsPath }complete-build-with-blocks.png` }>
				<h4 className="mdc-typography--headline4">
					{ __( 'Build With Material Blocks', 'material-theme-builder' ) }
				</h4>

				<p>
					{ __(
						'Add Material Components like buttons and cards, and create layouts for things like image-heavy pages or styled contact forms. Customize the look of your blocks by adjusting global theme styles, or setting the style of a single component in the block editor',
						'material-theme-builder'
					) }
				</p>
			</Card>

			<hr />

			<Card image={ `${ mtbWizard.assetsPath }addon-material-theme.png` }>
				<h4 className="mdc-typography--headline4">
					{ __( 'Apply Your Theme', 'material-theme-builder' ) }
				</h4>

				<p>
					{ __(
						'Implement your colors, shapes, and typography for built-in WordPress elements like your site’s header and footer.',
						'material-theme-builder'
					) }
				</p>
			</Card>
		</div>
	);
};

export default Work;
