<template>
	<div class="bg-grey h-100">
		<GradientBox
			backArrow="<"
			logo="true"
			linkTo=""
			style="background-color: #2e2e30"
		/>
		<b-container>
			<b-row>
				<b-col cols="12" class="text-center">
					<h1><fa icon="user" /></h1>
					<h1>{{ user.userRequested.username }}</h1>
					<a v-if="user.friendStatus != 3 && user.friendStatus != 1"
						><h4 class="my-3" @click="sendFriendRequest()">
							<u class="text-gold">Add Friend</u>
						</h4></a
					>
					<a v-if="user.friendStatus === 1"><h4 class="my-3">Request sent</h4></a>
					<section-signs
						:sunsign="user.userRequested.signs.sun"
						:ascendsign="user.userRequested.signs.ascending"
						:moonsign="user.userRequested.signs.moon"
					></section-signs>
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>
import SectionSigns from "../../components/SectionSigns.vue";
import GradientBox from "../../components/GradientBox.vue";
export default {
	name: "UserPage",
	components: { SectionSigns, GradientBox },
	data() {
		return {
			user: {},
		};
	},
	async asyncData({ params, $axios, store }) {
		let currentUser = store.state.userData.id;
		let user = await $axios.$get(
			`${process.env.BACKEND_URL}/users/${params.user}/${currentUser}`
		);
		return { user };
	},
	methods: {
		async sendFriendRequest() {
			let requested = this.user.userRequested._id;
			let requester = this.$store.state.userData.id;
			let user = await this.$axios.$post(
				`${process.env.BACKEND_URL}/friends/${requested}`,
				{
					requester: requester,
				}
			);
		},
	},
};
</script>
