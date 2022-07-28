/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';
import classnames from 'classnames';
import { Button, Popover } from '@wordpress/components';
import { Icon, cancelCircleFilled } from '@wordpress/icons';
import { decodeEntities } from '@wordpress/html-entities';
import { withInstanceId } from '@wordpress/compose';

import './style.css';

/**
 * This component can be used to show an item styled as a "tag", optionally with an `X` + "remove"
 * or with a popover that is shown on click.
 *
 * @param {Object}        props
 * @param {number|string} props.id
 * @param {string}        props.instanceId
 * @param {string}        props.label
 * @param {Object}        props.popoverContents
 * @param {Function}      props.remove
 * @param {string}        props.screenReaderLabel
 * @param {string}        props.className
 * @return {Object} -
 */
const Tag = ( {
	id,
	instanceId,
	label,
	popoverContents,
	remove,
	screenReaderLabel,
	className,
} ) => {
	const [ isVisible, setIsVisible ] = useState( false );

	screenReaderLabel = screenReaderLabel || label;
	if ( ! label ) {
		// A null label probably means something went wrong
		return null;
	}
	label = decodeEntities( label );
	const classes = classnames( 'material-design-tag', className, {
		'has-remove': !! remove,
	} );
	const labelId = `material-design-tag__label-${ instanceId }`;
	const labelTextNode = (
		<Fragment>
			<span className="screen-reader-text">{ screenReaderLabel }</span>
			<span aria-hidden="true">{ label }</span>
		</Fragment>
	);

	return (
		<span className={ classes }>
			{ popoverContents ? (
				<Button
					className="material-design-tag__text"
					id={ labelId }
					onClick={ () => setIsVisible( true ) }
				>
					{ labelTextNode }
				</Button>
			) : (
				<span className="material-design-tag__text" id={ labelId }>
					{ labelTextNode }
				</span>
			) }
			{ popoverContents && isVisible && (
				<Popover onClose={ () => setIsVisible( false ) }>
					{ popoverContents }
				</Popover>
			) }
			{ remove && (
				<Button
					className="material-design-tag__remove"
					onClick={ remove( id ) }
					label={ sprintf(
						/* translators: %s accessibility text for the remove button */
						__( 'Remove %s', 'material-design' ),
						label
					) }
					aria-describedby={ labelId }
				>
					<Icon
						icon={ cancelCircleFilled }
						size={ 20 }
						className="clear-icon"
					/>
				</Button>
			) }
		</span>
	);
};

export default withInstanceId( Tag );
