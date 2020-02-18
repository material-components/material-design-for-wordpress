/**
 * WordPress dependencies.
 */
import {
	BaseControl,
	ColorIndicator,
	ColorPalette,
} from '@wordpress/components';
import { useRef, useLayoutEffect } from '@wordpress/element';

/**
 * Internal dependencies.
 */
import MATERIAL_COLORS from '../../../common/material-colors';
import './style.css';

export default function MaterialColorPalette( { onChange, value, label } ) {
	// Reference of the wrapper.
	const wrapper = useRef( null );

	useLayoutEffect( () => {
		const node = wrapper.current;
		const colors = node.querySelectorAll( '.components-color-palette > *' );

		if ( 255 !== colors.length ) {
			return;
		}

		// Insert <br> tags before end of each color group.
		let j = 14;
		for ( let i = j; i <= 245; i += j ) {
			if ( i > 210 ) {
				j = 10;
			}

			colors[ i ].parentNode.insertBefore(
				document.createElement( 'br' ),
				colors[ i ]
			);
		}
	}, [] );

	return (
		<BaseControl className="material-component-color-palette">
			<BaseControl.VisualLabel>
				<span className="material-component-color-palette__label">
					{ label }
				</span>
				<ColorIndicator colorValue={ value } aria-label={ label } />
			</BaseControl.VisualLabel>

			<div className="material-colors-wrap" ref={ wrapper }>
				<ColorPalette
					colors={ MATERIAL_COLORS }
					onChange={ onChange }
					value={ value }
				/>
			</div>
		</BaseControl>
	);
}
