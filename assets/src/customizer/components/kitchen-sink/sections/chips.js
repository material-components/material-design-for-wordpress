import { __ } from '@wordpress/i18n';
import { H3 } from '../styles';

const Chips = () => (
	<div>
		<H3>{ __( 'Chips', 'material-theme-builder' ) }</H3>
		<p>
			{ __(
				'This is an example of how this component appears in the theme. It is unavailable as a block in WordPress.',
				'material-theme-builder'
			) }
		</p>
		<div className="mdc-chip-set" role="grid">
			<div className="mdc-chip" role="row">
				<div className="mdc-chip__ripple"></div>
				<span role="gridcell">
					<span role="button" tabIndex="0" className="mdc-chip__primary-action">
						<span className="mdc-chip__text">
							{ __( 'Chip One', 'material-theme-builder' ) }
						</span>
					</span>
				</span>
			</div>
			<div className="mdc-chip" role="row">
				<div className="mdc-chip__ripple"></div>
				<span role="gridcell">
					<span
						role="button"
						tabIndex="-1"
						className="mdc-chip__primary-action"
					>
						<span className="mdc-chip__text">
							{ __( 'Chip Two', 'material-theme-builder' ) }
						</span>
					</span>
				</span>
			</div>
		</div>
	</div>
);

export default Chips;
