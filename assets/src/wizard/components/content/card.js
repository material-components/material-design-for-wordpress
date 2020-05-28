import React from 'react';
import Switch from './switch';

const Card = props => {
	const imageSpan = props.imageSpan || 4;
	let contentSpan = props.contentSpan || 12 - imageSpan;

	if ( props.switch ) {
		contentSpan = contentSpan - 1;
	}

	return (
		<div className="material-wizard__card mdc-layout-grid__inner mdc-layout-grid__cell--align-middle">
			<div
				className={ `mdc-layout-grid__cell mdc-layout-grid__cell--span-${ imageSpan }` }
			>
				<img src={ props.image } alt="" />
			</div>
			<div
				className={ `mdc-layout-grid__cell mdc-layout-grid__cell--span-${ contentSpan } mdc-layout-grid__cell--align-middle` }
			>
				{ props.children }
			</div>
			{ props.switch && (
				<div
					className={ `mdc-layout-grid__cell mdc-layout-grid__cell--span-1 mdc-layout-grid__cell--align-middle` }
				>
					<Switch id={ props.switch } />
				</div>
			) }
		</div>
	);
};

export default Card;
