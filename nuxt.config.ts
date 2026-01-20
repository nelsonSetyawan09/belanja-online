// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon"],
  app: {
    head: {
      title: "Shopiverse",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/flowbite@4.0.1/dist/flowbite.min.css",
        },
      ],
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/flowbite@4.0.1/dist/flowbite.min.js",
          defer: true,
        },
      ],
    },
  },
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
  },
});
