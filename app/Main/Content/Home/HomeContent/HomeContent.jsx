import React from 'react'
import service from '../../../../service/service'
import style from './HomeContentStyle.less'
import Lesson from '../Lesson/Lesson.jsx'
import pubsub from 'pubsub-js';
export default class HomeContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		}
	}

	getAllWk() {
		service.getallwk().then(item => {
			console.log(item);
			this.setState({
				data: item.data
			})
		});
	}

	componentDidMount() {
		this.getAllWk();
		pubsub.subscribe('countWk', () => {
			this.getAllWk();
		})
	}


	render() {
		let dom = this.state.data.map((item, index) => {
			return <Lesson detail={item} key={index}/>
		})

		dom.push(
			<div className={style.fakeLesson}></div>
		)
		return (
			<div className={style.HomeContent}>
				{dom}
			</div>
		);
	}
}