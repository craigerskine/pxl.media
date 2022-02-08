<template>
  <div>
    <heading>Game by platform</heading>
    <ul class="container mx-auto flex flex-wrap justify-center">
      <category v-for="platform of platforms" :key="platform.slug" :url="platform.slug" :fg_img="platform.logo" :subtext="platformGames(platform.slug).length +' <b class=\'font-normal uppercase\'>Games</b> '+ platformSystems(platform.slug).length +' <b class=\'font-normal uppercase\'>Systems</b>'" />
      <category url="mini" fg_ico="fad fa-fw text-5xl fa-compress-arrows-alt" :subtext="minis.length +' <b class=\'font-normal uppercase\'>Systems</b>'" />
    </ul>
  </div>
</template>

<script>
  export default {
    data:() => ({
      games: [],
      systems: [],
    }),
    methods: {
      platformGames: function(platform) {
        return this.games.filter((item) => item.platform === platform)
      },
      platformSystems: function(platform) {
        return this.systems.filter((item) => item.platform === platform)
      },
    },
    async asyncData({ $content }) {
      const games = await $content("games").fetch();
      const systems = await $content("systems").where({ system_type: { $ne: 'mini' } }).fetch();
      const minis = await $content("systems").where({ system_type: { $eq: 'mini' } }).fetch();
      const platforms = await $content("_platform").sortBy('order').fetch();
      return {
        games,
        systems,
        minis,
        platforms
      };
    },
  }
</script>