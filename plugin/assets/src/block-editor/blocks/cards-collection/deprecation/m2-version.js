/*
 *  Copyright 2022 Google LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import getColumnSpan from '../utils/get-column-span';
import classnames from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';
import Cards from './m2/cards';
import VerticalCardLayout from './m2/vertical-card-layout';
import HorizontalCardLayout from './m2/horizontal-card-layout';

const attributesM2 = {
	id: {
		type: 'string',
		source: 'attribute',
		attribute: 'id',
		selector: '*',
	},
	style: {
		type: 'string',
		default: 'masonry',
	},
	align: {
		type: 'string',
		default: 'wide',
	},
	columns: {
		type: 'number',
		default: 2,
	},
	contentLayout: {
		type: 'string',
		default: 'text-under-media',
	},
	numberOfCards: {
		type: 'number',
		default: 2,
	},
	cardsProps: {
		type: 'array',
		default: [],
	},
	gutter: {
		type: 'object',
		default: {
			desktop: 24,
			tablet: 16,
			mobile: 16,
		},
	},
	cornerRadius: {
		type: 'number',
	},
	lightbox: {
		type: 'boolean',
		default: false,
	},
	cardStyle: {
		enum: [ 'global', 'elevated', 'outlined' ],
		default: 'global',
		type: 'string',
	},
	allowIndividualStyleOverride: {
		type: 'boolean',
		default: false,
	},
	allowIndividualContentOverride: {
		type: 'boolean',
		default: false,
	},
	displayTitle: {
		type: 'boolean',
		default: true,
	},
	displaySecondaryText: {
		type: 'boolean',
		default: true,
	},
	displayImage: {
		type: 'boolean',
		default: true,
	},
	displaySupportingText: {
		type: 'boolean',
		default: true,
	},
	displayActions: {
		type: 'boolean',
		default: true,
	},
	displaySecondaryActionButton: {
		type: 'boolean',
		default: false,
	},
	imageElement: {
		type: 'boolean',
		default: true,
	},
};

const Save = ( { attributes } ) => {
	const {
		id,
		style,
		columns,
		align,
		gutter,
		cardsProps,
		numberOfCards,
		imageElement,
	} = attributes;
	const columnSpan = getColumnSpan( style, columns );
	const items = [];

	for ( let cardIndex = 0; cardIndex < numberOfCards; cardIndex++ ) {
		const cardProps = {
			cardIndex,
			setAttributes: () => {},
			setter: () => {},
			isEditMode: false,
			imageElement,
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
				{ style === 'list' && (
					<HorizontalCardLayout { ...cardProps } />
				) }
				{ style === 'masonry' && (
					<VerticalCardLayout { ...cardProps } />
				) }
			</div>
		);
	}

	const blockProps = useBlockProps.save( {
		className: classnames( {
			[ `align${ align }` ]: align,
		} ),
	} );

	return (
		<div { ...blockProps } id={ id }>
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

export const SaveM2 = {
	attributes: attributesM2,
	supports: { align: [ 'wide', 'full' ] },
	save: Save,
};
