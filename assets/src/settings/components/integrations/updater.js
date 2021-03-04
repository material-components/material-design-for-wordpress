import { __, sprintf } from '@wordpress/i18n';

const Updater = ( { title, disabled, lastUpdated } ) => {
	return (
		<div className="material-settings__updater">
			<div className="mdc-layout-grid">
				<div className="mdc-layout-grid__inner">
					<div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
						<h3 className="mdc-typography--headline6">{ title }</h3>

						{ disabled && (
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

						{ ! disabled && (
							<p className="mdc-typography--body1">{ lastUpdated }</p>
						) }
					</div>

					<div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-3"></div>

					<div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
						{ disabled && __( 'Updates disabled', 'material-design' ) }
					</div>
				</div>
			</div>
		</div>
	);
};

export default Updater;
