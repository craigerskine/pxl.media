<template>
  <div>
    <mast v-for="item of genreSlugCurrentFilter(this.$route.params.slug)"
      :key="item.slug"
      :ico="item.icon"
      :label="item.title"
      :data_1="genreTotalGames"
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
    <pagination v-if="genreTotalGames > 24" paginateCss="pb-10" :paginatePath="'/genre/'+ this.$route.params.slug +'/'" :paginateTotal="genreTotalGames" />
  </div>
</template>

<script>
  export default {
    data:() => ({
      genreSlugCurrent: [],
      genreSlugGames: '',
    }),

    methods: {
      genreSlugCurrentFilter: function(genre) {
        return this.genreSlugCurrent.filter((item) => item.slug === genre)
      },
    },

    async asyncData({ $content, params, error }) {
      const genrePageCurrent = parseInt(params.page);
      const genrePagePer = 24;
      const genreAllGames = await $content("games").where({ 'genre': { $contains: params.slug } }).only(['title']).fetch();
      const genreTotalGames = genreAllGames.length;
      const genreLastPage = Math.ceil(genreTotalGames / genrePagePer);
      const genreLastPageCount = genreTotalGames % genrePagePer === 0 ? genrePagePer : genreTotalGames % genrePagePer;
      const genreSkip = () => {
        if (genrePageCurrent === 1) {return 0;}
        if (genrePageCurrent === genreLastPage) {return genreTotalGames - genreLastPageCount;}
        return (genrePageCurrent - 1) * genrePagePer;
      };
      const genreSlugGames = await $content("games")
        .where({ 'genre': { $contains: params.slug } })
        .sortBy('title')
        .limit(genrePagePer)
        .skip(genreSkip())
        .fetch();
      const genreSlugPlatforms = await $content("_platform")
        .where({ 'platform': { $eq: params.slug } })
        .fetch();
      const genreSlugCurrent = await $content("_genre").only(['title','slug','icon']).fetch();
      return {
        genreAllGames,
        genreTotalGames,
        genreSlugGames,
        genreSlugPlatforms,
        genreSlugCurrent
      };
    },
    head() {
      return {
        title: this.genreSlugCurrentFilter(this.$route.params.slug)[0].title +' Games',
      };
    },
  }
</script>