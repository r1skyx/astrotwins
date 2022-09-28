export default {
	ssr: false,
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: "app",
		htmlAttrs: {
			lang: "en",
		},
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ hid: "description", name: "description", content: "" },
			{ name: "format-detection", content: "telephone=no" },
		],
		link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: ["@/assets/css/main.css"],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [{ src: "~/plugins/vuex-persist", ssr: false }, "plugins/axios.js"],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: ["@nuxtjs/moment", "@nuxtjs/fontawesome"],

	fontawesome: {
		component: "fa",
		icons: {
			solid: true,
		},
	},
	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/bootstrap
		[
			"@nuxtjs/firebase",
			{
				config: {
					apiKey: "AIzaSyAF-kcH3x6iaOuskjn_SyKRG4RzTrbWN-8",
					authDomain: "astrotwins-c028a.firebaseapp.com",
					projectId: "astrotwins-c028a",
					storageBucket: "astrotwins-c028a.appspot.com",
					messagingSenderId: "498688760345",
					appId: "1:498688760345:web:50a23c9cf1610f61a3e888",
					measurementId: "G-Y06EEQXHGT",
				},
				services: {
					auth: {
						persistence: "local", // default
						initialize: {
							onAuthStateChangedMutation: "ON_AUTH_STATE_CHANGED_MUTATION",
							onAuthStateChangedAction: "onAuthStateChangedAction",
							subscribeManually: false,
						},
					},
				},
			},
		],
		["bootstrap-vue/nuxt"],
		[
			"@nuxtjs/axios",
			{
				axios: {
					proxyHeaders: false,
					credentials: false,
				},
			},
		],
		"@nuxtjs/dotenv",
	],

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {},

	vue: {
		config: {
			productionTip: false,
			devtools: true,
		},
	},
};
