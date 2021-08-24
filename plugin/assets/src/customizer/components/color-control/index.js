import { ColorPicker, TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

import './style.css';

const ColorControl = ( { defaultValue, label } ) => {
	const [ color, setColor ] = useState( defaultValue );

	return (
		<>
			<div className="material-design-color__label">{ label }</div>
			<div className="material-design-color__picker">
				<div
					className="material-design-color__color"
					style={ { backgroundColor: color } }
				></div>
				<TextControl value={ color } onChange={ value => setColor( value ) } />
			</div>
		</>
	);
};

export default ColorControl;
