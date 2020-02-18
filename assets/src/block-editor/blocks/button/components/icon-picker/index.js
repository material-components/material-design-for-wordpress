/**
 * WordPress dependencies
 */
import { useState, useCallback } from 'react';
import { __ } from '@wordpress/i18n';
import { TextControl, Tooltip } from '@wordpress/components';

/**
 * Internal dependencies
 */
import icons from './mdi.json';
import './icon-picker.css';

export default ( { currentIcon, pickHandler } ) => {
	const [ filteredIcons, setFilteredIcons ] = useState( icons );

	const filterIcons = useCallback(
		filterText => {
			setFilteredIcons(
				icons.filter( icon => icon.class.includes( filterText ) )
			);
		},
		[ setFilteredIcons, icons ]
	);

	const iconsRender = filteredIcons.map( icon => {
		const isSelected =
			currentIcon === icon.class
				? ' icons-container__icon__icon-btn--active'
				: '';

		return (
			<div key={ icon.class } className="icons-container__icon">
				<Tooltip text={ icon.label }>
					<button
						type="button"
						className={ `icons-container__icon__icon-btn${ isSelected }` }
						onClick={ pickHandler.bind( this, icon.class ) }
					>
						<i className={ `material-icons md-${ icon.class }` }>
							{ icon.label }
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
