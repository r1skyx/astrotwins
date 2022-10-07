<template>
	<div class="">
		<b-row>
			<b-col cols="12" class="text-center">
				<h1><fa icon="user" /></h1>
				<h1>{{ user.username }}</h1>
				<a
					><h4 class="my-3"><u class="text-gold">Add Friend</u></h4></a
				>
				<section-signs
					:sunsign="user.signs.sun"
					:ascendsign="user.signs.ascending"
					:moonsign="user.signs.moon"
				></section-signs>
			</b-col>
		</b-row>
	</div>
</template>

<script>
import SectionSigns from "../../components/SectionSigns.vue";
export default {
	name: "UserPage",
	components: { SectionSigns },
	data() {
		return {};
	},
	async asyncData({ params, $axios }) {
		let user = await $axios.$get(
			`${process.env.BACKEND_URL}/users/${params.user}`
		);
		user = user[0];
		return { user };
	},
};
</script>
