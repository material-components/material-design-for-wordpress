import React from 'react';
import { __ } from '@wordpress/i18n';
import Card from './card';

const Work = () => {
	return (
		<div className="mdc-layout-grid__cell--span-12">
			<h3 className="mdc-typography--headline4 material-wizard__title">
				{ __(
					'Congrats! You’ve installed Material. Here’s how it works:',
					'material-theme-builder'
				) }
			</h3>

			<Card image="https://source.unsplash.com/random/284x213">
				<h4 className="mdc-typography--headline4">
					{ __( 'Customize Your Material Theme', 'material-theme-builder' ) }
				</h4>

				<p>
					{ __(
						'Choose colors, typography, shapes, and icons to express your unique style.',
						'material-theme-builder'
					) }
				</p>
			</Card>

			<hr />

			<Card image="https://source.unsplash.com/random/284x213">
				<h4 className="mdc-typography--headline4">
					{ __( 'Build With Material Blocks', 'material-theme-builder' ) }
				</h4>

				<p>
					{ __(
						'Add Material Components like buttons and cards, and create layouts for things like image-heavy pages or styled contact forms.',
						'material-theme-builder'
					) }
				</p>
			</Card>

			<hr />

			<Card image="https://source.unsplash.com/random/284x213">
				<h4 className="mdc-typography--headline4">
					{ __( 'Apply Your Theme', 'material-theme-builder' ) }
				</h4>

				<p>
					{ __(
						'Implement your colors, shapes, and typography to built-in WordPress elements like your site’s header and footer.',
						'material-theme-builder'
					) }
				</p>
			</Card>
		</div>
	);
};

export default Work;
