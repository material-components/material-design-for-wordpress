/* global materialPluginPath */

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
						src={ materialPluginPath + 'assets/images/kitchen-sink/1.jpg' }
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
						src={ materialPluginPath + 'assets/images/kitchen-sink/2.jpg' }
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
						src={ materialPluginPath + 'assets/images/kitchen-sink/3.jpg' }
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
						src={ materialPluginPath + 'assets/images/kitchen-sink/4.jpg' }
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
						src={ materialPluginPath + 'assets/images/kitchen-sink/5.jpg' }
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
						src={ materialPluginPath + 'assets/images/kitchen-sink/6.jpg' }
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
						src={ materialPluginPath + 'assets/images/kitchen-sink/7.jpg' }
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
						src={ materialPluginPath + 'assets/images/kitchen-sink/8.jpg' }
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
						src={ materialPluginPath + 'assets/images/kitchen-sink/9.jpg' }
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
						src={ materialPluginPath + 'assets/images/kitchen-sink/10.jpg' }
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
						src={ materialPluginPath + 'assets/images/kitchen-sink/11.jpg' }
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
						src={ materialPluginPath + 'assets/images/kitchen-sink/12.jpg' }
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
						src={ materialPluginPath + 'assets/images/kitchen-sink/13.jpg' }
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
						src={ materialPluginPath + 'assets/images/kitchen-sink/14.jpg' }
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
						src={ materialPluginPath + 'assets/images/kitchen-sink/15.jpg' }
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
