<template>
	<div class="p-0 m-0 bg-grey h-100 overflow-hidden">
		<form action="">
			<label for="error">{{ error }}</label>
			<div
				class="mb-3 w-100"
				v-for="(entry, i) in newUserFormInput"
				:key="i"
				:id="i"
			>
				<label
					class="mb-2"
					:class="{
						'd-none': i === 'birthplace' || i === 'lat' || i === 'lon',
					}"
					for="i"
					>{{ i }}</label
				>
				<br
					:class="{
						'd-none': i === 'birthplace' || i === 'lat' || i === 'lon',
					}"
				/>
				<input
					:list="i"
					v-model="newUserFormInput[i]"
					:type="i"
					placeholder="yello"
					:class="{
						'd-none': i === 'birthplace' || i === 'lat' || i === 'lon',
					}"
				/>
				<div v-if="i == 'birthplace'" class="d-flex justify-content-between mb-3">
					<div v-for="(birth, i) in newUserFormInput.birthplace" :key="i">
						<label class="mb-2" for="i">{{ i }}</label> <br />
						<input
							min-length="2"
							class="w-100"
							:list="i"
							v-model="newUserFormInput.birthplace[i]"
							type="select"
							placeholder="yello"
							@input="getCities()"
						/>
						<datalist id="country">
							<option
								v-for="(city, i) in countriesList"
								:key="i"
								:value="city.country"
							>
								{{ city.country }}
							</option>
						</datalist>
						<datalist id="city">
							<option v-for="(city, i) in citiesList.data" :value="city" :key="i">
								{{ city }}
							</option>
						</datalist>
					</div>
				</div>
			</div>
			<button type="submit" @click.prevent="">></button>
		</form>
	</div>
</template>

<script>
let validator = require("email-validator");
export default {
	name: "SignUpForm",
	data() {
		return {
			//data from form that we will use
			newUserFormInput: {
				email: "",
				password: "",
				birthplace: {
					country: "",
					city: "",
				},
				date: "",
				time: "",
				lat: null,
				lon: null,
			},
			countriesList: [],
			citiesList: {},

			//error to display for form
			error: "",
		};
	},
	methods: {
		validateEmail(email) {
			if (!validator.validate(email)) {
				this.error = "Invalid Email";
			} else {
				this.error = "";
			}
			return;
		},

		// Get latitude and Longitude
		async getLatLong(city) {
			let info = await this.$axios.$get(
				`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=3c12e22d7cf2c8c260e90d6412b9bb59`
			);
			this.newUserFormInput.lat = info[0].lat;
			this.newUserFormInput.lon = info[0].lon;
			console.log(this.newUserFormInput.lat, this.newUserFormInput.lon);
		},

		//called after country has been selected to fetch cities of country
		async getCities() {
			let country = this.newUserFormInput.birthplace.country;
			let city = this.newUserFormInput.birthplace.city;

			var myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");

			var raw = JSON.stringify({
				country: country,
			});

			var requestOptions = {
				method: "POST",
				headers: myHeaders,
				body: raw,
				redirect: "follow",
			};

			fetch("https://countriesnow.space/api/v0.1/countries/cities", requestOptions)
				.then((response) => response.text())
				.then((result) => (this.citiesList = JSON.parse(result)))
				.catch((error) => console.log("error", error));

			this.getLatLong(city);
		},
	},
	async created() {
		//fetch coutries immediately after creation
		let countries = await this.$axios.$get(
			"https://countriesnow.space/api/v0.1/countries/"
		);
		this.countriesList = countries.data;
	},
};
// email: "",
// password: "",
// id: this.$store.state.id, // Used to know if there is info. If there isn't, display form.
// city: "",
// lat: "",
// lon: "",
// dateInput: "", // To get date as Date object
// timeInput: "", // To get time as Date object
// //signs
// sunSign: "",
// moonSign: "",
// ascendSign: "",
// authError: "",
// computed: {
// 	hash() {
// 		return this.$store.state.hash; //api hash for star chart astronomy api
// 	},

// 	//to get lat and lon into chartData
// 	lati() {
// 		return this.lat;
// 	},

// 	longi() {
// 		return this.lon;
// 	},

// 	chartData() {
// 		return {
// 			day: this.date.getDate(),
// 			month: Number(this.date.getMonth() + 1),
// 			year: this.date.getFullYear(),
// 			hour: this.time.getHours(),
// 			min: this.time.getMinutes(),
// 			lat: this.lati,
// 			lon: this.longi,
// 			tzone: 1, // TODO : Find timezone based on location
// 		};
// 	},

// 	dbData() {
// 		return {
// 			email: this.email,
// 			birthdate: this.$moment(
// 				new Date(this.dateInput + " " + this.timeInput)
// 			).format("YYYY-MM-DD HH:mm:ss"),
// 			sunsign: this.sunSign,
// 			moonsign: this.moonSign,
// 			ascendsign: this.ascendSign,
// 		};
// 	},

// 	// Get date and time
// 	date() {
// 		return new Date(this.dateInput);
// 	},

// 	time() {
// 		return new Date(this.dateInput + " " + this.timeInput);
// 	},
// },
// methods: {

// 	// Function to get 3 big signs
// 	async genPlanets({ chartData }) {
// 		await this.getLatLong(this.city); // wait until we have lat/lon
// 		console.log(this.lat);

// 		//hash stuff to access API
// 		let userId = "620618";
// 		let apiKey = "c88a4897f3e61fe2d5e7149577f6b54a";
// 		let hashStr = `${userId}:${apiKey}`;
// 		let hashGen = Buffer.from(hashStr, "utf8").toString("base64");
// 		console.log(hashGen);

// 		//Header configs
// 		let config = {
// 			headers: {
// 				authorization: "Basic " + hashGen,
// 			},
// 		};
// 		console.log(this.chartData);

// 		//Get the information for the signs
// 		let planetInfo = await this.$axios.$post(
// 			`https://json.astrologyapi.com/v1/planets/tropical`,
// 			this.chartData,
// 			config
// 		);
// 		console.log(planetInfo);
// 		this.sunSign = planetInfo[0].sign;
// 		this.moonSign = planetInfo[1].sign;
// 		this.ascendSign = planetInfo[10].sign;

// 		//change ID in store so that the form doesnt show
// 		//this.$store.commit('addId');
// 		//this.id = this.$store.state.id;
// 	},

// 	//Action for submit button
// 	async submit() {
// 		//generate chart signs
// 		await this.genPlanets(this.chartData);

// 		//firebase auth user creation
// 		try {
// 			await this.$fire.auth.createUserWithEmailAndPassword(
// 				this.email,
// 				this.password
// 			);
// 			try {
// 				let config = {
// 					headers: { "Access-Control-Allow-Origin": "*" },
// 				};
// 				let res = await this.$axios.$post(
// 					`http://localhost:8001/api/signup`,
// 					this.dbData,
// 					config
// 				);
// 				let userData = res[0];
// 				console.log(userData);
// 				this.$store.commit("addUserData", userData);
// 				this.$router.push("/");
// 			} catch (e) {
// 				console.log(e);
// 				throw error;
// 			}
// 		} catch (e) {
// 			//error handling
// 			let errorCode = e.code;
// 			console.log(errorCode);
// 			if (errorCode === "auth/email-already-in-use") {
// 				this.authError = "Email already in use";
// 			} else if (errorCode === "weak-password") {
// 				this.authError = "The password must be 6 characters long or more.";
// 			} else if (errorCode === "user-mismatch") {
// 				this.authError = "User credentials do not match";
// 			} else if (errorCode === "wrong-password") {
// 				this.authError = "The password is invalid";
// 			}
// 		}
// 		console.log("registration complete!");
// 	},
// },
// created() {
// 	this.$store.commit("buildHash");
</script>

<style scoped>
button {
	text-align: center;
	margin: auto;
	background-color: var(--bg-grey);
	border: none;
	font-size: 4rem;
	float: right;
	margin-right: 10px;
}

label {
	margin-left: 10px;
	font-size: 1.3em;
	text-transform: capitalize;
}
#country {
}

#city {
}

datalist {
	position: absolute;
	max-height: 20px;
	border: 0 none;
	overflow-x: hidden;
	overflow-y: auto;
}
</style>
