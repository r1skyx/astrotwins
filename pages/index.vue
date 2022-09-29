<template>
	<UnsignedIndex v-if="!uid" />
	<SignedIndex v-else />
</template>

<script>
import UnsignedIndex from "../components/UnsignedIndex.vue";
import SignedIndex from "../components/SignedIndex.vue";
export default {
	components: { UnsignedIndex, SignedIndex },
	name: "IndexPage",
	data() {
		return {};
	},
	computed: {
		uid() {
			return this.$store.state.user.uid;
		},
	},
};
</script>

<style scoped></style>
