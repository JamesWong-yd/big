const database = {
	state: {
		data: [],
		moneydata: [],
		housedata: []
	},
	mutations: {
		SETDATABASE_DATA(state, val) {
			state.data.push(val)
		},
		REMOVEDATABASE_DATA(state) {
			state.data = []
		},
		INIT_DATABASE(state, val) {
			state.data = val
		}
	}
};

export default database;