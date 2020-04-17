/* global materialPluginPath */

import { __ } from '@wordpress/i18n';
import { H3 } from '../styles';

const Cards = ( { radius, smallRadius } ) => (
	<div>
		<H3>{ __( 'Card', 'material-theme-builder' ) }</H3>
		<p>
			{ __(
				'This component can be created as a block in WordPress. Try it out now.',
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
							backgroundImage: `url("${ materialPluginPath +
								'assets/images/kitchen-sink/2.jpg' }")`,
						} }
					></div>
					<div style={ { padding: '16px' } }>
						<h2
							className="mdc-typography"
							style={ { margin: 0, marginBottom: '5px' } }
						>
							{ __( 'Our Changing Planet', 'material-theme-builder' ) }
						</h2>
						<h3
							className="mdc-typography"
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
					<div className="mdc-typography" style={ { padding: '16px' } }>
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
