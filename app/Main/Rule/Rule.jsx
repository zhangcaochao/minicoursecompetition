import React from 'react'
import style from './rulestyle.less'
import Icon from '../../../app/common/icon/icon.react'
class Rule extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			visible:false
		}
	}

	handle(){
		this.setState({visible:!this.state.visible})
	}

	render(){
		return(
			<div className={style.rule}>
				<div className={style.title} onClick={this.handle.bind(this)}>
						<span className={style.span}>比赛细则</span>
						<Icon icon='icon-arrow_xia'  className={[style.icon,this.state.visible?style.rotate:''].join(' ')}/>
				</div>
				<div className={[style.ruledetail,this.state.visible?style.show:''].join(' ')} >
					<div className={style.introduction}>为了促进线上教学+线下教学模式更好地融合，
					进一步推动教师专业发展和教学能力提升，
					由南京伯索网络主办，江苏书人教育、武汉巨人教育、
					成都望子成龙、广州明师教育、郑州晨钟教育协办“伯索杯·微课大赛”——为教
					师搭建交流教学经验和展示教学风采的平台。
					</div>
					<div className={style.awardset}>
						<div>奖项设置</div>
						<div className={style.line}><div className={style.character}>一等奖</div><div className={style.num}> 1 </div><div className={style.character}>名，奖励：</div><div className={style.num}>1000</div><div className={style.character}>元</div></div>
						<div className={style.line}><div className={style.character}>二等奖</div><div className={style.num}> 2 </div><div className={style.character}>名，奖励：</div><div className={style.num}>500</div><div className={style.character}>元/人</div></div>
						<div className={style.line}><div className={style.character}>三等奖</div><div className={style.num}> 5 </div><div className={style.character}>名，奖励：</div><div className={style.num}>200</div><div className={style.character}>元/人</div></div>
						<div className={style.line}><div className={style.character}>团体奖</div><div className={style.num}> 1 </div><div className={style.character}>名，颁发：【最佳合作机构】奖杯</div></div>
					</div>
				</div>
			</div>
		)
	}
}

export default Rule;