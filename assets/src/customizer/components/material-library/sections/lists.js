import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

const Lists = ( { iconStyle } ) => (
	<div>
		<h4 className="mdc-typography--headline4" style={ { margin: 0 } }>
			{ __( 'List', 'material-theme-builder' ) }
		</h4>
		<form target="_blank">
			<button
				className="mdc-icon-button material-icons"
				formAction="https://material.io/components/lists"
			>
				open_in_new
			</button>
		</form>
		<p>
			{ __(
				'Lists are continuous, vertical indexes of text or images.',
				'material-theme-builder'
			) }
		</p>
		<div style={ { display: 'flex' } }>
			<ul
				className="wp-block-material-list mdc-list"
				style={ { width: '33%' } }
			>
				<li
					className="wp-block-material-list-item mdc-list-item list-item"
					tabIndex="0"
				>
					<i className={ classNames( iconStyle, 'mdc-list-item__graphic' ) }>
						wifi
					</i>
					<span className="mdc-list-item__text list-item__text">
						{ __( 'List item', 'material-theme-builder' ) }
					</span>
				</li>
				<li
					className="wp-block-material-list-item mdc-list-item list-item"
					tabIndex="0"
				>
					<i className={ classNames( 'mdc-list-item__graphic', iconStyle ) }>
						bluetooth
					</i>
					<span className="mdc-list-item__text list-item__text">
						{ __( 'List item', 'material-theme-builder' ) }
					</span>
				</li>
				<li
					className="wp-block-material-list-item mdc-list-item list-item"
					tabIndex="0"
				>
					<i className={ classNames( iconStyle, 'mdc-list-item__graphic' ) }>
						http
					</i>
					<span className="mdc-list-item__text list-item__text">
						{ __( 'List item', 'material-theme-builder' ) }
					</span>
				</li>
			</ul>

			<ul
				style={ { width: '33%' } }
				className="mdc-list mdc-list--two-line inline-demo-list"
			>
				<li className="mdc-list-item mdc-ripple-upgraded" tabIndex="0">
					<i
						className={ classNames( iconStyle, 'mdc-list-item__graphic' ) }
						aria-hidden="true"
					>
						favorite
					</i>

					<span className="mdc-list-item__text">
						<span className="mdc-list-item__primary-text">
							{ __( 'List item', 'material-theme-builder' ) }
						</span>
						<span className="mdc-list-item__secondary-text">
							{ __( 'Secondary Text...', 'material-theme-builder' ) }
						</span>
					</span>
				</li>
				<li className="mdc-list-item mdc-ripple-upgraded" tabIndex="-1">
					<i
						className={ classNames( 'mdc-list-item__graphic', iconStyle ) }
						aria-hidden="true"
					>
						grade
					</i>

					<span className="mdc-list-item__text">
						<span className="mdc-list-item__primary-text">
							{ __( 'List item', 'material-theme-builder' ) }
						</span>
						<span className="mdc-list-item__secondary-text">
							{ __( 'Secondary Text...', 'material-theme-builder' ) }
						</span>
					</span>
				</li>
				<li className="mdc-list-item mdc-ripple-upgraded" tabIndex="-1">
					<i
						className={ classNames( iconStyle, 'mdc-list-item__graphic' ) }
						aria-hidden="true"
					>
						search
					</i>

					<span className="mdc-list-item__text">
						<span className="mdc-list-item__primary-text">
							{ __( 'List item', 'material-theme-builder' ) }
						</span>
						<span className="mdc-list-item__secondary-text">
							{ __( 'Secondary Text...', 'material-theme-builder' ) }
						</span>
					</span>
				</li>
			</ul>

			<ul
				style={ { width: '33%' } }
				className="mdc-list mdc-list--two-line inline-demo-list"
			>
				<li className="mdc-list-item mdc-ripple-upgraded" tabIndex="0">
					<span className="mdc-list-item__text">
						<span className="mdc-list-item__primary-text">
							{ __( 'List item', 'material-theme-builder' ) }
						</span>
						<span className="mdc-list-item__secondary-text">
							{ __( 'Secondary Text...', 'material-theme-builder' ) }
						</span>
					</span>

					<span aria-hidden="true" className="mdc-list-item__meta">
						<button
							className={ classNames(
								iconStyle,
								'mdc-icon-button',
								'mdc-ripple-upgraded',
								'mdc-ripple-upgraded--unbounded'
							) }
						>
							remove_red_eye
						</button>
					</span>
				</li>
				<li className="mdc-list-item mdc-ripple-upgraded" tabIndex="-1">
					<span className="mdc-list-item__text">
						<span className="mdc-list-item__primary-text">
							{ __( 'List item', 'material-theme-builder' ) }
						</span>
						<span className="mdc-list-item__secondary-text">
							{ __( 'Secondary Text...', 'material-theme-builder' ) }
						</span>
					</span>

					<span aria-hidden="true" className="mdc-list-item__meta">
						<button
							className={ classNames(
								iconStyle,
								'mdc-icon-button',
								'mdc-ripple-upgraded',
								'mdc-ripple-upgraded--unbounded'
							) }
						>
							email
						</button>
					</span>
				</li>
				<li className="mdc-list-item mdc-ripple-upgraded" tabIndex="-1">
					<span className="mdc-list-item__text">
						<span className="mdc-list-item__primary-text">
							{ __( 'List item', 'material-theme-builder' ) }
						</span>
						<span className="mdc-list-item__secondary-text">
							{ __( 'Secondary Text...', 'material-theme-builder' ) }
						</span>
					</span>

					<span aria-hidden="true" className="mdc-list-item__meta">
						<button
							className={ classNames(
								iconStyle,
								'mdc-icon-button',
								'mdc-ripple-upgraded',
								'mdc-ripple-upgraded--unbounded'
							) }
						>
							share
						</button>
					</span>
				</li>
			</ul>
		</div>
	</div>
);

export default Lists;
