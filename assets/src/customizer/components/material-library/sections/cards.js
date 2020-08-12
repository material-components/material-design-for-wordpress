/* global mtb */

import { __ } from '@wordpress/i18n';
import IconButtonLink from '../common/icon-button-link';

const Cards = ( { radius, buttonRadius } ) => (
	<div>
		<h4 className="mdc-typography--headline4" style={ { margin: 0 } }>
			{ __( 'Cards', 'material-theme-builder' ) }
		</h4>
		<IconButtonLink href="https://material.io/components/cards"></IconButtonLink>
		<p>
			{ __(
				'Cards contain content and actions about a single subject.',
				'material-theme-builder'
			) }
		</p>
		<div style={ { display: 'flex' } }>
			<div
				className="mdc-card"
				style={ {
					width: '350px',
					borderRadius: `${ radius }px`,
				} }
			>
				<div
					className="mdc-card__primary-action demo-card__primary-action"
					tabIndex={ 0 }
				>
					<div
						className="mdc-card__media mdc-card__media--16-9 demo-card__media"
						style={ {
							backgroundImage: `url("${ mtb.images[ 0 ] }")`,
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
							style={ { borderRadius: `${ buttonRadius }px` } }
						>
							<span
								className="mdc-button__ripple"
								style={ { borderRadius: `${ buttonRadius }px` } }
							></span>
							{ __( 'Read', 'material-theme-builder' ) }
						</button>
						<button
							className="mdc-button mdc-card__action mdc-card__action--button"
							style={ { borderRadius: `${ buttonRadius }px` } }
						>
							<span
								className="mdc-button__ripple"
								style={ { borderRadius: `${ buttonRadius }px` } }
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
