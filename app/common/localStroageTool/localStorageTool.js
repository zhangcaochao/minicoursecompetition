class localStorageTool {
	setItem(key, value) {
		return localStorage.setItem(key, value);
	}

	getItem(key) {
		return localStorage.getItem(key);
	}

	pushItem(key, value) {
		let tempArray = JSON.parse(localStorage.getItem(key)) || [];
		let hasValue = false;
		tempArray.map((item, index) => {
			if (item == value) {
				hasValue = true;
				return;
			}
		})

		if (!hasValue) {
			tempArray.push(value);
			localStorage.setItem(key, JSON.stringify(tempArray));
		}
		return tempArray;
	}

	hasItem(key, value) {
		if (value) {
			let tempArray = JSON.parse(localStorage.getItem(key)) || [];
			let hasValue = false;
			tempArray.map((item, index) => {
				if (item == value) {
					hasValue = true;
					return;
				}
			})

			return hasValue ? true : false;
		} else {
			return localStorage.getItem(key) ? true : false;
		}
	}

	deleteItem(key, value) {
		if (value) {
			let tempArray = JSON.parse(localStorage.getItem(key)) || [];
			tempArray.map((item, index) => {
				if (item == value) {
					tempArray.splice(index, 1);
				}
			})
			localStorage.setItem(key, JSON.stringify(tempArray));
		} else {
			localStorage.removeItem(key);
		}
	}
}

let lst = new localStorageTool();
let port = {
	setItem: lst.setItem,
	getItem: lst.getItem,
	pushItem: lst.pushItem,
	deleteItem: lst.deleteItem,
	hasItem: lst.hasItem
}

export default port;