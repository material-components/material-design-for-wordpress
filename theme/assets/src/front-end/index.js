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

import { topAppBarInit } from './components/top-app-bar';
import { drawerInit, drawerHandler } from './components/drawer';
import { scrollInit } from './components/scroll';
import rippleInit from './components/ripple';
import { textFieldInit } from './components/textfield';
import { commentsInit } from './components/comments';
import { floatingLabelInit } from './components/floating-label';
import { tabBarInit } from './components/tab-bar';
import { embedsInit } from './components/embeds';
import { widgetsInit } from './components/widgets';
import { masonryInit } from './components/masonry';
import './components/navigation';
import './components/skip-link-focus-fix';

document.addEventListener( 'DOMContentLoaded', () => {
	const topAppBar = topAppBarInit();
	const drawer = drawerInit();

	if ( topAppBar && drawer ) {
		drawerHandler( topAppBar, drawer );
	}

	scrollInit();
	floatingLabelInit();
	tabBarInit();
	textFieldInit();
	rippleInit();
	commentsInit();
	embedsInit();
	widgetsInit();
	masonryInit();
} );
