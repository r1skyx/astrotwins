<template>
	<div class="h-100 bg-grey">
		<GradientBox backArrow="<" linkTo="" />
		<Nuxt />
	</div>
</template>

<script>
import GradientBox from "../components/GradientBox.vue";
export default {
	components: { GradientBox },
};
</script>
