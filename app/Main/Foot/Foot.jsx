import React from 'react'
import style from './footstyle.less'
export default class Foot extends React.Component {
	constructor(props) {
		super(props);
		
	}

	render(){
		return(
			<div className={style.foot}>
				<div className={style.sentence}>伯索云学堂-您专属的在线教学服务平台</div>
			</div>
		)	
	}
}