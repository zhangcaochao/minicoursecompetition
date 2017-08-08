import React, {Component} from 'react';
import style from './inputText.less';

class inputText extends Component {
	constructor(props) {
		super(props);
	}


	render() {
		return (//{...this.props}继承了component引用的时候设置的props，但是后面的className会覆盖之前的props中的className，顺序不能颠倒
			<input type="text" {...this.props} className={[this.props.className, style.inputText].join(' ')}/>
		)
	}
}

export default inputText;