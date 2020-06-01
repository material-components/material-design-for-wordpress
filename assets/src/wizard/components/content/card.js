import React, { useContext } from 'react';
import StepContext from '../../context';
import Switch from './switch';

/**
 * Diplay information related to the current screen
 * @param {*} props Inherited props
 */
const Card = props => {
	const imageSpan = props.imageSpan || 4;
	const { state } = useContext( StepContext );
	const checked = props.switch && state.addons.includes( props.switch );

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
					<Switch id={ props.switch } checked={ checked } />
				</div>
			) }
		</div>
	);
};

export default Card;
