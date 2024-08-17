// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },
	modules: ["@nuxt/ui", "@nuxt/fonts", "@prisma/nuxt"],
	colorMode: {
		preference: "dark",
	},
	css: ["~/assets/css/main.css"],
	prisma: {
		autoSetupPrisma: true,
	},
});
