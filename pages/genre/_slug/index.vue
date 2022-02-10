<template>
  <div>
    <mast v-for="item of currentGenre(this.$route.params.slug)"
      :key="item.slug"
      :ico="item.icon",
      :label="item.title",
      :data_1="games.length",
      data_1_label="Games",
      :data_2="platforms.length",
      data_2_label="Platforms",
    />
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
      const platforms = await $content("_platform")
        .where({ 'platform': { $eq: params.slug } })
        .fetch();
      const pageGenres = await $content("_genre").only(['title','slug','icon']).fetch();
      return {
        games,
        platforms,
        pageGenres
      };
    },
  }
</script>