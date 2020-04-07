import { H3 } from '../styles';

const Fields = () => (
	<div>
		<H3>Fields</H3>
		<p>
			This is an example of how this component appears in the theme. It is
			unavailable as a block in WordPress.
		</p>
		<div>
			<label htmlFor="txtfield1" className="mdc-text-field">
				<div className="mdc-text-field__ripple"></div>
				<input className="mdc-text-field__input" type="text" />
				<span className="mdc-floating-label">Hint text</span>
				<div className="mdc-line-ripple"></div>
			</label>
			<div className="mdc-text-field-helper-line">
				<div
					className="mdc-text-field-helper-text"
					id="my-helper-id"
					aria-hidden="true"
				>
					helper text
				</div>
			</div>
			<label htmlFor="txtfield2" className="mdc-text-field">
				<div className="mdc-text-field__ripple"></div>
				<input className="mdc-text-field__input" type="text" />
				<span className="mdc-floating-label">Hint text</span>
				<div className="mdc-line-ripple"></div>
			</label>
		</div>

		<div>
			<label
				htmlFor="txtfield3"
				className="mdc-text-field mdc-text-field--outlined"
			>
				<div className="mdc-text-field__ripple"></div>
				<input className="mdc-text-field__input" type="text" />
				<span className="mdc-floating-label">Hint text</span>
				<div className="mdc-line-ripple"></div>
			</label>
			<label
				htmlFor="txtfield4"
				className="mdc-text-field mdc-text-field--outlined"
			>
				<div className="mdc-text-field__ripple"></div>
				<input className="mdc-text-field__input" type="text" />
				<span className="mdc-floating-label">Hint text</span>
				<div className="mdc-line-ripple"></div>
			</label>
		</div>
	</div>
);

export default Fields;
