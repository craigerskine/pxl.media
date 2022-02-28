<template>
  <div>
    <heading :subtext="gamesAllTotal">Games</heading>
    <ul class="list-game pb-4 flex flex-wrap">
      <game v-for="game of gamesAllPaged"
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
    <pagination v-if="gamesAllTotal > 24" paginateCss="pb-10" paginatePath="/games/" :paginateTotal="gamesAllTotal" />
  </div>
</template>

<script>
  export default {
    async asyncData({ $content, params }) {
      const gamesAllPageCurrent = parseInt(params.page);
      const gamesAllPagePer = 24;
      const gamesAll = await $content("games").only(['title']).fetch();
      const gamesAllTotal = gamesAll.length;
      const gamesAllLastPage = Math.ceil(gamesAllTotal / gamesAllPagePer);
      const gamesAllLastPageCount = gamesAllTotal % gamesAllPagePer === 0 ? gamesAllPagePer : gamesAllTotal % gamesAllPagePer;
      const gamesAllSkip = () => {
        if (gamesAllPageCurrent === 1) {return 0;}
        if (gamesAllPageCurrent === gamesAllLastPage) {return gamesAllTotal - gamesAllLastPageCount;}
        return (gamesAllPageCurrent - 1) * gamesAllPagePer;
      };
      const gamesAllPaged = await $content("games")
        .sortBy('title')
        .limit(gamesAllPagePer)
        .skip(gamesAllSkip())
        .fetch();
      return {
        gamesAll,
        gamesAllTotal,
        gamesAllPaged
      };
    },
    head() {
      return {
        title: 'Games',
      };
    },
  }
</script>