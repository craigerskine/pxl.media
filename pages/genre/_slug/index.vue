<template>
  <div>
    <mast v-for="item of genreSlugCurrentFilter(this.$route.params.slug)"
      :key="item.slug"
      :ico="item.icon"
      :label="item.title"
    />
    <heading :subtext="genreAllGames.length">
      <span v-text="this.$route.params.slug === 'flash-cart' ? 'Carts' : 'Games'"></span> owned
    </heading>
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
    <pagination v-if="genreAllGames > 24" paginateCss="pb-10" :paginatePath="'/genre/'+ this.$route.params.slug +'/'" :paginateTotal="genreAllGames.length" />
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
      const genreLastPage = Math.ceil(genreAllGames.length / genrePagePer);
      const genreLastPageCount = genreAllGames.length % genrePagePer === 0 ? genrePagePer : genreAllGames.length % genrePagePer;
      const genreSkip = () => {
        if (genrePageCurrent === 1) {return 0;}
        if (genrePageCurrent === genreLastPage) {return genreAllGames.length - genreLastPageCount;}
        return (genrePageCurrent - 1) * genrePagePer;
      };
      const genreSlugGames = await $content("games")
        .where({ 'genre': { $contains: params.slug } })
        .sortBy('title')
        .limit(genrePagePer)
        .skip(genreSkip())
        .fetch();
      const genreSlugCurrent = await $content("_genre").only(['title','slug','icon']).fetch();
      return {
        genreAllGames,
        genreSlugGames,
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