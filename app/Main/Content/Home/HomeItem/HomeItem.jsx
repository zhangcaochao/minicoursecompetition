import React from 'react'
import Content from '../HomeContent/HomeContent'
import Icon from '../../../../common/icon/icon.react'
import style from './homeitemstyle.less'
var events=require('../../../../../app/common/Tabs/Event'); 
export default class HomeItem extends React.Component{
	constructor(props) {
		super(props);
		this.state={isActive:true}
	}

	getContent () {
		return {elem: Content};
	}

	handleClick(){
		events.publish('clickHomeItem');
		
		this.setState({isActive:true});
	}

	componentDidMount() {
		events.subscribe('clickRankItem',()=>{this.setState({isActive:false})})
	}

	render(){
		let icon;
		if(this.state.isActive){
			icon = 'icon-index_selected'
		}else{
			icon = 'icon-index' 
		}
		return (
			<div className={style.homeItem} onClick={this.handleClick.bind(this)}>
				<Icon icon={icon} className={style.icon}/>
				<div className={style.character}>首页</div>
			</div>
		)
	}
}