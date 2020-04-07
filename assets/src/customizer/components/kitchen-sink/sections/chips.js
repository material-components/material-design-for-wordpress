import { H3 } from '../styles';

const Chips = () => (
	<div>
		<H3>Chips</H3>
		<p>
			This is an example of how this component appears in the theme. It is
			unavailable as a block in WordPress.
		</p>
		<div className="mdc-chip-set" role="grid">
			<div className="mdc-chip" role="row">
				<div className="mdc-chip__ripple"></div>
				<span role="gridcell">
					<span role="button" tabIndex="0" className="mdc-chip__primary-action">
						<span className="mdc-chip__text">Chip One</span>
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
						<span className="mdc-chip__text">Chip Two</span>
					</span>
				</span>
			</div>
		</div>
	</div>
);

export default Chips;
