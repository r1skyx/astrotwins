<template>
	<div class="p-0 m-0 h-100 w-100">
		<b-row class="justify-content-center">
			<b-col cols="2" class="my-auto text-center">
				<h1><fa icon="user" /></h1>
			</b-col>
			<b-col cols="7">
				<h2 class="text-gold">{{ username }}</h2>
				<div class="d-flex">
					<h5 class="mr-3">{{ sunsign }}</h5>
					<h5 class="mr-3">{{ moonsign }}</h5>
					<h5>{{ ascendsign }}</h5>
				</div>
			</b-col>
			<b-col cols="2">
				<h5>{{ matchPercentage }}</h5>
			</b-col>
		</b-row>
	</div>
</template>

<script>
export default {
	name: "UserSingle",
	props: {
		username: String,
		sunsign: String,
		moonsign: String,
		ascendsign: String,
		matchPercentage: String,
	},
};
</script>

<style scoped>
.g {
	min-width: 500px;
}
</style>
