import React, {Component} from 'react';
import style from './icon.less';

class icon extends Component {
	constructor(props) {
		super(props);
		let np = {};
		for (let i in props) {
			if (i == "className" || i == "icon") {
				continue;
			}
			np[i] = props[i];
		}
		this.np = np;
	}

	render() {
		return (
			<svg
				{...this.np}
				className={[style.icon, this.props.className].join(' ')}
			>
				<use xlinkHref={'#' + this.props.icon}></use>
			</svg>
		)
	}
}

export default icon;