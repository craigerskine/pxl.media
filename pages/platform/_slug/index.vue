<template>
  <div>
    <mast v-for="item of currentPlatform(this.$route.params.slug)"
      :key="item.slug"
      :title="item.title"
      :logo="item.logo",
      :data_1="games.length",
      data_1_label="Games",
      :data_2="systems.length",
      data_2_label="Systems",
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
      pagePlatforms: [],
    }),
    methods: {
      currentPlatform: function(platform) {
        return this.pagePlatforms.filter((item) => item.slug === platform)
      },
    },
    async asyncData({ $content, params }) {
      const games = await $content("games")
        .where({ 'platform': { $eq: params.slug } })
        .sortBy('title')
        .fetch();
      const systems = await $content("systems")
        .where({ 'platform': { $eq: params.slug } })
        .only(['title'])
        .fetch();
      const pagePlatforms = await $content("_platform").only(['title','slug','logo']).fetch();
      return {
        games,
        systems,
        pagePlatforms
      };
    },
  }
</script>