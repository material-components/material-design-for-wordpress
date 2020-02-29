/**
 * External dependencies
 */
import classNames from 'classnames';

const Tab = ( { id, activeTab, icon, iconPosition, label, onChange } ) => {
	return (
		<button
			onClick={ onChange.bind( this, id ) }
			className={ classNames( 'mdc-tab', {
				'mdc-tab--active': activeTab === id,
				'mdc-tab--stacked': icon && iconPosition === 'above',
			} ) }
		>
			<span className="mdc-tab__content">
				{ icon && iconPosition !== 'none' && (
					<i className="material-icons mdc-tab__icon">
						{ /* { String.fromCharCode( icon?.hex ) } */ }
						{ icon }
					</i>
				) }
				<span className="mdc-tab__text-label">
					<span
						role="textbox"
						tabIndex={ 0 }
						contentEditable
						suppressContentEditableWarning
						style={ { cursor: 'text' } }
						onKeyPress={ event =>
							event.key === 'Enter' && event.currentTarget.blur()
						}
					>
						{ label }
					</span>
				</span>
			</span>
			{ activeTab === id && (
				<span className="mdc-tab-indicator mdc-tab-indicator--active">
					<span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
				</span>
			) }
		</button>
	);
};

export default Tab;
