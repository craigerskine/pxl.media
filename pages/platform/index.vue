<template>
  <div>
    <heading>Platforms</heading>
    <ul>
      <li v-for="platform of platforms" :key="platform.slug">
        <nuxt-link :to="platform.slug">{{ platform.title }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    async asyncData({ $content }) {
      const platforms = await $content("_platform")
        .sortBy('order')
        .fetch();
      return {
        platforms
      };
    },
  }
</script>