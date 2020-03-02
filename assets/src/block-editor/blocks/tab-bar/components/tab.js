/**
 * External dependencies
 */
import classNames from 'classnames';

const Tab = ( { id, activeTab, icon, iconPosition, label, onChange } ) => {
	return (
		<div
			role="tab"
			tabIndex={ 0 }
			onKeyDown={ () => {} }
			onClick={ onChange.bind( this, id ) }
			className={ classNames( 'mdc-tab', 'tab', {
				'mdc-tab--active': activeTab === id,
				'mdc-tab--stacked': icon && iconPosition === 'above',
			} ) }
		>
			<span className="mdc-tab__content">
				{ icon && iconPosition !== 'none' && (
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
			<button className="material-icons tab__delete">cancel</button>
		</div>
	);
};

class TabSchema {
	constructor( { id, label, position, icon, content = null, active = false } ) {
		this.id = id;
		this.label = label;
		this.position = position;
		this.active = active;
		this.icon = icon;
		this.content = content;
	}
}

export { Tab, TabSchema };
