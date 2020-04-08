import { __ } from '@wordpress/i18n';
import { H3 } from '../styles';

const ImageLists = ( { radius } ) => (
	<div>
		<H3>{ __( 'Image List', 'material-theme-builder' ) }</H3>
		<p>
			{ __(
				'This component can be created as a block in WordPress. Try it out now.',
				'material-theme-builder'
			) }
		</p>
		<div>
			<ul className="mdc-image-list mdc-image-list--with-text-protection">
				<li className="mdc-image-list__item image-list-item">
					<img
						style={ { borderRadius: `${ radius }px` } }
						className="mdc-image-list__image"
						src="https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/1.jpg"
						alt={ __( 'Text label', 'material-theme-builder' ) }
					/>
					<div
						className="mdc-image-list__supporting"
						style={ {
							borderBottomLeftRadius: `${ radius }px`,
							borderBottomRightRadius: `${ radius }px`,
						} }
					>
						<span className="mdc-image-list__label">
							{ __( 'Text label', 'material-theme-builder' ) }
						</span>
					</div>
				</li>
				<li
					className="mdc-image-list__item image-list-item"
					style={ { borderRadius: `${ radius }px` } }
				>
					<img
						style={ { borderRadius: `${ radius }px` } }
						className="mdc-image-list__image"
						src="https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/2.jpg"
						alt={ __( 'Text label', 'material-theme-builder' ) }
					/>
					<div
						className="mdc-image-list__supporting"
						style={ {
							borderBottomLeftRadius: `${ radius }px`,
							borderBottomRightRadius: `${ radius }px`,
						} }
					>
						<span className="mdc-image-list__label">
							{ __( 'Text label', 'material-theme-builder' ) }
						</span>
					</div>
				</li>
				<li
					className="mdc-image-list__item image-list-item"
					style={ { borderRadius: `${ radius }px` } }
				>
					<img
						style={ { borderRadius: `${ radius }px` } }
						className="mdc-image-list__image"
						src="https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/3.jpg"
						alt={ __( 'Text label', 'material-theme-builder' ) }
					/>
					<div
						className="mdc-image-list__supporting"
						style={ {
							borderBottomLeftRadius: `${ radius }px`,
							borderBottomRightRadius: `${ radius }px`,
						} }
					>
						<span className="mdc-image-list__label">
							{ __( 'Text label', 'material-theme-builder' ) }
						</span>
					</div>
				</li>
				<li
					className="mdc-image-list__item image-list-item"
					style={ { borderRadius: `${ radius }px` } }
				>
					<img
						style={ { borderRadius: `${ radius }px` } }
						className="mdc-image-list__image"
						src="https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/4.jpg"
						alt={ __( 'Text label', 'material-theme-builder' ) }
					/>
					<div
						className="mdc-image-list__supporting"
						style={ {
							borderBottomLeftRadius: `${ radius }px`,
							borderBottomRightRadius: `${ radius }px`,
						} }
					>
						<span className="mdc-image-list__label">
							{ __( 'Text label', 'material-theme-builder' ) }
						</span>
					</div>
				</li>
				<li
					className="mdc-image-list__item image-list-item"
					style={ { borderRadius: `${ radius }px` } }
				>
					<img
						style={ { borderRadius: `${ radius }px` } }
						className="mdc-image-list__image"
						src="https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/5.jpg"
						alt={ __( 'Text label', 'material-theme-builder' ) }
					/>
					<div
						className="mdc-image-list__supporting"
						style={ {
							borderBottomLeftRadius: `${ radius }px`,
							borderBottomRightRadius: `${ radius }px`,
						} }
					>
						<span className="mdc-image-list__label">
							{ __( 'Text label', 'material-theme-builder' ) }
						</span>
					</div>
				</li>
				<li
					className="mdc-image-list__item image-list-item"
					style={ { borderRadius: `${ radius }px` } }
				>
					<img
						style={ { borderRadius: `${ radius }px` } }
						className="mdc-image-list__image"
						src="https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/6.jpg"
						alt={ __( 'Text label', 'material-theme-builder' ) }
					/>
					<div
						className="mdc-image-list__supporting"
						style={ {
							borderBottomLeftRadius: `${ radius }px`,
							borderBottomRightRadius: `${ radius }px`,
						} }
					>
						<span className="mdc-image-list__label">
							{ __( 'Text label', 'material-theme-builder' ) }
						</span>
					</div>
				</li>
				<li
					className="mdc-image-list__item image-list-item"
					style={ { borderRadius: `${ radius }px` } }
				>
					<img
						style={ { borderRadius: `${ radius }px` } }
						className="mdc-image-list__image"
						src="https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/7.jpg"
						alt={ __( 'Text label', 'material-theme-builder' ) }
					/>
					<div
						className="mdc-image-list__supporting"
						style={ {
							borderBottomLeftRadius: `${ radius }px`,
							borderBottomRightRadius: `${ radius }px`,
						} }
					>
						<span className="mdc-image-list__label">
							{ __( 'Text label', 'material-theme-builder' ) }
						</span>
					</div>
				</li>
				<li
					className="mdc-image-list__item image-list-item"
					style={ { borderRadius: `${ radius }px` } }
				>
					<img
						style={ { borderRadius: `${ radius }px` } }
						className="mdc-image-list__image"
						src="https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/8.jpg"
						alt={ __( 'Text label', 'material-theme-builder' ) }
					/>
					<div
						className="mdc-image-list__supporting"
						style={ {
							borderBottomLeftRadius: `${ radius }px`,
							borderBottomRightRadius: `${ radius }px`,
						} }
					>
						<span className="mdc-image-list__label">
							{ __( 'Text label', 'material-theme-builder' ) }
						</span>
					</div>
				</li>
				<li
					className="mdc-image-list__item image-list-item"
					style={ { borderRadius: `${ radius }px` } }
				>
					<img
						style={ { borderRadius: `${ radius }px` } }
						className="mdc-image-list__image"
						src="https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/9.jpg"
						alt={ __( 'Text label', 'material-theme-builder' ) }
					/>
					<div
						className="mdc-image-list__supporting"
						style={ {
							borderBottomLeftRadius: `${ radius }px`,
							borderBottomRightRadius: `${ radius }px`,
						} }
					>
						<span className="mdc-image-list__label">
							{ __( 'Text label', 'material-theme-builder' ) }
						</span>
					</div>
				</li>
				<li
					className="mdc-image-list__item image-list-item"
					style={ { borderRadius: `${ radius }px` } }
				>
					<img
						style={ { borderRadius: `${ radius }px` } }
						className="mdc-image-list__image"
						src="https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/10.jpg"
						alt={ __( 'Text label', 'material-theme-builder' ) }
					/>
					<div
						className="mdc-image-list__supporting"
						style={ {
							borderBottomLeftRadius: `${ radius }px`,
							borderBottomRightRadius: `${ radius }px`,
						} }
					>
						<span className="mdc-image-list__label">
							{ __( 'Text label', 'material-theme-builder' ) }
						</span>
					</div>
				</li>
				<li
					className="mdc-image-list__item image-list-item"
					style={ { borderRadius: `${ radius }px` } }
				>
					<img
						style={ { borderRadius: `${ radius }px` } }
						className="mdc-image-list__image"
						src="https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/11.jpg"
						alt={ __( 'Text label', 'material-theme-builder' ) }
					/>
					<div
						className="mdc-image-list__supporting"
						style={ {
							borderBottomLeftRadius: `${ radius }px`,
							borderBottomRightRadius: `${ radius }px`,
						} }
					>
						<span className="mdc-image-list__label">
							{ __( 'Text label', 'material-theme-builder' ) }
						</span>
					</div>
				</li>
				<li
					className="mdc-image-list__item image-list-item"
					style={ { borderRadius: `${ radius }px` } }
				>
					<img
						style={ { borderRadius: `${ radius }px` } }
						className="mdc-image-list__image"
						src="https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/12.jpg"
						alt={ __( 'Text label', 'material-theme-builder' ) }
					/>
					<div
						className="mdc-image-list__supporting"
						style={ {
							borderBottomLeftRadius: `${ radius }px`,
							borderBottomRightRadius: `${ radius }px`,
						} }
					>
						<span className="mdc-image-list__label">
							{ __( 'Text label', 'material-theme-builder' ) }
						</span>
					</div>
				</li>
				<li
					className="mdc-image-list__item image-list-item"
					style={ { borderRadius: `${ radius }px` } }
				>
					<img
						style={ { borderRadius: `${ radius }px` } }
						className="mdc-image-list__image"
						src="https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/13.jpg"
						alt={ __( 'Text label', 'material-theme-builder' ) }
					/>
					<div
						className="mdc-image-list__supporting"
						style={ {
							borderBottomLeftRadius: `${ radius }px`,
							borderBottomRightRadius: `${ radius }px`,
						} }
					>
						<span className="mdc-image-list__label">
							{ __( 'Text label', 'material-theme-builder' ) }
						</span>
					</div>
				</li>
				<li
					className="mdc-image-list__item image-list-item"
					style={ { borderRadius: `${ radius }px` } }
				>
					<img
						style={ { borderRadius: `${ radius }px` } }
						className="mdc-image-list__image"
						src="https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/14.jpg"
						alt={ __( 'Text label', 'material-theme-builder' ) }
					/>
					<div
						className="mdc-image-list__supporting"
						style={ {
							borderBottomLeftRadius: `${ radius }px`,
							borderBottomRightRadius: `${ radius }px`,
						} }
					>
						<span className="mdc-image-list__label">
							{ __( 'Text label', 'material-theme-builder' ) }
						</span>
					</div>
				</li>
				<li
					className="mdc-image-list__item image-list-item"
					style={ { borderRadius: `${ radius }px` } }
				>
					<img
						style={ { borderRadius: `${ radius }px` } }
						className="mdc-image-list__image"
						src="https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/15.jpg"
						alt={ __( 'Text label', 'material-theme-builder' ) }
					/>
					<div
						className="mdc-image-list__supporting"
						style={ {
							borderBottomLeftRadius: `${ radius }px`,
							borderBottomRightRadius: `${ radius }px`,
						} }
					>
						<span className="mdc-image-list__label">
							{ __( 'Text label', 'material-theme-builder' ) }
						</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
);

export default ImageLists;
