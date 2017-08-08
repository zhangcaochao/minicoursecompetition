import React from 'react'
import style from './searchitemstyle.less'
import Icon from '../../../../common/icon/icon.react'
export default class SearchItem extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div {...this.props} className={style.searchItem}>
				<div className={style.container}>
					<Icon icon='icon-search' className={style.icon}/>
					<div className={style.character}>搜索</div>
				</div>
			</div>
		);
	}

}
