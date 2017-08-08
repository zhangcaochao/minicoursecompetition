import React, {Component} from 'react';
import style from './threadstyle.less';
import Icon from '../../../../common/icon/icon.react';

export default class rankItem extends Component {
	constructor(props) {
		super(props)
        this.newProps = {}
	}


	render() {
        this.newProps = {}
        for (let i in this.props) {
            if (i == 'listItem' || i == 'index') {
                continue;
            }
            this.newProps[i] = this.props[i];
        }

		let sn = null;
		if (this.props.listItem.sn / 10 < 1) {
			sn = '0' + this.props.listItem.sn
		} else {
			sn = this.props.listItem.sn
		}
		return (
			<li {...this.newProps} className={style.listItem}>
				<div className={style.index}>{this.props.index + 1}</div>
				<div className={style.wkInfo}>
					<div className={style.title}>
							<span className={style.sn}>
								编号{sn}
							</span>
						{this.props.listItem.wkName}
					</div>
					<div className={style.desc}>
						<span><Icon icon="icon-teacher" className={style.icon}/>{this.props.listItem.teacherName}</span>
						<span><Icon icon="icon-building" className={style.icon}/>{this.props.listItem.schoolName}</span>
					</div>
				</div>
				<div className={style.count}>
					<span>{this.props.listItem.count}</span>票
				</div>
			</li>
		)
	}
}