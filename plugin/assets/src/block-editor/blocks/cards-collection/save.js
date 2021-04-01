/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import VerticalCardLayout from '../card/components/vertical-card-layout';
import HorizontalCardLayout from '../card/components/horizontal-card-layout';
import getColumnSpan from './utils/get-column-span';
import Cards from './components/cards';

/**
 * Card Collections Save component.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.attributes - Block attributes.
 * @param {string} props.className - Block classes.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Save = ( { attributes, className } ) => {
	const {
		id,
		style,
		columns,
		align,
		gutter,
		cardsProps,
		numberOfCards,
	} = attributes;
	const columnSpan = getColumnSpan( style, columns );
	const items = [];

	for ( let cardIndex = 0; cardIndex < numberOfCards; cardIndex++ ) {
		const cardProps = {
			cardIndex,
			setAttributes: () => {},
			setter: () => {},
			isEditMode: false,
			...{ ...cardsProps[ cardIndex ] },
		};

		items.push(
			<div
				key={ cardIndex }
				className={ classnames( 'card-container', {
					[ `mdc-layout-grid__cell--span-${ columnSpan }` ]:
						style === 'grid' || style === 'list',
				} ) }
			>
				{ style === 'grid' && <VerticalCardLayout { ...cardProps } /> }
				{ style === 'list' && <HorizontalCardLayout { ...cardProps } /> }
				{ style === 'masonry' && <VerticalCardLayout { ...cardProps } /> }
			</div>
		);
	}

	return (
		<div
			className={ classnames( className, { [ `align${ align }` ]: align } ) }
			id={ id }
		>
			<Cards
				style={ style }
				gutter={ gutter }
				columns={ columns }
				cards={ items }
				saveContext={ true }
			/>
		</div>
	);
};

export default Save;
