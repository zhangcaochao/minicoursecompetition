import React from 'react'
import style from './headstyle.less'
class Head extends React.Component{
	constructor(props) {
		super(props);
		
	}

	render(){

		return(
			<div className={style.head}></div>
		)
	}
}

export default Head;