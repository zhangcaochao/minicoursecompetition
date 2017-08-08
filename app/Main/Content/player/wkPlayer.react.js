import React, {Component} from 'react';

class wkPlayer extends Component {
	constructor(props) {
		super(props);


		let url = null;
		if (props.wkId) {
			url = 'http://www.plaso.cn/wx/play.php?sfId=' + props.wkId+'&withoutC=1';
		}
		this.state = {
			playUrl: url,
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.wkId) {
			let url = 'http://www.plaso.cn/wx/play.php?sfId=' + nextProps.wkId + '&withoutC=1';
			this.setState({
				playUrl: url,
			})
		}
	}

	render() {
		return (
			<iframe src={this.state.playUrl} frameBorder="0" className={[this.props.className].join(' ')}>

			</iframe>
		)
	}
}

export default wkPlayer;