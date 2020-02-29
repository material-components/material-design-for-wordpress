/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

const TabItemSave = ( { attributes: { icon, iconPosition, label } } ) => {
	return (
		<>
			<button
				className={ classNames( 'mdc-tab', {
					'mdc-tab--active': false,
					'mdc-tab--stacked': icon && iconPosition === 'above',
				} ) }
			>
				<span className="mdc-tab__content">
					{ icon && iconPosition === 'leading' && (
						<i className="material-icons mdc-tab__icon">
							{ String.fromCharCode( icon?.hex ) }
						</i>
					) }
					<span className="mdc-tab__text-label">{ label }</span>
				</span>
			</button>

			<InnerBlocks.Content />
		</>
	);
};

export default TabItemSave;
