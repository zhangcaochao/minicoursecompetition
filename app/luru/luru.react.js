import React, {PropTypes} from 'react';
import style from './luru.less';
import InputText from '../common/inputText/inputText.react';
import service from '../service/service';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			teacherName: '',
			schoolName: '',
			teacherDesc: '',
			wkName: '',
			wkLocation: '',
			allWk: [],
		}
	}

	handleInputChange(e) {
		let tempState = {};
		tempState[e.target.id] = e.target.value;
		this.setState(tempState);
	}

	saveWk() {
		let wkLocation = this.state.wkLocation.split('sfId=');
		service.savewk({
			teacherName: this.state.teacherName,
			schoolName: this.state.schoolName,
			teacherDesc: this.state.teacherDesc,
			wkName: this.state.wkName,
			wkLocation: wkLocation[1]//http://devapp.plaso.cn/wx/outSharePage.php?sfId=591d6689c04d5a5f48eb6c5d
		}).then((request) => {
			if (request.status === 200) {
				alert('录入成功，请刷新手机上的页面查看');
				this.getallwk();
			}
		})

	}

	getallwk() {
		service.getallwk({sort:1}).then((request) => {
			console.log(request);
			if (request.status === 200) {
				this.setState({
					allWk: request.data
				})
			}
		})
	}

	componentDidMount() {
		this.getallwk();
	}

	render() {
		return (
			<div className={style.luru}>
				<h1>伯索杯微课大赛</h1>
				<p>
					<span>老师姓名：</span>
					<InputText
						value={this.state.teacherName}
						onChange={this.handleInputChange.bind(this)}
						id="teacherName"
					/>
				</p>
				<p>
					<span>学校名称：</span>
					<InputText
						value={this.state.schoolName}
						onChange={this.handleInputChange.bind(this)}
						id="schoolName"
					/>
				</p>
				<p>
					<span>老师简介：</span>
					<textarea
						value={this.state.teacherDesc}
						onChange={this.handleInputChange.bind(this)}
						id="teacherDesc"
					></textarea>
				</p>
				<p>
					<span>微课名称：</span>
					<InputText
						value={this.state.wkName}
						onChange={this.handleInputChange.bind(this)}
						id="wkName"
					/>
				</p>
				<p>
					<span>微课地址：</span>
					<InputText
						value={this.state.wkLocation}
						onChange={this.handleInputChange.bind(this)}
						id="wkLocation"
					/>
				</p>
				<p>
					<button
						className={style.importMiniCourse}
						onClick={this.saveWk.bind(this)}
					>录入
					</button>
				</p>
				<p>
					当前微课数量{this.state.allWk.length};
				</p>
			</div>
		);
	}
}


export default Main;
