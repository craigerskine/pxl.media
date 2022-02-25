<template>
  <div>
    <heading :subtext="gamesAll.length">Games</heading>
    <section class="container mx-auto">
      <ul class="pb-4">
        <li v-for="game of gamesAll">
          {{ game.title }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  export default {
    async asyncData({ $content }) {
      const gamesAll = await $content("games").sortBy('title').fetch();
      return {
        gamesAll,
      };
    },
    head() {
      return {
        title: 'Games',
      };
    },
  }
</script>