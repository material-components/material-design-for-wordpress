/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { BaseControl } from '@wordpress/components';
import { withInstanceId } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import './style.css';

const ImageRadioControl = withInstanceId(
	( {
		label,
		className,
		selected,
		help,
		onChange,
		options = [],
		instanceId,
	} ) => {
		const id = `image-radio-control-${ instanceId }`;
		const onChangeValue = event => onChange( event.target.value );

		return (
			options &&
			Array.isArray( options ) && (
				<BaseControl
					label={ label }
					id={ id }
					help={ help }
					className={ classnames(
						className,
						'components-radio-control',
						'components-image-radio-control'
					) }
				>
					{ options.map( ( option, index ) => {
						const Image = option.src;
						return (
							<div
								key={ `${ id }-${ index }` }
								className={ classnames( 'components-radio-control__option', {
									active: option.value === selected,
								} ) }
							>
								<input
									id={ `${ id }-${ index }` }
									className="components-radio-control__input"
									type="radio"
									name={ id }
									value={ option.value }
									onChange={ onChangeValue }
									checked={ option.value === selected }
									aria-describedby={ !! help ? `${ id }__help` : undefined }
								/>
								<label htmlFor={ `${ id }-${ index }` }>
									<div className="components-image-radio-control__image">
										{ Image &&
											( 'string' === typeof Image ? (
												<img src={ Image } alt={ option.label } />
											) : (
												<Image />
											) ) }
									</div>
									<span className="components-image-radio-control__label">
										{ option.label }
									</span>
								</label>
							</div>
						);
					} ) }
				</BaseControl>
			)
		);
	}
);

export default ImageRadioControl;
