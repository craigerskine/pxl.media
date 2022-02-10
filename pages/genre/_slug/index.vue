<template>
  <div>
    <mast
      :ico="genreSlugCurrentFilter(this.$route.params.slug)[0].icon"
      :label="genreSlugCurrentFilter(this.$route.params.slug)[0].title"
      :data_1="genreSlugGames.length"
      data_1_label="Games"
      :data_2="genreSlugPlatforms.length"
      data_2_label="Platforms"
    />
    <heading>Games owned</heading>
    <ul class="list-game pb-4 flex flex-wrap">
      <game v-for="game of genreSlugGames"
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
    head() {
      return {
        title: this.genreSlugCurrentFilter(this.$route.params.slug)[0].title,
      };
    },
    data:() => ({
      genreSlugCurrent: [],
    }),
    methods: {
      genreSlugCurrentFilter: function(genre) {
        return this.genreSlugCurrent.filter((item) => item.slug === genre)
      },
    },
    async asyncData({ $content, params }) {
      const genreSlugGames = await $content("games")
        .where({ 'genre': { $contains: params.slug } })
        .sortBy('title')
        .fetch();
      const genreSlugPlatforms = await $content("_platform")
        .where({ 'platform': { $eq: params.slug } })
        .fetch();
      const genreSlugCurrent = await $content("_genre").only(['title','slug','icon']).fetch();
      return {
        genreSlugGames,
        genreSlugPlatforms,
        genreSlugCurrent
      };
    },
  }
</script>