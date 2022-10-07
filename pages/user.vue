<template>
	<div class="bg-grey h-100">
		<GradientBox
			backArrow="<"
			title="Your account"
			linkTo=""
			style="background-color: #2e2e30"
		/>
		<nuxt-link to=""><h2 class="ml-2">Your account</h2></nuxt-link>
		<button class="ml-2" @click="signOut"><h2>Sign out</h2></button>
		<navigation-mobile></navigation-mobile>
	</div>
</template>

<script>
import GradientBox from "../components/GradientBox.vue";
import NavigationMobile from "../components/NavigationMobile.vue";
export default {
	name: "UserPage",
	components: { GradientBox, NavigationMobile },
	data() {
		return {};
	},
	methods: {
		async signOut() {
			await this.$fire.auth.signOut();
			this.$router.push("/");
		},
	},
};
</script>

<style scoped>
button {
	background-color: var(--bg-grey);
	border: none;
}
</style>
