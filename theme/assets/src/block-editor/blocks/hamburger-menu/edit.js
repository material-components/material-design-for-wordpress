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
import { useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { useBlockProps, BlockControls, InnerBlocks } from '@wordpress/block-editor';
import { ToolbarButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { edit } from '@wordpress/icons';

/**
 * Internal dependencies.
 */
import Button from './button';

const ALLOWED_BLOCKS = [ 'material-design/drawer' ];

/**
 * Edit.
 *
 * @return {JSX.Element} Block edit.
 */
const Edit = ( props ) => {
	const { clientId } = props;
	const [ isOpen, setIsOpen ] = useState( false );
	const innerBlockCount = useSelect( select => select( 'core/block-editor' ).getBlock( clientId ).innerBlocks );

	const toggleDrawer = () => {
		setIsOpen( ! isOpen );
	};

	const drawerAppender = () => {
		if ( innerBlockCount.length < 1 ) {
			return <InnerBlocks.ButtonBlockAppender />;
		} else {
			return false;
		}
	}

	return (
		<>
			<BlockControls>
				<ToolbarButton
					label={ __( 'Edit Drawer', 'material-design' ) }
					onClick={ toggleDrawer }
					icon={ edit }
				/>
			</BlockControls>
			<div { ...useBlockProps() }>
				<Button />

				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					renderAppender={ () => drawerAppender() }
				/>
			</div>
		</>
	);
};

export default Edit;
