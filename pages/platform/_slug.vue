<template>
  <div>
    <heading>{{ $route.params.slug }}</heading>
    <ul>
      <li v-for="game of games" :key="game.slug">
        {{ game.title }} - {{ game.platform }}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    async asyncData({ $content, params }) {
      const games = await $content("games")
        .where({ 'platform': { $eq: params.slug } })
        .sortBy('title')
        .fetch();
      return {
        games
      };
    },
  }
</script>