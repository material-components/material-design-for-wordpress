import { H3 } from '../styles';

const Fields = ( { radius } ) => (
	<div>
		<H3>Fields</H3>
		<p>
			This is an example of how this component appears in the theme. It is
			unavailable as a block in WordPress.
		</p>
		<div style={ { display: 'flex' } }>
			<div
				className="mdc-text-field mdc-text-field--with-leading-icon"
				style={ {
					borderTopLeftRadius: `${ radius }px`,
					borderTopRightRadius: `${ radius }px`,
				} }
			>
				<i className="material-icons mdc-text-field__icon">account_circle</i>
				<input className="mdc-text-field__input" id="text-field-hero-input" />
				<div className="mdc-line-ripple"></div>
				<label htmlFor="text-field-hero-input" className="mdc-floating-label">
					First name
				</label>
			</div>

			<div
				className="mdc-text-field mdc-text-field--outlined mdc-text-field--with-leading-icon mdc-text-field--with-trailing-icon"
				style={ { marginLeft: '10px' } }
			>
				<i className="material-icons mdc-text-field__icon">account_circle</i>
				<i className="material-icons mdc-text-field__icon">close</i>
				<input className="mdc-text-field__input" type="text" />
				<div className="mdc-notched-outline">
					<div
						className="mdc-notched-outline__leading"
						style={ {
							borderRadius: `${ radius }px 0 0 ${ radius }px`,
							minWidth: `${ radius }px`,
						} }
					></div>
					<div className="mdc-notched-outline__notch">
						<label htmlFor="outlined-textfield" className="mdc-floating-label">
							Last name
						</label>
					</div>
					<div
						className="mdc-notched-outline__trailing"
						style={ {
							borderRadius: `0 ${ radius }px ${ radius }px 0`,
							minWidth: `${ radius }px`,
						} }
					></div>
				</div>
			</div>
		</div>
	</div>
);

export default Fields;
