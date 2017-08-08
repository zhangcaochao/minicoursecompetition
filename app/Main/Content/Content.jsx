import React from 'react'
import HomeItem from './Home/HomeItem/HomeItem'
import RankItem from './Rank/RankItem/RankItem'
import SearchItem from './Search/SearchItem/SearchItem'
import style from './contentstyle.less'
var radioManager = require("../../common/Tabs/Tabs");
var Tabs = radioManager.t;
var Container = radioManager.c;

import SearchContent from './Search/SearchContent/SearchContent';

class Content extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showSearch: false,
		}
	}

	showSearch() {
		console.log(1);
		this.setState({
			showSearch: true,
		})
	}

	closeSearch() {
		this.setState({
			showSearch: false,
		})
	}

	render() {
		let searchContentDOM = null;
		if (this.state.showSearch) {
			searchContentDOM = (
				<SearchContent close={this.closeSearch.bind(this)}/>
			)
		}
		return (
			<div className={style.mainFrame}>
				<Tabs topic='minilesson' className={style.tabs}>
					<HomeItem />
					<RankItem />
					<SearchItem onClick={this.showSearch.bind(this)}/>
				</Tabs>
				<div>
					<Container topic='minilesson'/>
					{searchContentDOM}
				</div>
			</div>
		)
	}
}


export default Content;