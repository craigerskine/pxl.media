<template>
  <div>
    <heading>Genres</heading>
    <ul>
      <li v-for="genre of genres" :key="genre.slug">
        <nuxt-link :to="genre.slug">{{ genre.title }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    async asyncData({ $content }) {
      const genres = await $content("_genre")
        .sortBy('title')
        .fetch();
      return {
        genres
      };
    },
  }
</script>