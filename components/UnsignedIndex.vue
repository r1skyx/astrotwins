<template>
	<div>
		<b-container class="p-0 m-0 vw-100" fluid>
			<b-row cols="12" class="text-center">
				<img src="../assets/images/index-pic.png" class="p-0 m-n mx-auto" alt="" />
				<b-col class="text-center mx-auto">
					<h1>Astro<span>twins</span></h1>
					<h4 class="mx-auto mt-4 text-secondary">
						Find and connect with your astrological twins
					</h4>
					<img class="sun mt-4" src="../assets/images/sun-index.png" alt="" />
					<h4 class="mx-auto mt-4 mb-5">
						<b>Chat</b> with people who have the same <b>3 big signs</b> as you!
					</h4>
					<hr />
					<h4 class="mx-auto">GET STARTED</h4>
					<nuxt-link to="/sign-up"
						><button class="btn-primary mb-3">SIGN UP</button></nuxt-link
					>
					<nuxt-link to="/log-in"
						><h4 class="mx-auto log-in text-gold">LOG IN</h4></nuxt-link
					>
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>

<style scoped>
.m-n {
	margin-bottom: -70px;
}

.sun {
	max-width: 160px;
}

span {
	font-weight: 300;
	font-size: 1em;
}

h4 {
	max-width: 270px;
	font-weight: 300;
}

hr {
	border-color: white;
}

.log-in {
	text-decoration: underline;
}
</style>
