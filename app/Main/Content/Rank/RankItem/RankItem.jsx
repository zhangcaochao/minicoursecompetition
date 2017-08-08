import React from 'react'
import Content from '../RankContent/RankContent'
import style from './rankitemstyle.less'
import Icon from '../../../../common/icon/icon.react'
var events=require('../../../../../app/common/Tabs/Event'); 
export default class RankItem extends React.Component{
	constructor(props) {
		super(props);
		this.state={isActive:false}
		
	}

	getContent(){
		return {elem:Content}
	}

	handleClick(){
		events.publish('clickRankItem');
		this.setState({isActive:true});
	}

	componentDidMount() {
		events.subscribe('clickHomeItem',()=>{this.setState({isActive:false})})
	}

	render(){
		let icon;
		if(this.state.isActive){
			icon = 'icon-icon_ranking_selecte'
		}else{
			icon = 'icon-icon_ranking'
		}
		return (
			<div className={style.rankItem} onClick={this.handleClick.bind(this)}>
				<Icon icon={icon} className={style.icon} />
				<div className={style.character}>投票排名</div>
			</div>
		);
	}
}