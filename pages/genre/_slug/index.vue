<template>
  <div>
    <heading v-for="item of currentGenre(this.$route.params.slug)" :key="item.slug">{{ item.title }}</heading>
    <heading>Games owned</heading>
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
    data:() => ({
      platforms: [],
      pageGenres: [],
    }),
    methods: {
      currentGenre: function(genre) {
        return this.pageGenres.filter((item) => item.slug === genre)
      },
    },
    async asyncData({ $content, params }) {
      const games = await $content("games")
        .where({ 'genre': { $contains: params.slug } })
        .sortBy('title')
        .fetch();
      const pageGenres = await $content("_genre").only(['slug','title']).fetch();
      return {
        games,
        pageGenres
      };
    },
  }
</script>