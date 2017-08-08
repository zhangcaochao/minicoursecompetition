import React from 'react'
import style from './searchContent.less';
import Icon from '../../../../common/icon/icon.react';
import service from '../../../../service/service';
import Thread from '../../Rank/Thread/Thread';
import Detial from '../../detail/detail.react';

export default class SearchContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchKeyWord: '',
			allWkList: [],
			searchResult: [],
			currentDetialId: null,
		}
	}

	getAllRank() {
		service.getallwk({sort:1}).then((response) => {
			console.log(response);
			let tempWkList = [];
			response.data.map((item, index) => {
				item.sn = item.sn / 10 < 1 ? '0' + item.sn : item.sn
				item.indexTrue = index;
				tempWkList.push(item);
			})
			this.setState({
				allWkList: tempWkList
			})
		})
	}

	componentDidMount() {
		this.getAllRank();
	}

	handleSearchKeyWordInput(e) {
		this.setState({
			searchKeyWord: e.target.value
		}, () => {
			this.searchInList();
		})
	}

	searchInList() {
		let tempResult = [];
		this.state.allWkList.map((item, index) => {
			if (
				(item.sn && item.sn.toString().indexOf(this.state.searchKeyWord) > -1) ||
				(item.teacherName && item.teacherName.indexOf(this.state.searchKeyWord) > -1) ||
				(item.wkName && item.wkName.indexOf(this.state.searchKeyWord) > -1)
			) {
				tempResult.push(item);
			}
		});

		this.setState({
			searchResult: tempResult
		})
	}

	showDetial(wkId) {
		this.setState({
			currentDetialId: wkId,
		})
	}

	close() {
		this.setState({
			currentDetialId: null,
		})
	}

	render() {
		let resultListDOM = [];
		this.state.searchResult.map((item, index) => {
			let trueId = item._id;
			resultListDOM.push(
				<Thread listItem={item} index={item.indexTrue}
						onClick={this.showDetial.bind(this, trueId)}
				/>
			)
		})

		let detialDOM = null;
		if (this.state.currentDetialId) {
			detialDOM = (
				<Detial wkId={this.state.currentDetialId} close={this.close.bind(this)}/>
			)
		}
		return (
			<div className={style.searchContent}>
				<div className={[style.detialContent, this.state.currentDetialId ? style.show : ''].join(' ')}>
					{detialDOM}
				</div>
				<div className={style.searchBar}>
					<label className={style.searchInput}>
						<Icon icon="icon-search" className={style.icon}/>
						<input
							type="search"
							value={this.state.searchKeyWord}
							onChange={this.handleSearchKeyWordInput.bind(this)}
							placeholder="输入编号、老师姓名、微课名称查询"
						/>
					</label>
					<button onClick={this.props.close}>取消</button>
				</div>
				<div className={style.searchResult}>
					{resultListDOM}
				</div>
			</div>
		)
	}
}