<template>
  <div>
    <mast v-for="item of platformSlugCurrentFilter(this.$route.params.slug)"
      :key="item.slug"
      :title="item.title"
      :logo="item.logo"
      :data_1="platformTotalGames"
      data_1_label="Games"
      :data_2="platformSlugSystems.length"
      data_2_label="Systems"
    />
    <heading>Games owned</heading>
    <ul class="list-game pb-4 flex flex-wrap">
      <game v-for="game of platformSlugGames"
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
    <pagination v-if="platformTotalGames > 24" :pagePath="'/platform/'+ this.$route.params.slug +'/'" :pageTotal="platformTotalGames" />
  </div>
</template>

<script>
  export default {
    data:() => ({
      platformSlugCurrent: [],
      platformSlugGames: '',
    }),
    methods: {
      platformSlugCurrentFilter: function(platform) {
        return this.platformSlugCurrent.filter((item) => item.slug === platform)
      },
    },
    async asyncData({ $content, params }) {
      const platformPageCurrent = parseInt(params.page);
      const platformPagePer = 24;
      const platformAllGames = await $content("games").where({ 'platform': { $eq: params.slug } }).only(['title']).fetch();
      const platformTotalGames = platformAllGames.length;
      const platformLastPage = Math.ceil(platformTotalGames / platformPagePer);
      const platformLastPageCount = platformTotalGames % platformPagePer === 0 ? platformPagePer : platformTotalGames % platformPagePer;
      const platformSkip = () => {
        if (platformPageCurrent === 1) {return 0;}
        if (platformPageCurrent === platformLastPage) {return platformTotalGames - platformLastPageCount;}
        return (platformPageCurrent - 1) * platformPagePer;
      };
      const platformSlugGames = await $content("games")
        .where({ 'platform': { $eq: params.slug } })
        .sortBy('title')
        .limit(platformPagePer)
        .skip(platformSkip())
        .fetch();
      const platformSlugSystems = await $content("systems")
        .where({ 'platform': { $eq: params.slug } })
        .only(['title'])
        .fetch();
      const platformSlugCurrent = await $content("_platform").only(['title','slug','logo']).fetch();
      return {
        platformAllGames,
        platformTotalGames,
        platformSlugGames,
        platformSlugSystems,
        platformSlugCurrent
      };
    },
    head() {
      return {
        title: this.platformSlugCurrentFilter(this.$route.params.slug)[0].title +' Games',
      };
    },
  }
</script>