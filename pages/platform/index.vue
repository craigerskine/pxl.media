<template>
  <div>
    <heading>Games by platform</heading>
    <ul class="container mx-auto flex flex-wrap justify-center">
      <category v-for="platform of platformIndex"
        :key="platform.slug"
        :url="platform.slug"
        :fg_img="platform.logo"
        :subtext="platformGamesFilter(platform.slug).length +' <b class=\'font-normal uppercase\'>Games</b> '+ platformSystemsFilter(platform.slug).length +' <b class=\'font-normal uppercase\'>Systems</b>'"
      />
      <category
        url="mini"
        fg_ico="fad fa-fw text-5xl fa-compress-arrows-alt" :subtext="platformMinis.length +' <b class=\'font-normal uppercase\'>Systems</b>'"
      />
    </ul>
  </div>
</template>

<script>
  export default {
    data:() => ({
      platformGames: [],
      platformSystems: [],
    }),
    methods: {
      platformGamesFilter: function(platform) {
        return this.platformGames.filter((item) => item.platform === platform)
      },
      platformSystemsFilter: function(platform) {
        return this.platformSystems.filter((item) => item.platform === platform)
      },
    },
    async asyncData({ $content }) {
      const platformGames = await $content("games").fetch();
      const platformSystems = await $content("systems").where({ system_type: { $ne: 'mini' } }).fetch();
      const platformMinis = await $content("systems").where({ system_type: { $eq: 'mini' } }).fetch();
      const platformIndex = await $content("_platform").sortBy('order').fetch();
      return {
        platformGames,
        platformSystems,
        platformMinis,
        platformIndex
      };
    },
    head() {
      return {
        title: 'Platforms'
      };
    },
  }
</script>