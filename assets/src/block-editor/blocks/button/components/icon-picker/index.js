import { useState } from 'react';
import { TextControl } from '@wordpress/components';

import icons from './mdi.json';
import './icon-picker.css';

export default ( { currentIcon, pickHandler } ) => {
	const [ filteredIcons, setFilteredIcons ] = useState( icons );

	const filterIcons = filterText => {
		setFilteredIcons(
			icons.filter( icon => icon.class.includes( filterText ) )
		);
	};

	const iconsRender = filteredIcons.map( icon => {
		return (
			<button
				key={ icon.class }
				type="button"
				className={ `icons-container__icon ${
					currentIcon === icon.class ? 'icons-container__icon--active' : ''
				}` }
				onClick={ pickHandler.bind( this, icon.class ) }
			>
				<i className={ `material-icons md-${ icon.class }` }>{ icon.label }</i>
			</button>
		);
	} );

	return (
		<>
			<section>
				<TextControl label="Search" onChange={ filterIcons } />
			</section>
			<section className="icons-container">{ iconsRender }</section>
		</>
	);
};
