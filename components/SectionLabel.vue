<template>
	<div>
		<label class="mb-0 ml-2" for="">{{ sectionName }}</label>
		<hr class="mt-1 bg-gold" />
	</div>
</template>

<script>
export default {
	name: "SectionLabel",
	props: {
		sectionName: String,
	},
};
</script>
