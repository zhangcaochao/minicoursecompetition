import React, {Component} from 'react';
import service from './service';

class testService extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		service.testService();
	}

	render() {
		return (
			<div>

			</div>
		)
	}
}

export default testService;