/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';

const Integrations = () => {
	return (
		<div className="material-settings__integrations">
			<h2 className="mdc-typography--headline6">
				{ __( 'Integrations', 'material-design' ) }
			</h2>

			<p
				className="mdc-typography--body1"
				dangerouslySetInnerHTML={ {
					__html: sprintf(
						__(
							'Integrate %s and %s to get the most out of the Material Theme.',
							'material-design'
						),
						`<a href="http://google.com">${ __(
							'Google Fonts',
							'material-design'
						) }</a>`,
						`<a href="http://material.io">${ __(
							'Material icons',
							'material-design'
						) }</a>`
					),
				} }
			></p>

			<p className="mdc-typography--body1">
				{ __(
					'Turn on auto-updater or update your resources manually.',
					'material-design'
				) }
			</p>

			<div className="material-settings__updater">
				<div className="mdc-layout-grid">
					<div className="mdc-layout-grid__inner">
						<div className="mdc-layout-grid__cell">
							<h3 className="mdc-typography--headline6">
								{ __( 'Google Fonts', 'material-design' ) }
							</h3>

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
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Integrations;
