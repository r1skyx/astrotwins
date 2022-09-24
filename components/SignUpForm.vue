<template>
	<div class="p-0 m-0 bg-grey">
		<!--View when there is no info-->
		<form action="">
			<label>{{ authError }}</label>
			<div class="mb-4">
				<label class="mb-2" for="email">Email</label> <br />
				<input
					class="pl-2"
					type="text"
					v-model="email"
					name="email"
					placeholder="@"
					id=""
				/>
			</div>
			<div class="mb-4">
				<label class="mb-2" for="date">Birth Date</label> <br />
				<input
					class="pl-2"
					type="date"
					v-model="dateInput"
					name="date"
					placeholder=""
					id=""
				/>
			</div>
			<div class="mb-4">
				<label class="mb-2" for="time">Birth Time</label> <br />
				<input
					class="pl-2"
					type="time"
					v-model="timeInput"
					name="time"
					placeholder=""
					id=""
				/>
			</div>
			<div class="mb-4">
				<label class="mb-2" for="city">Birth Place</label> <br />
				<input
					class="pl-2"
					type="text"
					v-model="city"
					name="city"
					placeholder="London"
					id=""
				/>
			</div>
			<div class="mb-4">
				<label class="mb-2" for="password">Password</label> <br />
				<input
					class="pl-2"
					type="password"
					v-model="password"
					name="password"
					placeholder="..."
					id=""
				/>
			</div>
			<button type="submit" @click.prevent="submit">></button>
		</form>
	</div>
</template>

<script>
import FormInput from "../components/FormInput.vue";
export default {
	name: "SignUpForm",
	components: { FormInput },
	data() {
		return {
			email: "",
			password: "",
			id: this.$store.state.id, // Used to know if there is info. If there isn't, display form.
			city: "",
			lat: "",
			lon: "",
			dateInput: "", // To get date as Date object
			timeInput: "", // To get time as Date object
			//signs
			sunSign: "",
			moonSign: "",
			ascendSign: "",
			authError: "",
		};
	},
	computed: {
		hash() {
			return this.$store.state.hash; //api hash for star chart astronomy api
		},

		//to get lat and lon into chartData
		lati() {
			return this.lat;
		},

		longi() {
			return this.lon;
		},

		chartData() {
			return {
				day: this.date.getDate(),
				month: Number(this.date.getMonth() + 1),
				year: this.date.getFullYear(),
				hour: this.time.getHours(),
				min: this.time.getMinutes(),
				lat: this.lati,
				lon: this.longi,
				tzone: 1, // TODO : Find timezone based on location
			};
		},

		dbData() {
			return {
				email: this.email,
				birthdate: this.$moment(
					new Date(this.dateInput + " " + this.timeInput)
				).format("YYYY-MM-DD HH:mm:ss"),
				sunsign: this.sunSign,
				moonsign: this.moonSign,
				ascendsign: this.ascendSign,
			};
		},

		// Get date and time
		date() {
			return new Date(this.dateInput);
		},

		time() {
			return new Date(this.dateInput + " " + this.timeInput);
		},
	},
	methods: {
		// Get latitude and Longitude
		async getLatLong(city) {
			let info = await this.$axios.$get(
				`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=3c12e22d7cf2c8c260e90d6412b9bb59`
			);
			this.lat = info[0].lat;
			this.lon = info[0].lon;
			console.log(this.lat, this.lon);
		},
		async genChart() {
			console.log(this.date); // TODO: Generate star chart using AstronomyAPI
		},

		// Function to get 3 big signs
		async genPlanets({ chartData }) {
			await this.getLatLong(this.city); // wait until we have lat/lon
			console.log(this.lat);

			//hash stuff to access API
			let userId = "620618";
			let apiKey = "c88a4897f3e61fe2d5e7149577f6b54a";
			let hashStr = `${userId}:${apiKey}`;
			let hashGen = Buffer.from(hashStr, "utf8").toString("base64");
			console.log(hashGen);

			//Header configs
			let config = {
				headers: {
					authorization: "Basic " + hashGen,
				},
			};
			console.log(this.chartData);

			//Get the information for the signs
			let planetInfo = await this.$axios.$post(
				`https://json.astrologyapi.com/v1/planets/tropical`,
				this.chartData,
				config
			);
			console.log(planetInfo);
			this.sunSign = planetInfo[0].sign;
			this.moonSign = planetInfo[1].sign;
			this.ascendSign = planetInfo[10].sign;

			//change ID in store so that the form doesnt show
			//this.$store.commit('addId');
			//this.id = this.$store.state.id;
		},

		//Action for submit button
		async submit() {
			//generate chart signs
			await this.genPlanets(this.chartData);

			//firebase auth user creation
			try {
				await this.$fire.auth.createUserWithEmailAndPassword(
					this.email,
					this.password
				);
				try {
					let config = {
						headers: { "Access-Control-Allow-Origin": "*" },
					};
					let res = await this.$axios.$post(
						`http://localhost:8001/api/signup`,
						this.dbData,
						config
					);
					let userData = res[0];
					console.log(userData);
					this.$store.commit("addUserData", userData);
					this.$router.push("/");
				} catch (e) {
					console.log(e);
					throw error;
				}
			} catch (e) {
				//error handling
				let errorCode = e.code;
				console.log(errorCode);

				if (errorCode === "auth/email-already-in-use") {
					this.authError = "Email already in use";
				} else if (errorCode === "weak-password") {
					this.authError = "The password must be 6 characters long or more.";
				} else if (errorCode === "user-mismatch") {
					this.authError = "User credentials do not match";
				} else if (errorCode === "wrong-password") {
					this.authError = "The password is invalid";
				}
			}
			console.log("registration complete!");
		},
	},
	created() {
		this.$store.commit("buildHash");
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
}
</style>
