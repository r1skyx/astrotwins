<template>
	<div class="h-100 bg-grey">
		<GradientBox
			backArrow=""
			logo="true"
			linkTo="sign-up"
			style="background-color: #2e2e30"
		/>
		<section-label sectionName="Your Signs"></section-label>
		<section-signs
			:sunsign="reqData.sunsign"
			:moonsign="reqData.moonsign"
			:ascendsign="reqData.ascendsign"
		></section-signs>
		<navigation-mobile></navigation-mobile>
	</div>
</template>

<script>
import GradientBox from "./GradientBox.vue";
import SectionLabel from "./SectionLabel.vue";
import SectionSigns from "./SectionSigns.vue";
import NavigationMobile from "./NavigationMobile.vue";
export default {
	name: "SignedIndex",
	components: { GradientBox, SectionLabel, SectionSigns, NavigationMobile },
	data() {
		return {
			reqData: this.$store.state.userData,
		};
	},
};
</script>
