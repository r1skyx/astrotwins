<template>
	<div class="bg-grey h-75 overflow-hidden">
		<h5 class="text-center fw-300">Set up your profile and let's get started</h5>
		<SignUpForm class="mt-2" />
	</div>
</template>

<script>
import SignUpForm from "../components/SignUpForm.vue";
export default {
	components: { SignUpForm },
	layout: "sign-up",
	name: "SignUpPage",
};
</script>
