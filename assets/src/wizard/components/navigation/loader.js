import { useEffect } from '@wordpress/element';
import { MDCCircularProgress } from '@material/circular-progress';

export const Loader = () => {
	useEffect( () => {
		const loaders = document.querySelectorAll( '.mdc-circular-progress' );

		for ( const loader of loaders ) {
			new MDCCircularProgress( loader );
		}
	}, [] );

	return (
		<div
			className="mdc-circular-progress mdc-circular-progress--small mdc-circular-progress--indeterminate"
			role="progressbar"
			aria-label="Example Progress Bar"
			aria-valuemin="0"
			aria-valuemax="1"
		>
			<div className="mdc-circular-progress__determinate-container">
				<svg
					className="mdc-circular-progress__determinate-circle-graphic"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle
						className="mdc-circular-progress__determinate-circle"
						cx="12"
						cy="12"
						r="8.75"
						strokeDasharray="54.978"
						strokeDashoffset="54.978"
					/>
				</svg>
			</div>
			<div className="mdc-circular-progress__indeterminate-container">
				<div className="mdc-circular-progress__spinner-layer">
					<div className="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-left">
						<svg
							className="mdc-circular-progress__indeterminate-circle-graphic"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<circle
								cx="12"
								cy="12"
								r="8.75"
								strokeDasharray="54.978"
								strokeDashoffset="27.489"
							/>
						</svg>
					</div>
					<div className="mdc-circular-progress__gap-patch">
						<svg
							className="mdc-circular-progress__indeterminate-circle-graphic"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<circle
								cx="12"
								cy="12"
								r="8.75"
								strokeDasharray="54.978"
								strokeDashoffset="27.489"
							/>
						</svg>
					</div>
					<div className="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-right">
						<svg
							className="mdc-circular-progress__indeterminate-circle-graphic"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<circle
								cx="12"
								cy="12"
								r="8.75"
								strokeDasharray="54.978"
								strokeDashoffset="27.489"
							/>
						</svg>
					</div>
				</div>
			</div>
		</div>
	);
};
