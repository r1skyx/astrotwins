<template>
	<div>
		<b-container class="d-flex linear-black" fluid>
			<b-row align-v="center" align-h="center" class="linear-black negative">
				<b-col cols="2">
					<nuxt-link :to="'/' + linkTo"
						><h1 class="ml-3 text-gold negative">{{ backArrow }}</h1></nuxt-link
					>
				</b-col>
				<b-col cols="8" class="mx-auto text-center">
					<h2 v-if="logo" class="pt-1 text-center mx-auto" align-v="center">
						Astro<span>twins</span>
					</h2>
					<h2>{{ title }}</h2>
				</b-col>
				<b-col cols="2"> </b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>
export default {
	name: "GradientBox",
	props: {
		backArrow: String,
		linkTo: String,
		title: String,
		logo: {
			default: false,
		},
	},
};
</script>

<style scoped>
.linear-black {
	padding: 0;
	margin: 0;
	width: 100vw;
	height: 110px;
	background: linear-gradient(
		180deg,
		rgba(0, 0, 0, 0.7) 0%,
		rgba(0, 0, 0, 0) 100%
	);
}

span {
	font-weight: 300;
	font-size: 1em;
}

.negative {
	margin-top: -10px;
}
</style>
