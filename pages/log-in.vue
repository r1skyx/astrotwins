<template>
	<div>
		<gradient-box
			backArrow="<"
			logo="true"
			linkTo=""
			class="bg-grey position-absolute"
		></gradient-box>
		<b-container class="d-flex align-items-center p-0 m-0 bg-grey vh-100">
			<!--View when there is no info-->
			<form action="" align-v="center" align-h="center">
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
				<button type="submit" @click.prevent="final">></button>
			</form>
		</b-container>
	</div>
</template>

<script>
import GradientBox from "../components/GradientBox.vue";
export default {
	name: "LogInForm",
	components: { GradientBox },
	data() {
		return {
			email: "",
			password: "",
			authError: "",
		};
	},
	methods: {
		//Action for submit button
		async submit() {
			//firebase auth user
			try {
				await this.$fire.auth.signInWithEmailAndPassword(this.email, this.password);
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
				} else if (errorCode === "auth/invalid-email") {
					this.authError = "The email is invalid";
				} else {
					this.authError = e.message;
				}
			}
		},

		async authorize() {
			try {
				let url = process.env.BACKEND_URL;

				let res = await this.$axios.$post(`${url}/login`, user);
				let id = this.$fire.auth.currentUser.uid;
				console.log(id);
				let user = {
					firebaseUID: id,
				};
				console.log(res);
				let headers = {
					headers: {
						Authorization: `Bearer ${res.accessToken}`,
					},
				};
				let userData = await this.$axios.$get(`${url}/users/${id}`, headers);
				console.log(userData);
				this.$router.push("/");
			} catch (e) {
				console.log(e);
				throw error;
			}
		},

		final() {
			this.submit();
			setTimeout(() => {
				this.authorize();
			}, 1000);
		},
	},
	created() {
		if (this.id) {
			this.$router.push("/");
			return;
		}
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
