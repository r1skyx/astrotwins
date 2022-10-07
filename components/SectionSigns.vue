<template>
	<div>
		<b-container>
			<b-row>
				<!-- <sign-single :planet="this.$store.state.userData" ></sign-single> -->
				<b-col cols="4" class="text-center">
					<h5>Sun</h5>
					<img
						class="p-1"
						:src="require(`../assets/images/Signs/${sunsign}.png`)"
						style="width: auto; height: 85px"
					/>
					<h5 class="text-gold">{{ sunsign }}</h5>
				</b-col>
				<b-col cols="4" class="text-center">
					<h5>Moon</h5>
					<img
						class="p-1"
						:src="require(`../assets/images/Signs/${moonsign}.png`)"
						style="width: auto; height: 85px"
					/>
					<h5 class="text-gold">{{ moonsign }}</h5>
				</b-col>
				<b-col cols="4" class="text-center">
					<h5>Ascending</h5>
					<img
						class="p-1"
						:src="require(`../assets/images/Signs/${ascendsign}.png`)"
						style="width: auto; height: 85px"
					/>
					<h5 class="text-gold">{{ ascendsign }}</h5>
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>
export default {
	name: "SectionSigns",
	props: {
		sunsign: String,
		moonsign: String,
		ascendsign: String,
	},
};
</script>
