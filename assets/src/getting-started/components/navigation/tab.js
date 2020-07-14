const Tab = props => {
	const { text } = props;

	return (
		<button className="material-gsm__tab">
			<i className="material-icons">lens</i>
			<div className="material-gsm__tab-title">{ text }</div>
		</button>
	);
};

export default Tab;
