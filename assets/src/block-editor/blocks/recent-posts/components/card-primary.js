/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { dateI18n, format } from '@wordpress/date';
import { RawHTML } from '@wordpress/element';

const CardPrimary = ( { titleTrimmed, displayPostDate, post, dateFormat } ) => (
	<div className="single-post-card__primary">
		<h2 className="single-post-card__title mdc-typography mdc-typography--headline6">
			{ titleTrimmed ? (
				<RawHTML>{ titleTrimmed }</RawHTML>
			) : (
				__( '(no title)', 'material-theme-builder' )
			) }
		</h2>
		{ displayPostDate && (
			<h3 className="single-post-card__subtitle mdc-typography mdc-typography--subtitle2">
				<time dateTime={ format( 'c', post.date_gmt ) }>
					{ dateI18n( dateFormat, post.date_gmt ) }
				</time>
			</h3>
		) }
	</div>
);

export default CardPrimary;
