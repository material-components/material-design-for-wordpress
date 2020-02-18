import { useState } from 'react';
import { TextControl } from '@wordpress/components';
import icons from './mdi.json';

export default ( { currentIcon, selectHandler } ) => {
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
				style={ {
					width: '20%',
					color: currentIcon === icon.class ? 'red' : '',
					border: 0,
					backgroundColor: 'transparent',
					alignSelf: 'flex-start',
				} }
				onClick={ selectHandler.bind( this, icon.class ) }
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
			<section
				style={ {
					display: 'flex',
					height: '250px',
					overflowY: 'scroll',
					overflowX: 'hidden',
					flexWrap: 'wrap',
				} }
			>
				{ iconsRender }
			</section>
		</>
	);
};
