import React from 'react';
import style from './rankContent.less';
import service from '../../../../service/service';
import Icon from '../../../../common/icon/icon.react';
import ListItem from '../Thread/Thread';

export default class RankContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rankList: []
		}
	}

	getAllRank() {
		service.getallwk({sort: 1}).then((response) => {
			console.log(response);
			this.setState({
				rankList: response.data
			})
		})
	}

	componentDidMount() {
		this.getAllRank();
	}

	render() {
		let rankListDOM = [];
		this.state.rankList.map((item, index) => {
			rankListDOM.push(
				<ListItem listItem={item} index={index} key={item.sn}/>
			)
		})
		return (
			<div className={style.rankContent}>
				<ul className={style.rankList}>
					{rankListDOM}
				</ul>
			</div>
		)
	}
}