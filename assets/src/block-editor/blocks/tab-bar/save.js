/**
 * Internal dependencies
 */

export default function TabBarSave() {
	return (
		<div className="mdc-tab-bar" role="tablist">
			<div className="mdc-tab-scroller">
				<div className="mdc-tab-scroller__scroll-area">
					<div className="mdc-tab-scroller__scroll-content">
						<button
							className="mdc-tab mdc-tab--active"
							role="tab"
							aria-selected="true"
							tabIndex="0"
						>
							<span className="mdc-tab__content">
								<span
									className="mdc-tab__icon material-icons"
									aria-hidden="true"
								>
									favorite
								</span>
								<span className="mdc-tab__text-label">Favorites</span>
							</span>
							<span className="mdc-tab-indicator mdc-tab-indicator--active">
								<span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
							</span>
							<span className="mdc-tab__ripple"></span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
