/**
 * External dependencies
 */
import classNames from 'classnames';

const Tab = ( {
	icon,
	label,
	active,
	onInput,
	onChange,
	onDelete,
	iconPosition,
} ) => (
	<div
		role="tab"
		tabIndex={ 0 }
		onClick={ onChange }
		className={ classNames( 'mdc-tab', 'tab', {
			'mdc-tab--active': active,
			'mdc-tab--stacked': icon && iconPosition === 'above',
		} ) }
	>
		<span className="mdc-tab__content">
			{ icon && iconPosition !== 'none' && (
				<i className="material-icons mdc-tab__icon">
					{ String.fromCharCode( icon?.hex ) }
				</i>
			) }
			<span className="mdc-tab__text-label tab__label-field">
				<span
					role="textbox"
					tabIndex={ 0 }
					contentEditable
					suppressContentEditableWarning
					onBlur={ e => onInput( e.currentTarget.textContent ) }
					onKeyPress={ event =>
						event.key === 'Enter' && event.currentTarget.blur()
					}
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
		<button className="material-icons tab__delete" onClick={ onDelete }>
			cancel
		</button>
	</div>
);
class TabSchema {
	constructor( { label, position, icon, content = null } ) {
		this.label = label;
		this.position = position;
		this.icon = icon;
		this.content = content;
	}
}

export { Tab, TabSchema };
