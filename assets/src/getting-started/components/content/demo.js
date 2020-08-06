import { Fragment, useContext } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { STATUS } from '../../../wizard/constants';
import Button from '../../../wizard/components/navigation/button';
import TabContext from '../../context';
import { ACTIONS } from '../../constants';

export const Demo = () => {
	const { state, dispatch } = useContext( TabContext );
	const { contentStatus, status } = state;
	const icon = 'ok' !== contentStatus ? 'navigate_next' : null;
	const isDisabled = 'ok' === contentStatus;
	const isLoading = STATUS.PENDING === status;
	const text =
		'ok' !== contentStatus
			? __( 'Install', 'material-theme-builder' )
			: __( 'Installed', 'material-theme-builder' );

	const handleClick = () => {
		dispatch( { type: ACTIONS.INSTALL_DEMO_CONTENT } );
	};

	return (
		<Fragment>
			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ __( 'Demo content', 'material-theme-builder' ) }
			</h2>
			<p className="material-gsm__content-description">
				Aenean egestas, ante vitae placerat tempor, felis ipsum finibus lectus,
				at eleifend neque tellus ac elit. Praesent cursus lectus felis, a ornare
				metus varius in.
			</p>
			<div className="material-gsm__content-actions">
				<Button
					style="mdc-button--raised"
					text={ text }
					trailingIcon={ icon }
					onClick={ handleClick }
					disabled={ isDisabled }
					loading={ isLoading }
				/>
			</div>
		</Fragment>
	);
};
