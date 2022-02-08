<template>
  <div>
    <heading>SLUG GOES HERE</heading>
    <ul class="list-game pb-4 flex flex-wrap">
      <game v-for="game of games"
        :key="game.slug"
        :title="game.title"
        :slug="game.slug"
        :note="game.note"
        :platform="game.platform"
        :genre="game.genre"
        :physical="game.physical"
        :digital="game.digital"
        :guide="game.guide"
        :pending="game.pending"
        :posted="game.posted"
      />
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