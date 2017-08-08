import React from 'react';
import {render} from 'react-dom';
import Main from './Main/Main';
import Luru from './luru/luru.react';
import style from './app.less';
import img from './Main/Head/banner@3x.png';
import axios from 'axios';

//meta中的user-scalable=no在iOS10 safari中已经失效，所以用js阻止用户缩放网页，
// meta中的user-scalable=no在iOS微信6.5.8依然有效。

//http://www.plaso.cn/wx/api.php?method=getWXSign
axios.get('/wx/api.php?method=getWXSign&url=' + encodeURIComponent(location.href)).then((wxInfo) => {
	console.log(wxInfo);
	setWXshareInfo(wxInfo.data);
});

function setWXshareInfo(wxInfo) {
	wx.config({
		debug: false,
		appId: wxInfo.appId, // 必填，公众号的唯一标识
		timestamp: wxInfo.timestamp, // 必填，生成签名的时间戳，切记时间戳是整数型，别加引号
		nonceStr: wxInfo.nonceStr, // 必填，生成签名的随机串
		signature: wxInfo.signature, // 必填，签名，见附录1
		jsApiList: [
			'onMenuShareTimeline',
			'onMenuShareAppMessage',
			'onMenuShareQQ',
			'onMenuShareWeibo',
			'onMenuShareQZone',
		]
	});
}
wx.ready(function () {
	var title = '伯索杯·微课大赛投票评选';
	var desc = '好微课成就好教师，好教师成就好机构；首届伯索杯·微课大赛投票进行中，快来投上一票吧~';
	var link = location.href;
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

});

document.addEventListener('touchstart', function (e) {
	if (e.touches.length > 1) {
		e.preventDefault();
	}
})
const ele = document.createElement('div');
ele.setAttribute('style', 'height:100%')
document.body.appendChild(ele);
render(<Main/>, ele)
