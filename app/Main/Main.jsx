import React, {PropTypes} from 'react';
import style from './style.less';
import Head from './Head/Head';
import Rule from './Rule/Rule';
import Content from './Content/Content';
import Foot from './Foot/Foot';
import Detail from '../Main/Content/detail/detail.react';


class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentDetailId: null
		}
	}

	componentDidMount() {
		let s = location.search.substr(location.search.indexOf('wkid='));
		let search = s.split('&');
		let option = {}
		for (let i in search) {
			let t = search[i].split('=');
			option[t[0]] = t[1];
		}
		let wkid = option.wkid || null;
		console.log(wkid);
		if (wkid) {
			this.setState({
				currentDetailId: wkid
			})
		}
	}

	close() {
		this.setState({
			currentDetailId: null
		})
	}

	render() {
		let detailDOM = null;
		if (this.state.currentDetailId) {
			detailDOM = (
				<Detail close={this.close.bind(this)} wkId={this.state.currentDetailId}/>
			)
		}
		return (
			<div className={style.main}>
				<div className={[style.firstDetail, this.state.currentDetailId ? style.show : ''].join(' ')}>
					{detailDOM}
				</div>
				<Head />
				<Rule />
				<Content />
				<Foot />
			</div>
		);
	}
}


export default Main;
