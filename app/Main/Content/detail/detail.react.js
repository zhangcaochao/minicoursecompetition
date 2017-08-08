import React, {Component} from 'react';
import Icon from '../../../common/icon/icon.react';
import WkPlayer from '../player/wkPlayer.react';
import style from './detail.less';
import service from '../../../service/service';
import localStorageTool from '../../../common/localStroageTool/localStorageTool';
import pubsub from 'pubsub-js';
import img from '../../../Main/Head/banner@3x.png';

class detial extends Component {
	constructor(props) {
		super(props);
		this.newProps = {}
		for (let i in this.props) {
			if (i == 'wkId' || i == 'close') {
				continue
			}
			this.newProps[i] = this.props[i]
		}
		this.state = {
			isCountEd: false,
			wkDetial: {
				sn: '-1',
				teacherDesc: '',
				count: -1,
				wkId: '',
			},
		}
	}

	componentDidMount() {
		if (this.props.wkId) {
			this.getWkDetial(this.props.wkId);
			this.setShareUrl(this.props.wkId);
		}
	}

	componentWillUnmount() {
		this.setShareUrl('');
	}

	setShareUrl(wkid) {
		var title = '伯索杯·微课大赛投票评选';
		var desc = '好微课成就好教师，好教师成就好机构；首届伯索杯·微课大赛投票进行中，快来投上一票吧~';
		var link = 'http://' + location.host + '/wkds/' + (wkid ? '?wkid=' + wkid : '');
		console.log(link);
		var imgUrl = 'http://' + location.host + '/wkds/' + img;
		wx.showAllNonBaseMenuItem();
		wx.onMenuShareTimeline({
			title: title, // 分享标题
			link: link, // 分享链接
			imgUrl: imgUrl, // 分享图标
			success: function () {
				// 用户确认分享后执行的回调函数
			},
			cancel: function () {
				// 用户取消分享后执行的回调函数
			}
		});

		wx.onMenuShareAppMessage({
			title: title, // 分享标题
			desc: desc, // 分享描述
			link: link, // 分享链接
			imgUrl: imgUrl, // 分享图标
			type: 'link', // 分享类型,music、video或link，不填默认为link
			dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			success: function () {
				// 用户确认分享后执行的回调函数
			},
			cancel: function () {
				// 用户取消分享后执行的回调函数
			}
		});

		wx.onMenuShareQQ({
			title: title, // 分享标题
			desc: desc, // 分享描述
			link: link, // 分享链接
			imgUrl: imgUrl, // 分享图标
			success: function () {
				// 用户确认分享后执行的回调函数
			},
			cancel: function () {
				// 用户取消分享后执行的回调函数
			}
		});

		wx.onMenuShareWeibo({
			title: title, // 分享标题
			desc: desc, // 分享描述
			link: link, // 分享链接
			imgUrl: imgUrl, // 分享图标
			success: function () {
				// 用户确认分享后执行的回调函数
			},
			cancel: function () {
				// 用户取消分享后执行的回调函数
			}
		});

		wx.onMenuShareQZone({
			title: title, // 分享标题
			desc: desc, // 分享描述
			link: link, // 分享链接
			imgUrl: imgUrl, // 分享图标
			success: function () {
				// 用户确认分享后执行的回调函数
			},
			cancel: function () {
				// 用户取消分享后执行的回调函数
			}
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.wkId && nextProps.wkId !== this.props.wkId) {
			this.getWkDetial(nextProps.wkId);
		}
	}

	getWkDetial(wkid) {
		service.getSingleWkDetial({wkId: wkid}).then((result) => {
			this.setState({
				wkDetial: result.data,
				isCountEd: localStorageTool.hasItem('alreadyCountWkList', wkid) && (new Date().getDate() == localStorageTool.getItem('countDate'))
			})
		})
	}

	close(e) {
		e.stopPropagation();
		this.props.close();
	}

	countWk(wkId) {
		let nowDate = new Date().valueOf();
		let endDate = new Date('2017-05-26 00:00:00').valueOf();

		if(nowDate > endDate){
		    alert('本次投票已结束，谢谢您的参与');
		    return false;
        }
		service.countWk({wkId: wkId}).then((result) => {
			this.setState({
				isCountEd: true,
			}, () => {
				this.getWkDetial(this.props.wkId);
				localStorageTool.pushItem('alreadyCountWkList', wkId);
				localStorageTool.setItem('countDate', new Date().getDate())
				pubsub.publish('countWk');
			})
		})
	}

	render() {
		return (
			<div {...this.newProps} className={[this.props.className, style.detial].join(' ')}>
				<div className={style.close} onClick={this.close.bind(this)}>
					<Icon icon="icon-close" className={style.icon}/>
				</div>

				<div className={style.sn}>
					编号：{this.state.wkDetial.sn}
				</div>
				<WkPlayer wkId={this.state.wkDetial.wkLocation} className={style.player}/>
				<div className={style.teacherDesc}>
					<h1>教师简介</h1>
					<div className={style.teacherDescContent}>
						{this.state.wkDetial.teacherDesc}
					</div>
				</div>
				<div className={style.rankBar}>
					<div className={style.rankInfo}>
						排行 <span>{this.state.wkDetial.ranking}</span>
					</div>
					<button
						onClick={this.countWk.bind(this, this.props.wkId)}
						disabled={this.state.isCountEd}
					>
						<span className={style.buttonTitle}>
							{this.state.isCountEd ? '已投票' : '投票'}
						</span>
						<span className={style.rankNum}>
							{this.state.wkDetial.count}
							<span className={style.rankTitle}>票</span>
						</span>
					</button>
				</div>
			</div>
		)
	}
}

export default detial;