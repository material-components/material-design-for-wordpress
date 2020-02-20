import StyleBox from './style-box';
import * as styleIcons from './style-icons';

const ButtonStyles = ( { style, onChange } ) => (
	<div className="styles-container">
		{ Object.keys( styleIcons ).map( styleIcon => {
			const StyleIconComponent = styleIcons[ styleIcon ];
			const name = styleIcons[ styleIcon ].name.replace( 'Icon', '' );

			return (
				<StyleBox
					key={ styleIcon }
					label={ name }
					active={ style === name.toLowerCase() }
					handleClick={ onChange.bind( this, name.toLowerCase() ) }
				>
					<StyleIconComponent />
				</StyleBox>
			);
		} ) }
	</div>
);

export default ButtonStyles;
