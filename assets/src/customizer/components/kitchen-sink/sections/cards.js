/* global mtb */

import { __ } from '@wordpress/i18n';

const Cards = ( { radius, smallRadius } ) => (
	<div>
		<h4 className="mdc-typography--headline4">
			{ __( 'Card', 'material-theme-builder' ) }
		</h4>
		<p>
			{ __(
				'This component can be created as a block in WordPress.',
				'material-theme-builder'
			) }
		</p>
		<div style={ { display: 'flex' } }>
			<div
				className="mdc-card"
				style={ {
					width: '350px',
					borderRadius: radius,
				} }
			>
				<div
					className="mdc-card__primary-action demo-card__primary-action"
					tabIndex={ 0 }
				>
					<div
						className="mdc-card__media mdc-card__media--16-9 demo-card__media"
						style={ {
							backgroundImage: `url("${ mtb.pluginPath +
								'assets/images/kitchen-sink/2.jpg' }")`,
						} }
					></div>
					<div style={ { padding: '16px' } }>
						<h2
							className="mdc-typography mdc-typography--headline6 mtb-card__title"
							style={ { margin: 0, marginBottom: '5px' } }
						>
							{ __( 'Our Changing Planet', 'material-theme-builder' ) }
						</h2>
						<h3
							className="mdc-typography mtb-card__secondary-text"
							style={ {
								fontSize: '0.875rem',
								fontWeight: 500,
								lineHeight: '1.375rem',
								margin: 0,
							} }
						>
							{ __( 'by John Smith', 'material-theme-builder' ) }
						</h3>
					</div>
					<div
						className="mdc-typography mdc-typography--body2"
						style={ { padding: '16px' } }
					>
						{ __(
							'Visit ten places on our planet that are undergoing the biggest changes today.',
							'material-theme-builder'
						) }
					</div>
				</div>
				<div className="mdc-card__actions">
					<div className="mdc-card__action-buttons">
						<button
							className="mdc-button mdc-card__action mdc-card__action--button"
							style={ { borderRadius: smallRadius } }
						>
							<span
								className="mdc-button__ripple"
								style={ { borderRadius: smallRadius } }
							></span>
							{ __( 'Read', 'material-theme-builder' ) }
						</button>
						<button
							className="mdc-button mdc-card__action mdc-card__action--button"
							style={ { borderRadius: smallRadius } }
						>
							<span
								className="mdc-button__ripple"
								style={ { borderRadius: smallRadius } }
							></span>
							{ __( 'Bookmark', 'material-theme-builder' ) }
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default Cards;
