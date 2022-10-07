<template>
	<div class="p-0 m-0 w-100 h-100 overflow-hidden">
		<GradientBox
			backArrow="<"
			title="Explore"
			linkTo=""
			style="background-color: #2e2e30"
		/>
		<input class="input" />
		<div class="mt-4 mb-5 pb-5">
			<user-single
				v-for="(user, key) in users"
				:key="key"
				class="user-single"
				:username="user.username"
				:sunsign="user.signs.sun"
				:moonsign="user.signs.moon"
				:ascendsign="user.signs.ascending"
			></user-single>
		</div>
		<navigation-mobile></navigation-mobile>
	</div>
</template>

<script>
import GradientBox from "../components/GradientBox.vue";
import NavigationMobile from "../components/NavigationMobile.vue";
import UserSingle from "../components/UserSingle.vue";
export default {
	components: { GradientBox, NavigationMobile, UserSingle },
	data() {
		return {
			users: [],
		};
	},
	async created() {
		this.users = await this.$axios.$get(`${process.env.BACKEND_URL}/users`);
	},
};
</script>

<style scoped>
.user-single {
	z-index: -1;
}
</style>
