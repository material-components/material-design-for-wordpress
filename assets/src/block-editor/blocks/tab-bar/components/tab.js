/**
 * External dependencies
 */
import classNames from 'classnames';

const Tab = ( { id, active, icon, iconPosition, label, onChange } ) => {
	return (
		<button
			onClick={ onChange.bind( this, id ) }
			className={ classNames( 'mdc-tab', {
				'mdc-tab--active': active,
				'mdc-tab--stacked': icon && iconPosition === 'above',
			} ) }
		>
			<span className="mdc-tab__content">
				{ icon && iconPosition === 'leading' && (
					<i className="material-icons mdc-tab__icon">
						{ String.fromCharCode( icon?.hex ) }
					</i>
				) }
				<span className="mdc-tab__text-label">
					<span
						role="textbox"
						tabIndex={ 0 }
						contentEditable
						suppressContentEditableWarning
						onKeyPress={ event =>
							event.key === 'Enter' && event.currentTarget.blur()
						}
						style={ { cursor: 'text' } }
					>
						{ label }
					</span>
				</span>
			</span>
			{ active && (
				<span className="mdc-tab-indicator mdc-tab-indicator--active">
					<span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
				</span>
			) }
		</button>
	);
};

export default Tab;
