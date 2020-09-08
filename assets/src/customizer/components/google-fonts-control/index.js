/* global jQuery, mtb */

/**
 * External dependencies
 */
import 'select-woo';

import { __ } from '@wordpress/i18n';
import { useState, useEffect, Fragment } from '@wordpress/element';
import { Button } from '@wordpress/components';

import './style.css';
import Item from './item';
import { sanitizeControlId } from '../../utils';

const GoogleFontsControl = props => {
	const { id, label, value, children, onChange } = props;

	/* istanbul ignore next */
	useEffect( () => {
		jQuery( '.google-fonts-control-selection' )
			.selectWoo( {
				data: mtb.googleFonts,
				width: '100%',
			} )
			.val( value )
			.on( 'change', onChange );
	}, [] );

	const [ isExpanded, setIsExpanded ] = useState( false );
	const [ items, setItems ] = useState( children );

	const setChildValues = child => {
		const childControl = wp.customize.control(
			`material_theme_builder[${ child.id }]`
		);

		const settings = {
			size: child.sizeValue,
			weight: child.weightValue,
		};

		childControl.setting.set( JSON.stringify( settings ) );
	};

	const handleClick = () => {
		setIsExpanded( ! isExpanded );
	};

	const handleOnReset = event => {
		event.preventDefault();

		if ( ! window.confirm( mtb.l10n.confirmChange ) ) { // eslint-disable-line
			return;
		}

		const newChildren = children.map( child => {
			const { size, weight } = child;

			setChildValues( {
				id: child.id,
				sizeValue: size.default,
				weightValue: weight.default,
			} );

			size.value = size.default;
			weight.value = weight.default;

			return child;
		} );

		setItems( newChildren );
	};

	const onChildChange = values => {
		setChildValues( values );

		const newChildren = children.map( child => {
			if ( values.id !== child.id ) {
				return child;
			}

			child.size.value = values.sizeValue;
			child.weight.value = values.weightValue;

			return child;
		} );

		setItems( newChildren );
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
				<select // eslint-disable-line
					className="google-fonts-control-selection"
					value={ value }
					data-id={ id }
					onChange={ onChange }
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

			{ isExpanded && items && items.length && (
				<Fragment>
					<div className="google-fonts-control-children">
						{ items.map( child => (
							<Item key={ child.id } onChange={ onChildChange } { ...child } />
						) ) }
					</div>

					<p>
						{ /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
						<a
							href="#"
							onClick={ handleOnReset }
							className="google-fonts-control-reset"
						>
							{ __( 'Reset', 'material-theme-builder' ) }
						</a>
					</p>
				</Fragment>
			) }
		</div>
	);
};

export default GoogleFontsControl;
