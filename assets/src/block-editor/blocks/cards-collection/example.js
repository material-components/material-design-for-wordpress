/**
 * Internal dependencies
 */
import { example as cardExample } from '../card/example';
import { DEFAULT_NUMBER_OF_CARDS } from './constants';

const cardsProps = [];

for ( let index = 0; index < DEFAULT_NUMBER_OF_CARDS; index++ ) {
	cardsProps.push( cardExample.attributes );
}

export const example = {
	attributes: {
		displayActions: false,
		cardsProps,
	},
};
