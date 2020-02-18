export default function Button( {} ) {
	return (
		<div className="mdc-layout-grid">
			<div className="mdc-layout-grid__inner">
				<div className="mdc-layout-grid__cell">
					<div className="mdc-card demo-card">
						<div
							className="mdc-card__primary-action demo-card__primary-action"
							tabIndex="0"
						>
							<div
								className="mdc-card__media mdc-card__media--16-9 demo-card__media"
								style={ {
									backgroundImage:
										'url("https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/2.jpg")',
								} }
							></div>
							<div className="demo-card__primary">
								<h2 className="demo-card__title mdc-typography mdc-typography--headline6">
									Our Changing Planet
								</h2>
								<h3 className="demo-card__subtitle mdc-typography mdc-typography--subtitle2">
									by Kurt Wagner
								</h3>
							</div>
							<div className="demo-card__secondary mdc-typography mdc-typography--body2">
								Visit ten places on our planet that are undergoing the biggest changes
								today.
							</div>
						</div>
						<div className="mdc-card__actions">
							<div className="mdc-card__action-buttons">
								<button className="mdc-button mdc-card__action mdc-card__action--button">
									<span className="mdc-button__ripple"></span> Read
								</button>
								<button className="mdc-button mdc-card__action mdc-card__action--button">
									<span className="mdc-button__ripple"></span> Bookmark
								</button>
							</div>
							<div className="mdc-card__action-icons">
								<button
									className="mdc-icon-button mdc-card__action mdc-card__action--icon--unbounded"
									aria-pressed="false"
									aria-label="Add to favorites"
									title="Add to favorites"
								>
									<i className="material-icons mdc-icon-button__icon mdc-icon-button__icon--on">
										favorite
									</i>
									<i className="material-icons mdc-icon-button__icon">
										favorite_border
									</i>
								</button>
								<button
									className="mdc-icon-button material-icons mdc-card__action mdc-card__action--icon--unbounded"
									title="Share"
									data-mdc-ripple-is-unbounded="true"
								>
									share
								</button>
								<button
									className="mdc-icon-button material-icons mdc-card__action mdc-card__action--icon--unbounded"
									title="More options"
									data-mdc-ripple-is-unbounded="true"
								>
									more_vert
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="mdc-layout-grid__cell"></div>
				<div className="mdc-layout-grid__cell"></div>
			</div>
		</div>

	);
}
