/**
 * Copyright 2021 Google LLC
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
import classNames from 'classnames';
import { MDCDialog } from '@material/dialog';

/**
 * WordPress dependencies
 */
import { withInstanceId } from '@wordpress/compose';
import { useEffect, useRef } from '@wordpress/element';

const Dialog = withInstanceId(
	( { open = false, title, content, actions, instanceId } ) => {
		const ref = useRef();

		useEffect( () => {
			if ( ! ref.current ) {
				return;
			}

			const dialog = new MDCDialog( ref.current );

			return () => {
				dialog.destroy();
			};
		}, [] );

		return (
			// eslint-disable-next-line jsx-a11y/no-static-element-interactions
			<div
				className={ classNames( 'mdc-dialog', {
					'mdc-dialog--open': open,
				} ) }
				ref={ ref }
			>
				<div className="mdc-dialog__container">
					<div
						className="mdc-dialog__surface"
						role="alertdialog"
						aria-modal="true"
						aria-labelledby={ `dialog-title-${ instanceId }` }
						aria-describedby={ `dialog-content-${ instanceId }` }
					>
						{ title && (
							<h2
								className="mdc-dialog__title"
								id={ `dialog-title-${ instanceId }` }
							>
								{ title }
							</h2>
						) }

						{ content && (
							<div
								className="mdc-dialog__content"
								id={ `dialog-content-${ instanceId }` }
							>
								{ content }
							</div>
						) }

						{ actions && (
							<div className="mdc-dialog__actions">
								{ actions }
							</div>
						) }
					</div>
				</div>
				<div className="mdc-dialog__scrim"></div>
			</div>
		);
	}
);

export default Dialog;
