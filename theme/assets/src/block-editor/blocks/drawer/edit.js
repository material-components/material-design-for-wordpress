/**
 * Copyright 2022 Google LLC
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
import { useEffect, useRef } from '@wordpress/element';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * External dependencies.
 */
import { MDCDrawer } from '@material/drawer';

const ALLOWED_BLOCKS = [
	'core/site-logo',
	'core/site-title',
	'core/group',
	'material/navigation',
];

/**
 * Menu drawer.
 *
 * @param {Object}  props
 * @param {boolean} props.isOpen - Whether or not the drawer is open.
 *
 * @returns {JSX.Element}
 */
const Drawer = ( { isOpen } ) => {
	const drawer = useRef();

	useEffect( () => {
		if ( drawerRef.current ) {
			drawer.current = new MDCDrawer( drawerRef.current );

			drawer.current.singleSelection = true;
			drawer.current.open = true;
		}
	}, [] );

	useEffect( () => {
		if ( drawer.current ) {
			drawer.current.open = isOpen;
		}

	}, [ isOpen ] );

	const drawerRef = useRef( null );

	return (
		<div { ...useBlockProps() }>
			<aside
				className="mdc-drawer material-drawer mdc-drawer--modal"
				ref={ drawerRef }
			>
				<div className="mdc-drawer__header">drawer</div>
				<div className="mdc-drawer__content">
					<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
					{/* <nav className="mdc-list mdc-drawer__list" role="listbox"></nav> */}
				</div>
			</aside>
		</div>
	);
};

export default Drawer;
