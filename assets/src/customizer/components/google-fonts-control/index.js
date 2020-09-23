/* global jQuery */

/**
 * External dependencies
 */
import 'select-woo';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect, useRef } from '@wordpress/element';
import { Button } from '@wordpress/components';

/**
 * Internal dependencies
 */
import './style.css';
import Item from './item';
import { sanitizeControlId } from '../../utils';
import getConfig from '../../../block-editor/utils/get-config';

const GoogleFontsControl = props => {
	const { id, label, value, children, onChange } = props;
	const elementRef = useRef( null );
	const googleFonts = getConfig( 'googleFonts' );
	const [ isExpanded, setIsExpanded ] = useState( false );
	const [ items, setItems ] = useState( children );
	const [ selectedFont, setSelectedFont ] = useState( value );

	/* istanbul ignore next */
	useEffect( () => {
		jQuery( elementRef.current )
			.find( '.google-fonts-control-selection' )
			.selectWoo( {
				data: Object.values( googleFonts ),
				width: '100%',
			} )
			.val( selectedFont )
			.trigger( 'change' )
			.on( 'change', event => {
				setSelectedFont( event.target.value );
				onChange( event );
			} );
	}, [ elementRef ] ); // eslint-disable-line

	useEffect( () => {
		const newChildren = children.map( child => {
			if ( googleFonts.hasOwnProperty( selectedFont ) ) {
				child.weight.choices = googleFonts[ selectedFont ].variants;
			}

			return child;
		} );

		setItems( newChildren );
	}, [ selectedFont ] ); // eslint-disable-line

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

		if ( ! window.confirm( getConfig( 'l10n' ).confirmChange ) ) { // eslint-disable-line
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
			ref={ elementRef }
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
					value={ selectedFont }
					data-id={ id }
					onChange={ onChange }
				></select>

				<span className="google-fonts-control-body__item">
					<Button
						isLink
						label={ __( 'View more options', 'material-theme-builder' ) }
						showTooltip={ true }
						icon="admin-settings"
						className="control-settings-expanded google-fonts-control-settings-expanded"
						onClick={ handleClick }
					/>
				</span>
			</div>

			{ isExpanded && items && items.length && (
				<>
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
				</>
			) }
		</div>
	);
};

export default GoogleFontsControl;