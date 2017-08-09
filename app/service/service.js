import axios from 'axios';
let port = '9000';
let url = 'http://www.plaso.cn/wkds/api/'
const net = axios.create({
	//正式发布的时候一定要加上这个参数，注释掉这个参数是因为开发的时候需要走webpack server代理。
	//baseURL:url,
	timeout: 5000,
})

class service {
	savewk(args) {
		let teacherName = args.teacherName,
			schoolName = args.schoolName,
			teacherDesc = args.teacherDesc,
			wkName = args.wkName,
			wkLocation = args.wkLocation
		return net.post(
			'savewk', {
				teacherName: args.teacherName,
				schoolName: args.schoolName,
				teacherDesc: args.teacherDesc,
				wkName: args.wkName,
				wkLocation: args.wkLocation
			}
		)
	}

	getallwk(args) {
		if (!args) {
			return net.get('getallwk');
		} else {
			return net.get('getallwk?sort=' + args.sort)
		}
	}

	countWk(args) {
		return net.post('countwk', {id: args.wkId})
	}

	getSingleWkDetial(args) {
		return net.get('getwk?id=' + args.wkId);
	}
}
let ser = new service();
let exports = {
	savewk: ser.savewk,
	getallwk: ser.getallwk,
	countWk: ser.countWk,
	getSingleWkDetial: ser.getSingleWkDetial
}

export default exports;