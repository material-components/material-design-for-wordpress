/**
 * External dependencies
 */
import { useState, useCallback } from 'react';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { TextControl, Tooltip } from '@wordpress/components';

/**
 * Internal dependencies
 */
import './style.css';
import { icons as rawIcons } from '!!json-loader!material-design-icons/iconfont/MaterialIcons-Regular.ijmap';

export default ( { currentIcon, pickHandler } ) => {
	const icons = Object.keys( rawIcons );
	const toSlug = str => str.replace( ' ', '_' ).toLowerCase();
	const [ filteredIcons, setFilteredIcons ] = useState( icons );

	const filterIcons = useCallback(
		filterText => {
			setFilteredIcons(
				icons.filter( icon =>
					rawIcons[ icon ].name
						.toLowerCase()
						.includes( filterText.toLowerCase() )
				)
			);
		},
		[ setFilteredIcons, icons ]
	);

	const iconsRender = filteredIcons.map( icon => {
		const iconName = toSlug( rawIcons[ icon ].name );
		const isSelected =
			currentIcon === iconName
				? ' icons-container__icon__icon-btn--active'
				: '';

		return (
			<div key={ rawIcons[ icon ].name } className="icons-container__icon">
				<Tooltip text={ rawIcons[ icon ].name }>
					<button
						type="button"
						className={ `icons-container__icon__icon-btn${ isSelected }` }
						onClick={ pickHandler.bind( this, iconName ) }
					>
						<i className="material-icons">
							{ String.fromCharCode( parseInt( icon, 16 ) ) }
						</i>
					</button>
				</Tooltip>
			</div>
		);
	} );

	return (
		<>
			<section>
				<TextControl
					label={ __( 'Search icon', 'material-theme-builder' ) }
					onChange={ filterIcons }
				/>
			</section>

			<section className="icons-container">{ iconsRender }</section>
		</>
	);
};
