/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * Material list save component.
 */
const ListSave = ( {
	attributes: { style, iconPosition, iconSize, items },
	className,
} ) => {
	const isSecondaryEnabled = style === 'two-line';

	return (
		<div className={ className }>
			<ul
				className={ classNames(
					'mdc-list',
					className ? className.replace( 'mdc-list--two-line', '' ) : '',
					{
						'mdc-list--two-line': isSecondaryEnabled,
						'mdc-list--avatar-list': 'large' === iconSize,
					}
				) }
			>
				{ items.map(
					( { primaryText, secondaryText, icon, url, target }, i ) => (
						<li key={ i } className="mdc-list-item">
							{ url && (
								<a
									href={ url || '#' }
									target={ target }
									className="list-item__link"
									rel={ target ? 'noopener noreferrer' : undefined }
								>
									&nbsp;
								</a>
							) }

							{ 'leading' === iconPosition && (
								<span className="mdc-list-item__graphic material-icons">
									{ icon }
								</span>
							) }

							<span className="mdc-list-item__text">
								<span className="mdc-list-item__primary-text">
									{ primaryText }
								</span>

								{ isSecondaryEnabled && (
									<span className="mdc-list-item__secondary-text">
										{ secondaryText }
									</span>
								) }
							</span>

							{ 'trailing' === iconPosition && (
								<span className="mdc-list-item__meta material-icons">
									{ icon }
								</span>
							) }
						</li>
					)
				) }
			</ul>
		</div>
	);
};

export default ListSave;
