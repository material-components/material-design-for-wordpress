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
import {
	argbFromHex,
	themeFromSourceColor,
} from '@material/material-color-utilities';

const colorMigration = () => {
	const intColor = argbFromHex(
		window.material_m3_migration_color.primaryColor
	);
	const colorPalette = themeFromSourceColor( intColor );
	// @ts-ignore
	wp.ajax.post( 'm3_migrate_colors', {
		_wpnonce: window.material_m3_migration_color.nonce,
		colorPalette: JSON.stringify( colorPalette ),
	} );
};

document.addEventListener( 'DOMContentLoaded', () =>
	setTimeout( colorMigration, 1 )
);
