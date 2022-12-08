export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('slug', (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\.+/g, '-')     // . to -
      .replace(/\s+/g, '-')     // space to -
      .normalize('NFKD')        // unicode normalization
      .replace(/[^\w\-]+/g, '') // remove other crazy chars
      .replace(/\-\-+/g, '-')   // multiple - to single -
      .replace(/^-+/, '')       // remove - from start
      .replace(/-+$/, '')       // remove - from end
  })
})