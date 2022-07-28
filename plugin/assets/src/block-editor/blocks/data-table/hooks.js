/*
 *
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
 *
 *
 */

/**
 * WordPress dependencies.
 */
import { addFilter } from '@wordpress/hooks';
import coreDeprecatedV1 from './deprecated';

const blockName = 'core/table';

const addMigrationHook = ( settings, name ) => {
	if ( name !== blockName ) {
		return settings;
	}
	const copyDeprecated = settings.deprecated.slice( 0 );
	if ( settings.deprecated.length === 2 ) {
		copyDeprecated.unshift( coreDeprecatedV1 );
	} else {
		copyDeprecated.splice( 2, 0, coreDeprecatedV1 );
	}
	settings.deprecated = copyDeprecated;

	return settings;
};

addFilter(
	'blocks.registerBlockType',
	`namespace/${ blockName }/addMigration/addAttributesToBlock`,
	addMigrationHook
);
