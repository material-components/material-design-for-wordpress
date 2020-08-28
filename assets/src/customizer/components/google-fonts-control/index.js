/* global jQuery, mtb */

/**
 * External dependencies
 */
import 'select-woo';

import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { Button } from '@wordpress/components';

import './style.css';
import Item from './item';
import { sanitizeControlId } from '../../utils';

const GoogleFontsControl = props => {
	const { id, label, value, children } = props;

	useEffect( () => {
		jQuery( '.google-fonts-control-selection' )
			.selectWoo( {
				data: mtb.googleFonts,
				width: '100%',
			} )
			.val( value );
	}, [] );

	const [ isExpanded, setIsExpanded ] = useState( false );

	const handleClick = () => {
		setIsExpanded( ! isExpanded );
	};

	const onReset = event => {
		event.preventDefault();
	};

	return (
		<div
			id={ `google-fonts-control-${ sanitizeControlId( id ) }` }
			className="google-fonts-control"
		>
			<div className="google-fonts-control-header">
				<div tabIndex={ 0 } role="link" className="google-fonts-control-title">
					<span className="customize-control-title google-fonts-control-title__item">
						{ label }
					</span>
				</div>
			</div>
			<div className="google-fonts-control-body">
				<select
					className="google-fonts-control-selection"
					value={ value }
				></select>

				<span className="google-fonts-control-body__item">
					<Button
						isLink
						label={ __(
							'View individual components',
							'material-theme-builder'
						) }
						showTooltip={ true }
						icon="admin-settings"
						className="google-fonts-control-settings-expanded"
						onClick={ handleClick }
					/>
				</span>
			</div>

			{ isExpanded && children && children.length && (
				<div className="google-fonts-control-children">
					{ children.map( child => (
						<Item key={ child.id } { ...child } />
					) ) }
				</div>
			) }

			<p>
				{ /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
				<a href="#" onClick={ onReset } className="global-range-slider-reset">
					{ __( 'Reset', 'material-theme-builder' ) }
				</a>
			</p>
		</div>
	);
};

export default GoogleFontsControl;
