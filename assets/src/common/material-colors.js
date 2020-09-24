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
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

const MATERIAL_COLORS = [
	{
		color: '#ffebee',
		name: __( 'Red 50', 'material-theme-builder' ),
	},
	{
		color: '#ffcdd2',
		name: __( 'Red 100', 'material-theme-builder' ),
	},
	{
		color: '#ef9a9a',
		name: __( 'Red 200', 'material-theme-builder' ),
	},
	{
		color: '#e57373',
		name: __( 'Red 300', 'material-theme-builder' ),
	},
	{
		color: '#ef5350',
		name: __( 'Red 400', 'material-theme-builder' ),
	},
	{
		color: '#f44336',
		name: __( 'Red 500', 'material-theme-builder' ),
	},
	{
		color: '#e53935',
		name: __( 'Red 600', 'material-theme-builder' ),
	},
	{
		color: '#d32f2f',
		name: __( 'Red 700', 'material-theme-builder' ),
	},
	{
		color: '#c62828',
		name: __( 'Red 800', 'material-theme-builder' ),
	},
	{
		color: '#b71c1c',
		name: __( 'Red 900', 'material-theme-builder' ),
	},
	{
		color: '#ff8a80',
		name: __( 'Red A100', 'material-theme-builder' ),
	},
	{
		color: '#ff5252',
		name: __( 'Red A200', 'material-theme-builder' ),
	},
	{
		color: '#ff1744',
		name: __( 'Red A400', 'material-theme-builder' ),
	},
	{
		color: '#d50000',
		name: __( 'Red A700', 'material-theme-builder' ),
	},
	{
		color: '#fce4ec',
		name: __( 'Pink 50', 'material-theme-builder' ),
	},
	{
		color: '#f8bbd0',
		name: __( 'Pink 100', 'material-theme-builder' ),
	},
	{
		color: '#f48fb1',
		name: __( 'Pink 200', 'material-theme-builder' ),
	},
	{
		color: '#f06292',
		name: __( 'Pink 300', 'material-theme-builder' ),
	},
	{
		color: '#ec407a',
		name: __( 'Pink 400', 'material-theme-builder' ),
	},
	{
		color: '#e91e63',
		name: __( 'Pink 500', 'material-theme-builder' ),
	},
	{
		color: '#d81b60',
		name: __( 'Pink 600', 'material-theme-builder' ),
	},
	{
		color: '#c2185b',
		name: __( 'Pink 700', 'material-theme-builder' ),
	},
	{
		color: '#ad1457',
		name: __( 'Pink 800', 'material-theme-builder' ),
	},
	{
		color: '#880e4f',
		name: __( 'Pink 900', 'material-theme-builder' ),
	},
	{
		color: '#ff80ab',
		name: __( 'Pink A100', 'material-theme-builder' ),
	},
	{
		color: '#ff4081',
		name: __( 'Pink A200', 'material-theme-builder' ),
	},
	{
		color: '#f50057',
		name: __( 'Pink A400', 'material-theme-builder' ),
	},
	{
		color: '#c51162',
		name: __( 'Pink A700', 'material-theme-builder' ),
	},
	{
		color: '#f3e5f5',
		name: __( 'Purple 50', 'material-theme-builder' ),
	},
	{
		color: '#e1bee7',
		name: __( 'Purple 100', 'material-theme-builder' ),
	},
	{
		color: '#ce93d8',
		name: __( 'Purple 200', 'material-theme-builder' ),
	},
	{
		color: '#ba68c8',
		name: __( 'Purple 300', 'material-theme-builder' ),
	},
	{
		color: '#ab47bc',
		name: __( 'Purple 400', 'material-theme-builder' ),
	},
	{
		color: '#9c27b0',
		name: __( 'Purple 500', 'material-theme-builder' ),
	},
	{
		color: '#8e24aa',
		name: __( 'Purple 600', 'material-theme-builder' ),
	},
	{
		color: '#7b1fa2',
		name: __( 'Purple 700', 'material-theme-builder' ),
	},
	{
		color: '#6a1b9a',
		name: __( 'Purple 800', 'material-theme-builder' ),
	},
	{
		color: '#4a148c',
		name: __( 'Purple 900', 'material-theme-builder' ),
	},
	{
		color: '#ea80fc',
		name: __( 'Purple A100', 'material-theme-builder' ),
	},
	{
		color: '#e040fb',
		name: __( 'Purple A200', 'material-theme-builder' ),
	},
	{
		color: '#d500f9',
		name: __( 'Purple A400', 'material-theme-builder' ),
	},
	{
		color: '#aa00ff',
		name: __( 'Purple A700', 'material-theme-builder' ),
	},
	{
		color: '#ede7f6',
		name: __( 'Deep Purple 50', 'material-theme-builder' ),
	},
	{
		color: '#d1c4e9',
		name: __( 'Deep Purple 100', 'material-theme-builder' ),
	},
	{
		color: '#b39ddb',
		name: __( 'Deep Purple 200', 'material-theme-builder' ),
	},
	{
		color: '#9575cd',
		name: __( 'Deep Purple 300', 'material-theme-builder' ),
	},
	{
		color: '#7e57c2',
		name: __( 'Deep Purple 400', 'material-theme-builder' ),
	},
	{
		color: '#673ab7',
		name: __( 'Deep Purple 500', 'material-theme-builder' ),
	},
	{
		color: '#5e35b1',
		name: __( 'Deep Purple 600', 'material-theme-builder' ),
	},
	{
		color: '#512da8',
		name: __( 'Deep Purple 700', 'material-theme-builder' ),
	},
	{
		color: '#4527a0',
		name: __( 'Deep Purple 800', 'material-theme-builder' ),
	},
	{
		color: '#311b92',
		name: __( 'Deep Purple 900', 'material-theme-builder' ),
	},
	{
		color: '#b388ff',
		name: __( 'Deep Purple A100', 'material-theme-builder' ),
	},
	{
		color: '#7c4dff',
		name: __( 'Deep Purple A200', 'material-theme-builder' ),
	},
	{
		color: '#651fff',
		name: __( 'Deep Purple A400', 'material-theme-builder' ),
	},
	{
		color: '#6200ea',
		name: __( 'Deep Purple A700', 'material-theme-builder' ),
	},
	{
		color: '#e8eaf6',
		name: __( 'Indigo 50', 'material-theme-builder' ),
	},
	{
		color: '#c5cae9',
		name: __( 'Indigo 100', 'material-theme-builder' ),
	},
	{
		color: '#9fa8da',
		name: __( 'Indigo 200', 'material-theme-builder' ),
	},
	{
		color: '#7986cb',
		name: __( 'Indigo 300', 'material-theme-builder' ),
	},
	{
		color: '#5c6bc0',
		name: __( 'Indigo 400', 'material-theme-builder' ),
	},
	{
		color: '#3f51b5',
		name: __( 'Indigo 500', 'material-theme-builder' ),
	},
	{
		color: '#3949ab',
		name: __( 'Indigo 600', 'material-theme-builder' ),
	},
	{
		color: '#303f9f',
		name: __( 'Indigo 700', 'material-theme-builder' ),
	},
	{
		color: '#283593',
		name: __( 'Indigo 800', 'material-theme-builder' ),
	},
	{
		color: '#1a237e',
		name: __( 'Indigo 900', 'material-theme-builder' ),
	},
	{
		color: '#8c9eff',
		name: __( 'Indigo A100', 'material-theme-builder' ),
	},
	{
		color: '#536dfe',
		name: __( 'Indigo A200', 'material-theme-builder' ),
	},
	{
		color: '#3d5afe',
		name: __( 'Indigo A400', 'material-theme-builder' ),
	},
	{
		color: '#304ffe',
		name: __( 'Indigo A700', 'material-theme-builder' ),
	},
	{
		color: '#e3f2fd',
		name: __( 'Blue 50', 'material-theme-builder' ),
	},
	{
		color: '#bbdefb',
		name: __( 'Blue 100', 'material-theme-builder' ),
	},
	{
		color: '#90caf9',
		name: __( 'Blue 200', 'material-theme-builder' ),
	},
	{
		color: '#64b5f6',
		name: __( 'Blue 300', 'material-theme-builder' ),
	},
	{
		color: '#42a5f5',
		name: __( 'Blue 400', 'material-theme-builder' ),
	},
	{
		color: '#2196f3',
		name: __( 'Blue 500', 'material-theme-builder' ),
	},
	{
		color: '#1e88e5',
		name: __( 'Blue 600', 'material-theme-builder' ),
	},
	{
		color: '#1976d2',
		name: __( 'Blue 700', 'material-theme-builder' ),
	},
	{
		color: '#1565c0',
		name: __( 'Blue 800', 'material-theme-builder' ),
	},
	{
		color: '#0d47a1',
		name: __( 'Blue 900', 'material-theme-builder' ),
	},
	{
		color: '#82b1ff',
		name: __( 'Blue A100', 'material-theme-builder' ),
	},
	{
		color: '#448aff',
		name: __( 'Blue A200', 'material-theme-builder' ),
	},
	{
		color: '#2979ff',
		name: __( 'Blue A400', 'material-theme-builder' ),
	},
	{
		color: '#2962ff',
		name: __( 'Blue A700', 'material-theme-builder' ),
	},
	{
		color: '#e1f5fe',
		name: __( 'Light Blue 50', 'material-theme-builder' ),
	},
	{
		color: '#b3e5fc',
		name: __( 'Light Blue 100', 'material-theme-builder' ),
	},
	{
		color: '#81d4fa',
		name: __( 'Light Blue 200', 'material-theme-builder' ),
	},
	{
		color: '#4fc3f7',
		name: __( 'Light Blue 300', 'material-theme-builder' ),
	},
	{
		color: '#29b6f6',
		name: __( 'Light Blue 400', 'material-theme-builder' ),
	},
	{
		color: '#03a9f4',
		name: __( 'Light Blue 500', 'material-theme-builder' ),
	},
	{
		color: '#039be5',
		name: __( 'Light Blue 600', 'material-theme-builder' ),
	},
	{
		color: '#0288d1',
		name: __( 'Light Blue 700', 'material-theme-builder' ),
	},
	{
		color: '#0277bd',
		name: __( 'Light Blue 800', 'material-theme-builder' ),
	},
	{
		color: '#01579b',
		name: __( 'Light Blue 900', 'material-theme-builder' ),
	},
	{
		color: '#80d8ff',
		name: __( 'Light Blue A100', 'material-theme-builder' ),
	},
	{
		color: '#40c4ff',
		name: __( 'Light Blue A200', 'material-theme-builder' ),
	},
	{
		color: '#00b0ff',
		name: __( 'Light Blue A400', 'material-theme-builder' ),
	},
	{
		color: '#0091ea',
		name: __( 'Light Blue A700', 'material-theme-builder' ),
	},
	{
		color: '#e0f7fa',
		name: __( 'Cyan 50', 'material-theme-builder' ),
	},
	{
		color: '#b2ebf2',
		name: __( 'Cyan 100', 'material-theme-builder' ),
	},
	{
		color: '#80deea',
		name: __( 'Cyan 200', 'material-theme-builder' ),
	},
	{
		color: '#4dd0e1',
		name: __( 'Cyan 300', 'material-theme-builder' ),
	},
	{
		color: '#26c6da',
		name: __( 'Cyan 400', 'material-theme-builder' ),
	},
	{
		color: '#00bcd4',
		name: __( 'Cyan 500', 'material-theme-builder' ),
	},
	{
		color: '#00acc1',
		name: __( 'Cyan 600', 'material-theme-builder' ),
	},
	{
		color: '#0097a7',
		name: __( 'Cyan 700', 'material-theme-builder' ),
	},
	{
		color: '#00838f',
		name: __( 'Cyan 800', 'material-theme-builder' ),
	},
	{
		color: '#006064',
		name: __( 'Cyan 900', 'material-theme-builder' ),
	},
	{
		color: '#84ffff',
		name: __( 'Cyan A100', 'material-theme-builder' ),
	},
	{
		color: '#18ffff',
		name: __( 'Cyan A200', 'material-theme-builder' ),
	},
	{
		color: '#00e5ff',
		name: __( 'Cyan A400', 'material-theme-builder' ),
	},
	{
		color: '#00b8d4',
		name: __( 'Cyan A700', 'material-theme-builder' ),
	},
	{
		color: '#e0f2f1',
		name: __( 'Teal 50', 'material-theme-builder' ),
	},
	{
		color: '#b2dfdb',
		name: __( 'Teal 100', 'material-theme-builder' ),
	},
	{
		color: '#80cbc4',
		name: __( 'Teal 200', 'material-theme-builder' ),
	},
	{
		color: '#4db6ac',
		name: __( 'Teal 300', 'material-theme-builder' ),
	},
	{
		color: '#26a69a',
		name: __( 'Teal 400', 'material-theme-builder' ),
	},
	{
		color: '#009688',
		name: __( 'Teal 500', 'material-theme-builder' ),
	},
	{
		color: '#00897b',
		name: __( 'Teal 600', 'material-theme-builder' ),
	},
	{
		color: '#00796b',
		name: __( 'Teal 700', 'material-theme-builder' ),
	},
	{
		color: '#00695c',
		name: __( 'Teal 800', 'material-theme-builder' ),
	},
	{
		color: '#004d40',
		name: __( 'Teal 900', 'material-theme-builder' ),
	},
	{
		color: '#a7ffeb',
		name: __( 'Teal A100', 'material-theme-builder' ),
	},
	{
		color: '#64ffda',
		name: __( 'Teal A200', 'material-theme-builder' ),
	},
	{
		color: '#1de9b6',
		name: __( 'Teal A400', 'material-theme-builder' ),
	},
	{
		color: '#00bfa5',
		name: __( 'Teal A700', 'material-theme-builder' ),
	},
	{
		color: '#e8f5e9',
		name: __( 'Green 50', 'material-theme-builder' ),
	},
	{
		color: '#c8e6c9',
		name: __( 'Green 100', 'material-theme-builder' ),
	},
	{
		color: '#a5d6a7',
		name: __( 'Green 200', 'material-theme-builder' ),
	},
	{
		color: '#81c784',
		name: __( 'Green 300', 'material-theme-builder' ),
	},
	{
		color: '#66bb6a',
		name: __( 'Green 400', 'material-theme-builder' ),
	},
	{
		color: '#4caf50',
		name: __( 'Green 500', 'material-theme-builder' ),
	},
	{
		color: '#43a047',
		name: __( 'Green 600', 'material-theme-builder' ),
	},
	{
		color: '#388e3c',
		name: __( 'Green 700', 'material-theme-builder' ),
	},
	{
		color: '#2e7d32',
		name: __( 'Green 800', 'material-theme-builder' ),
	},
	{
		color: '#1b5e20',
		name: __( 'Green 900', 'material-theme-builder' ),
	},
	{
		color: '#b9f6ca',
		name: __( 'Green A100', 'material-theme-builder' ),
	},
	{
		color: '#69f0ae',
		name: __( 'Green A200', 'material-theme-builder' ),
	},
	{
		color: '#00e676',
		name: __( 'Green A400', 'material-theme-builder' ),
	},
	{
		color: '#00c853',
		name: __( 'Green A700', 'material-theme-builder' ),
	},
	{
		color: '#f1f8e9',
		name: __( 'Light Green 50', 'material-theme-builder' ),
	},
	{
		color: '#dcedc8',
		name: __( 'Light Green 100', 'material-theme-builder' ),
	},
	{
		color: '#c5e1a5',
		name: __( 'Light Green 200', 'material-theme-builder' ),
	},
	{
		color: '#aed581',
		name: __( 'Light Green 300', 'material-theme-builder' ),
	},
	{
		color: '#9ccc65',
		name: __( 'Light Green 400', 'material-theme-builder' ),
	},
	{
		color: '#8bc34a',
		name: __( 'Light Green 500', 'material-theme-builder' ),
	},
	{
		color: '#7cb342',
		name: __( 'Light Green 600', 'material-theme-builder' ),
	},
	{
		color: '#689f38',
		name: __( 'Light Green 700', 'material-theme-builder' ),
	},
	{
		color: '#558b2f',
		name: __( 'Light Green 800', 'material-theme-builder' ),
	},
	{
		color: '#33691e',
		name: __( 'Light Green 900', 'material-theme-builder' ),
	},
	{
		color: '#ccff90',
		name: __( 'Light Green A100', 'material-theme-builder' ),
	},
	{
		color: '#b2ff59',
		name: __( 'Light Green A200', 'material-theme-builder' ),
	},
	{
		color: '#76ff03',
		name: __( 'Light Green A400', 'material-theme-builder' ),
	},
	{
		color: '#64dd17',
		name: __( 'Light Green A700', 'material-theme-builder' ),
	},
	{
		color: '#f9fbe7',
		name: __( 'Lime 50', 'material-theme-builder' ),
	},
	{
		color: '#f0f4c3',
		name: __( 'Lime 100', 'material-theme-builder' ),
	},
	{
		color: '#e6ee9c',
		name: __( 'Lime 200', 'material-theme-builder' ),
	},
	{
		color: '#dce775',
		name: __( 'Lime 300', 'material-theme-builder' ),
	},
	{
		color: '#d4e157',
		name: __( 'Lime 400', 'material-theme-builder' ),
	},
	{
		color: '#cddc39',
		name: __( 'Lime 500', 'material-theme-builder' ),
	},
	{
		color: '#c0ca33',
		name: __( 'Lime 600', 'material-theme-builder' ),
	},
	{
		color: '#afb42b',
		name: __( 'Lime 700', 'material-theme-builder' ),
	},
	{
		color: '#9e9d24',
		name: __( 'Lime 800', 'material-theme-builder' ),
	},
	{
		color: '#827717',
		name: __( 'Lime 900', 'material-theme-builder' ),
	},
	{
		color: '#f4ff81',
		name: __( 'Lime A100', 'material-theme-builder' ),
	},
	{
		color: '#eeff41',
		name: __( 'Lime A200', 'material-theme-builder' ),
	},
	{
		color: '#c6ff00',
		name: __( 'Lime A400', 'material-theme-builder' ),
	},
	{
		color: '#aeea00',
		name: __( 'Lime A700', 'material-theme-builder' ),
	},
	{
		color: '#fffde7',
		name: __( 'Yellow 50', 'material-theme-builder' ),
	},
	{
		color: '#fff9c4',
		name: __( 'Yellow 100', 'material-theme-builder' ),
	},
	{
		color: '#fff59d',
		name: __( 'Yellow 200', 'material-theme-builder' ),
	},
	{
		color: '#fff176',
		name: __( 'Yellow 300', 'material-theme-builder' ),
	},
	{
		color: '#ffee58',
		name: __( 'Yellow 400', 'material-theme-builder' ),
	},
	{
		color: '#ffeb3b',
		name: __( 'Yellow 500', 'material-theme-builder' ),
	},
	{
		color: '#fdd835',
		name: __( 'Yellow 600', 'material-theme-builder' ),
	},
	{
		color: '#fbc02d',
		name: __( 'Yellow 700', 'material-theme-builder' ),
	},
	{
		color: '#f9a825',
		name: __( 'Yellow 800', 'material-theme-builder' ),
	},
	{
		color: '#f57f17',
		name: __( 'Yellow 900', 'material-theme-builder' ),
	},
	{
		color: '#ffff8d',
		name: __( 'Yellow A100', 'material-theme-builder' ),
	},
	{
		color: '#ffff00',
		name: __( 'Yellow A200', 'material-theme-builder' ),
	},
	{
		color: '#ffea00',
		name: __( 'Yellow A400', 'material-theme-builder' ),
	},
	{
		color: '#ffd600',
		name: __( 'Yellow A700', 'material-theme-builder' ),
	},
	{
		color: '#fff8e1',
		name: __( 'Amber 50', 'material-theme-builder' ),
	},
	{
		color: '#ffecb3',
		name: __( 'Amber 100', 'material-theme-builder' ),
	},
	{
		color: '#ffe082',
		name: __( 'Amber 200', 'material-theme-builder' ),
	},
	{
		color: '#ffd54f',
		name: __( 'Amber 300', 'material-theme-builder' ),
	},
	{
		color: '#ffca28',
		name: __( 'Amber 400', 'material-theme-builder' ),
	},
	{
		color: '#ffc107',
		name: __( 'Amber 500', 'material-theme-builder' ),
	},
	{
		color: '#ffb300',
		name: __( 'Amber 600', 'material-theme-builder' ),
	},
	{
		color: '#ffa000',
		name: __( 'Amber 700', 'material-theme-builder' ),
	},
	{
		color: '#ff8f00',
		name: __( 'Amber 800', 'material-theme-builder' ),
	},
	{
		color: '#ff6f00',
		name: __( 'Amber 900', 'material-theme-builder' ),
	},
	{
		color: '#ffe57f',
		name: __( 'Amber A100', 'material-theme-builder' ),
	},
	{
		color: '#ffd740',
		name: __( 'Amber A200', 'material-theme-builder' ),
	},
	{
		color: '#ffc400',
		name: __( 'Amber A400', 'material-theme-builder' ),
	},
	{
		color: '#ffab00',
		name: __( 'Amber A700', 'material-theme-builder' ),
	},
	{
		color: '#fff3e0',
		name: __( 'Orange 50', 'material-theme-builder' ),
	},
	{
		color: '#ffe0b2',
		name: __( 'Orange 100', 'material-theme-builder' ),
	},
	{
		color: '#ffcc80',
		name: __( 'Orange 200', 'material-theme-builder' ),
	},
	{
		color: '#ffb74d',
		name: __( 'Orange 300', 'material-theme-builder' ),
	},
	{
		color: '#ffa726',
		name: __( 'Orange 400', 'material-theme-builder' ),
	},
	{
		color: '#ff9800',
		name: __( 'Orange 500', 'material-theme-builder' ),
	},
	{
		color: '#fb8c00',
		name: __( 'Orange 600', 'material-theme-builder' ),
	},
	{
		color: '#f57c00',
		name: __( 'Orange 700', 'material-theme-builder' ),
	},
	{
		color: '#ef6c00',
		name: __( 'Orange 800', 'material-theme-builder' ),
	},
	{
		color: '#e65100',
		name: __( 'Orange 900', 'material-theme-builder' ),
	},
	{
		color: '#ffd180',
		name: __( 'Orange A100', 'material-theme-builder' ),
	},
	{
		color: '#ffab40',
		name: __( 'Orange A200', 'material-theme-builder' ),
	},
	{
		color: '#ff9100',
		name: __( 'Orange A400', 'material-theme-builder' ),
	},
	{
		color: '#ff6d00',
		name: __( 'Orange A700', 'material-theme-builder' ),
	},
	{
		color: '#fbe9e7',
		name: __( 'Deep Orange 50', 'material-theme-builder' ),
	},
	{
		color: '#ffccbc',
		name: __( 'Deep Orange 100', 'material-theme-builder' ),
	},
	{
		color: '#ffab91',
		name: __( 'Deep Orange 200', 'material-theme-builder' ),
	},
	{
		color: '#ff8a65',
		name: __( 'Deep Orange 300', 'material-theme-builder' ),
	},
	{
		color: '#ff7043',
		name: __( 'Deep Orange 400', 'material-theme-builder' ),
	},
	{
		color: '#ff5722',
		name: __( 'Deep Orange 500', 'material-theme-builder' ),
	},
	{
		color: '#f4511e',
		name: __( 'Deep Orange 600', 'material-theme-builder' ),
	},
	{
		color: '#e64a19',
		name: __( 'Deep Orange 700', 'material-theme-builder' ),
	},
	{
		color: '#d84315',
		name: __( 'Deep Orange 800', 'material-theme-builder' ),
	},
	{
		color: '#bf360c',
		name: __( 'Deep Orange 900', 'material-theme-builder' ),
	},
	{
		color: '#ff9e80',
		name: __( 'Deep Orange A100', 'material-theme-builder' ),
	},
	{
		color: '#ff6e40',
		name: __( 'Deep Orange A200', 'material-theme-builder' ),
	},
	{
		color: '#ff3d00',
		name: __( 'Deep Orange A400', 'material-theme-builder' ),
	},
	{
		color: '#dd2c00',
		name: __( 'Deep Orange A700', 'material-theme-builder' ),
	},
	{
		color: '#efebe9',
		name: __( 'Brown 50', 'material-theme-builder' ),
	},
	{
		color: '#d7ccc8',
		name: __( 'Brown 100', 'material-theme-builder' ),
	},
	{
		color: '#bcaaa4',
		name: __( 'Brown 200', 'material-theme-builder' ),
	},
	{
		color: '#a1887f',
		name: __( 'Brown 300', 'material-theme-builder' ),
	},
	{
		color: '#8d6e63',
		name: __( 'Brown 400', 'material-theme-builder' ),
	},
	{
		color: '#795548',
		name: __( 'Brown 500', 'material-theme-builder' ),
	},
	{
		color: '#6d4c41',
		name: __( 'Brown 600', 'material-theme-builder' ),
	},
	{
		color: '#5d4037',
		name: __( 'Brown 700', 'material-theme-builder' ),
	},
	{
		color: '#4e342e',
		name: __( 'Brown 800', 'material-theme-builder' ),
	},
	{
		color: '#3e2723',
		name: __( 'Brown 900', 'material-theme-builder' ),
	},
	{
		color: '#fafafa',
		name: __( 'Grey 50', 'material-theme-builder' ),
	},
	{
		color: '#f5f5f5',
		name: __( 'Grey 100', 'material-theme-builder' ),
	},
	{
		color: '#eeeeee',
		name: __( 'Grey 200', 'material-theme-builder' ),
	},
	{
		color: '#e0e0e0',
		name: __( 'Grey 300', 'material-theme-builder' ),
	},
	{
		color: '#bdbdbd',
		name: __( 'Grey 400', 'material-theme-builder' ),
	},
	{
		color: '#9e9e9e',
		name: __( 'Grey 500', 'material-theme-builder' ),
	},
	{
		color: '#757575',
		name: __( 'Grey 600', 'material-theme-builder' ),
	},
	{
		color: '#616161',
		name: __( 'Grey 700', 'material-theme-builder' ),
	},
	{
		color: '#424242',
		name: __( 'Grey 800', 'material-theme-builder' ),
	},
	{
		color: '#212121',
		name: __( 'Grey 900', 'material-theme-builder' ),
	},
	{
		color: '#eceff1',
		name: __( 'Blue Grey 50', 'material-theme-builder' ),
	},
	{
		color: '#cfd8dc',
		name: __( 'Blue Grey 100', 'material-theme-builder' ),
	},
	{
		color: '#b0bec5',
		name: __( 'Blue Grey 200', 'material-theme-builder' ),
	},
	{
		color: '#90a4ae',
		name: __( 'Blue Grey 300', 'material-theme-builder' ),
	},
	{
		color: '#78909c',
		name: __( 'Blue Grey 400', 'material-theme-builder' ),
	},
	{
		color: '#607d8b',
		name: __( 'Blue Grey 500', 'material-theme-builder' ),
	},
	{
		color: '#546e7a',
		name: __( 'Blue Grey 600', 'material-theme-builder' ),
	},
	{
		color: '#455a64',
		name: __( 'Blue Grey 700', 'material-theme-builder' ),
	},
	{
		color: '#37474f',
		name: __( 'Blue Grey 800', 'material-theme-builder' ),
	},
	{
		color: '#263238',
		name: __( 'Blue Grey 900', 'material-theme-builder' ),
	},
];

export default MATERIAL_COLORS;
