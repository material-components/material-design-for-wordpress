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
import { Button, Flex, FlexItem, Modal } from '@wordpress/components';
import {
	store as coreStore,
	useEntityId,
	useEntityProp,
} from '@wordpress/core-data';
import { useDispatch } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';

export default function NavigationMenuDeleteControl( { onDelete } ) {
	const [ isConfirmModalVisible, setIsConfirmModalVisible ] = useState(
		false
	);
	const id = useEntityId( 'postType', 'wp_navigation' );
	const [ title ] = useEntityProp( 'postType', 'wp_navigation', 'title' );
	const { deleteEntityRecord } = useDispatch( coreStore );

	return (
		<>
			<Button
				className="wp-block-navigation-delete-menu-button"
				variant="secondary"
				isDestructive
				onClick={ () => {
					setIsConfirmModalVisible( true );
				} }
			>
				{ __( 'Delete menu' ) }
			</Button>
			{ isConfirmModalVisible && (
				<Modal
					title={ sprintf(
						/* translators: %s: the name of a menu to delete */
						__( 'Delete %s' ),
						title
					) }
					closeLabel={ __( 'Cancel' ) }
					onRequestClose={ () => setIsConfirmModalVisible( false ) }
				>
					<p>
						{ __(
							'Are you sure you want to delete this navigation menu?'
						) }
					</p>
					<Flex justify="flex-end">
						<FlexItem>
							<Button
								variant="secondary"
								onClick={ () => {
									setIsConfirmModalVisible( false );
								} }
							>
								{ __( 'Cancel' ) }
							</Button>
						</FlexItem>
						<FlexItem>
							<Button
								variant="primary"
								onClick={ () => {
									deleteEntityRecord(
										'postType',
										'wp_navigation',
										id,
										{ force: true }
									);
									onDelete();
								} }
							>
								{ __( 'Confirm' ) }
							</Button>
						</FlexItem>
					</Flex>
				</Modal>
			) }
		</>
	);
}
