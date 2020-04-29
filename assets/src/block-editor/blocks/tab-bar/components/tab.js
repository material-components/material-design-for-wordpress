/* eslint-disable jsx-a11y/no-static-element-interactions */
/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { useRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { setFocusAndMoveCursorToEnd } from '../../../helpers';

const Tab = ( {
	icon,
	label,
	active,
	onInput,
	onChange,
	onDelete,
	iconPosition,
	index,
	frontend = false,
} ) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const titleRef = frontend ? null : useRef( null );

	/**
	 * Handle ripple transition end.
	 *
	 * @param {Object} event Transition end event.
	 */
	const onRippleTransitionEnd = event => {
		if (
			event.target &&
			event.target.classList.contains(
				'mdc-ripple-upgraded--background-focused'
			)
		) {
			setFocusAndMoveCursorToEnd( titleRef.current );
		}
	};

	return (
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
						role={ ! frontend ? 'textbox' : 'tab' }
						tabIndex={ 0 }
						contentEditable={ ! frontend }
						suppressContentEditableWarning={ ! frontend }
						onBlur={
							! frontend
								? e => onInput( e.currentTarget.textContent, index )
								: undefined
						}
						onKeyDown={ event => {
							onChange(); // Set this tab as active.
							if ( event.key === 'Enter' ) {
								event.currentTarget.blur();
							}
						} }
						ref={ titleRef }
					>
						{ label }
					</span>
				</span>
			</span>
			<span
				className={ classNames( 'mdc-tab-indicator', {
					'mdc-tab-indicator--active': active,
				} ) }
			>
				<span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
			</span>
			<span
				className="mdc-tab__ripple"
				onTransitionEnd={ onRippleTransitionEnd }
			></span>
			{ ! frontend && (
				<button className="material-icons tab__delete" onClick={ onDelete }>
					cancel
				</button>
			) }
		</div>
	);
};
class TabSchema {
	constructor( { label, icon, content = null } ) {
		this.label = label;
		this.icon = icon;
		this.content = content;
	}
}

export { Tab, TabSchema };
