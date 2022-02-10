<template>
  <div>
    <mast v-for="item of platformSlugCurrentFilter(this.$route.params.slug)"
      :key="item.slug"
      :title="item.title"
      :logo="item.logo"
      :data_1="platformSlugGames.length"
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
  </div>
</template>

<script>
  export default {
    data:() => ({
      platformSlugCurrent: [],
    }),
    methods: {
      platformSlugCurrentFilter: function(platform) {
        return this.platformSlugCurrent.filter((item) => item.slug === platform)
      },
    },
    async asyncData({ $content, params }) {
      const platformSlugGames = await $content("games")
        .where({ 'platform': { $eq: params.slug } })
        .sortBy('title')
        .fetch();
      const platformSlugSystems = await $content("systems")
        .where({ 'platform': { $eq: params.slug } })
        .only(['title'])
        .fetch();
      const platformSlugCurrent = await $content("_platform").only(['title','slug','logo']).fetch();
      return {
        platformSlugGames,
        platformSlugSystems,
        platformSlugCurrent
      };
    },
  }
</script>