import React from 'react'
import service from '../../../../service/service'
import style from './lessonstyle.less'
import Detail from '../../detail/detail.react'
import localStorageTool from '../../../../common/localStroageTool/localStorageTool';

export default class Lesson extends React.Component {
	constructor(props) {
		super(props);

        this.state = {
            showDetail: false,
            currentDetailId: null,
        }
	}

	handleClick() {
		this.setState({
			showDetail: true,
            currentDetailId: this.props.detail._id
		});
	}

	close() {
		this.setState({
			showDetail: false,
            currentDetailId: null,
		});

	}

	render(){
		let dom0,dom1,dom2,dom3,voted;
		if(this.props.detail.sn){
			if(this.props.detail.sn / 10 < 1){
				dom0 = '0' + this.props.detail.sn
			}else{
				dom0 = this.props.detail.sn;
			}
		}else{
			dom0='undefined'
		}
		if(this.props.detail.wkName){
			dom1=this.props.detail.wkName
			if(dom1.length>7){
				dom1=dom1.substr(0,7)+'...'
			}
		}else{
			dom1='undefined'
		}
		if(this.props.detail.schoolName){
			dom2=this.props.detail.schoolName
			if(dom2.length>7){
				dom2=dom2.substr(0,7)+'...'
			}
		}else{
			dom2='undefined'
		}
		if(this.props.detail.teacherName){
			dom3=this.props.detail.teacherName
			if(dom3.length>7){
				dom3=dom3.substr(0,7)+'...'
			}
		}else{
			dom3='undefined'
		}
		voted = localStorageTool.hasItem('alreadyCountWkList',this.props.detail._id) && (new Date().getDate() == localStorageTool.getItem('countDate'));
		let detialDOM = null;
		if(this.state.showDetail){
			detialDOM = (
				<Detail close={this.close.bind(this)} wkId={this.state.currentDetailId}/>
			)
		}
		return (
			<div className={style.lesson} onClick={this.handleClick.bind(this)}>
				<div className={style.detail} style={{display: this.state.showDetail ? '' : 'none'}}>
					{detialDOM}
				</div>
				<div className={style.head}>
					<div className={style.number}>编号{dom0}</div>
					<div className={style.desc}>{dom1}</div>
					<div className={style.school}>{dom2}</div>
					<div className={style.teacher}>{dom3}</div>
				</div>
				<div className={style.foot}>
					<div className={[style.vote, voted ? style.voted : ''].join(' ')}>{voted?"已投票":'投票'}</div>
					<div className={style.poll}>{this.props.detail.count}<span className={style.span}>票</span></div>
				</div>
			</div>
		)
	}
}