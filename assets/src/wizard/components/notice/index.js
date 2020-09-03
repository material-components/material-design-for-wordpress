/**
 * Prepare for notices
 *
 * @param {*} props Component props
 */
const Notice = props => {
	return (
		<div className={ `notice material-wizard__notice ${ props.type }` }>
			<p>{ props.message }</p>
		</div>
	);
};

export default Notice;
