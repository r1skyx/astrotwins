<template>
	<div class="p-0 m-0 h-100 w-100">
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
					:class="{
						'd-none': i === 'birthplace' || i === 'lat' || i === 'lon',
					}"
				/>
			</div>
			<div class="d-flex justify-content-between mt-3">
				<div class="w-100">
					<label for="country">Country</label>
					<model-select
						class="modelSelect"
						v-model="newUserFormInput.birthplace.country"
						:options="countriesList"
						placeholder="Select Country"
						@select="getCitiesFromCountry()"
						@input="getCitiesFromCountry()"
					>
					</model-select>
				</div>
				<div class="w-100">
					<label for="country">City</label>
					<model-select
						class="modelSelect"
						v-model="newUserFormInput.birthplace.city"
						:options="citiesList"
						placeholder="Select City"
						@select="getCitiesLatLonAndTzone()"
						@input="getCitiesLatLonAndTzone()"
					>
					</model-select>
				</div>
			</div>
			<button type="submit" @click.prevent="submit">></button>
		</form>
	</div>
</template>

<script>
let validator = require("email-validator");
import { ModelSelect } from "vue-search-select";
export default {
	name: "SignUpForm",
	components: { ModelSelect },
	data() {
		return {
			//data from form that we will use
			newUserFormInput: {
				username: "",
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
			signs: {},
			countriesList: [],
			citiesList: [
				{
					value: null,
					text: "Pick country first",
				},
			],

			//error to display for form
			error: "",
		};
	},
	computed: {
		dateAndTime() {
			let computedDate = this.$moment(
				new Date(this.newUserFormInput.date + " " + this.newUserFormInput.time)
			).format("YYYY-MM-DDTHH:mm");
			console.log(computedDate);
			return computedDate;
		},
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

		turnDateToJSObj(date) {
			return new Date(this.date);
		},

		//use it to check if we have empty fields in form
		checkForEmptyFields(obj) {
			for (let key in obj) {
				if (!obj[key]) {
					this.error = "Empty fields";
					return false;
				}
			}
			this.error = "";
			return true;
		},

		async getCitiesFromCountry() {
			let countries = await this.$axios.$get(
				"https://countriesnow.space/api/v0.1/countries/"
			);
			let finalFormatArrayCities = [];
			let countriesList = countries.data;
			countriesList.forEach((country) => {
				if (country.country == this.newUserFormInput.birthplace.country) {
					let cities = country.cities;
					for (let i = 0; i < cities.length; i++) {
						let city = {
							value: cities[i],
							text: cities[i],
						};
						finalFormatArrayCities.push(city);
					}
				}
				this.citiesList = finalFormatArrayCities;
			});
		},
		// Get latitude and Longitude
		async getLatLong(city) {
			// if (this.checkIfCityIsInList(city)) {
			// 	return false;
			// }

			let info = await this.$axios.$get(
				`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${process.env.OPENWEATHER_MAP_KEY}`
			);
			this.newUserFormInput.lat = info[0].lat;
			this.newUserFormInput.lon = info[0].lon;
			console.log(this.newUserFormInput.lat, this.newUserFormInput.lon);
		},

		//get timezone from lat and long
		async timeZone() {
			let timezone = await this.$axios.$get(
				`https://api.bigdatacloud.net/data/reverse-geocode-with-timezone?latitude=${this.newUserFormInput.lat}&longitude=${this.newUserFormInput.lon}&localityLanguage=en&key=${process.env.BIG_DATA_CLOUD_KEY}`
			);
			//timezone is given in secs and we transform to num of hours
			console.log(timezone.timeZone.utcOffsetSeconds / 3600);
			return timezone;
		},

		//called after country has been selected to fetch cities of country, then call the lat/lon func and  timezone func, then stores them in data
		async getCitiesLatLonAndTzone() {
			let country = this.newUserFormInput.birthplace.country;
			let city = this.newUserFormInput.birthplace.city;
			if (city) {
				await this.getLatLong(city);
				this.timeZone();
			}
		},

		dataForSignsReq() {
			let data = this.newUserFormInput;
			if (
				!this.checkForEmptyFields(data) ||
				!this.checkForEmptyFields(data.birthplace)
			) {
				this.error = "Empty fields";
				return;
			}

			let date = new Date(this.dateAndTime);

			let reqData = {
				latitude: data.lat,
				longitude: data.lon,
				year: date.getFullYear(),
				month: date.getMonth() + 1,
				day: date.getDate(),
				hour: date.getHours(),
			};
			console.log(reqData);
			return reqData;
		},
		//Function to get 3 big signs
		async genPlanets() {
			//Get the information for the signs
			let data = this.dataForSignsReq();
			console.log(data);
			this.$axios.setHeader("allow", process.env.SIGNS_API_KEY);
			let signs = await this.$axios.$get(
				`http://localhost:8000/api/signs-calculator?latitude=${data.latitude}&longitude=${data.longitude}&year=${data.year}&month=${data.month}&day=${data.day}&hour=${data.hour}`
			);
			console.log(signs);
			this.signs = signs;
		},

		//
		async firebaseAuth() {
			try {
				await this.$fire.auth.createUserWithEmailAndPassword(
					this.newUserFormInput.email,
					this.newUserFormInput.password
				);
			} catch (e) {
				//error handling
				let errorCode = e.code;
				console.log(errorCode);
				if (errorCode === "auth/email-already-in-use") {
					this.error = "Email already in use";
				} else if (errorCode === "weak-password") {
					this.error = "The password must be 6 characters long or more.";
				} else if (errorCode === "user-mismatch") {
					this.error = "User credentials do not match";
				} else if (errorCode === "wrong-password") {
					this.error = "The password is invalid";
				}
			}
			console.log("registration complete!");
		},

		postData() {
			let data = {
				dateCreated: Date.now(),
				birthday: new Date(this.dateAndTime),
				username: this.newUserFormInput.username,
				email: this.newUserFormInput.email,
				sunsign: this.signs.sun,
				moonsign: this.signs.moon,
				ascendsign: this.signs.ascending,
				firebaseUID: this.$fire.auth.currentUser.uid,
			};

			return data;
		},
		async dbPost() {
			let data = this.postData();
			const params = new URLSearchParams();
			for (let field in data) {
				params.append(field, data[field]);
			}
			let url = process.env.BACKEND_URL;
			let res = await this.$axios.$post(`${url}/signup`, params);
			console.log(res);
		},

		async submit() {
			await this.genPlanets();
			await this.firebaseAuth();
			await this.dbPost();
			let userData = this.postData();
			this.$store.commit("addUserData", userData);
			this.$router.push("/");
		},
	},
	async created() {
		//fetch coutries immediately after creation
		let countries = await this.$axios.$get(
			"https://countriesnow.space/api/v0.1/countries/"
		);
		let finalFormatArray = [];
		let countriesList = [];
		countriesList = countries.data;
		countriesList.forEach((country) => {
			let countryValue = {
				value: country.country,
				text: country.country,
			};
			finalFormatArray.push(countryValue);
		});
		this.countriesList = finalFormatArray;
	},
};
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

.modelSelect {
	padding: 10px !important;
	border: 0 !important;
}

input .search {
	padding: 10px !important;
}

datalist {
	position: absolute;
	max-height: 20px;
	border: 0 none;
	overflow-x: hidden;
	overflow-y: auto;
}

.my-width {
	max-width: 47vw;
}
</style>
