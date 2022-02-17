<template>
  <div>
    <heading :subtext="gamesPending.length">Pending</heading>
    <ul class="container mx-auto flex flex-wrap">
      <ul class="list-game pb-4 flex flex-wrap">
        <game v-for="game of gamesPending"
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
    </ul>
  </div>
</template>

<script>
  export default {
    async asyncData({ $content }) {
      const gamesPending = await $content("games")
        .where({pending: true,})
        .fetch();
      return {
        gamesPending,
      };
    },
    head() {
      return {
        title: 'Pending / Pre-Ordered Games',
      };
    },
  }
</script>