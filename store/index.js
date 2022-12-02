export const state = () => ({
	id: null,
	hash: "",
	appId: "e3e573e3-4c96-41c2-baf7-5cd448b7b495",
	appSecret:
		"0ae1fb83586566b4e562dc9e0530d3accfdaf4e01fe0c7ab0bef4572808cac5c2af558711f5a60e9a60a72217bfe666ba047a8aab766acc829997a836071c953f9d39b7581b523492a0fb659ffaf42a85fe7d59f0c0db7746eb50f35b55ebd839c8e58d4135e9e4e7c8a93ee1207016f",
	user: {
		uid: 0,
		email: "",
	},
	userData: {},
});

export const getters = {
	getHash(state) {
		return state.hash;
	},
	getUser(state) {
		return state.userData;
	},
};

export const mutations = {
	buildHash(state) {
		let hashStr = `${state.appId}:${state.appSecret}`;
		const hashGen = Buffer.from(hashStr, "utf8").toString("base64");
		state.hash = hashGen;
	},
	addId(state, id) {
		state.userData = id;
	},

	addUserData(state, userData) {
		state.userData = userData;
	},

	ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
		if (!authUser) {
			window.localStorage.clear();
			state.user = {
				uid: 0,
				email: "",
			};
			// claims = null
			// perform logout operations
		} else {
			const { uid, email } = authUser;
			state.user = { uid, email };
			// Do something with the authUser and the claims object...
		}
	},
};
