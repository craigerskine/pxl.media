<template>
  <div>
    <ul class="-ml-[50vw] -mr-[50vw] w-screen justify-center relative left-1/2 right-1/2 lg:(flex space-x-8)">
      <li class="stat mx-auto px-4 py-1 border(b gray-500 opacity-30) w-full sm:(max-w-sm) lg:(mx-0 my-10)">
        <mast
          url="/games/"
          label="Games"
          :data_1="homeGamesPhysicalCount.length"
          data_1_label="Physical"
          :data_2="homeGamesDigitalCount.length"
          data_2_label="Digital"
          :data_3="homeGamesPendingCount.length"
          data_3_label="Pending"
          home="true">{{ homeGamesCount.length }}</mast>
      </li>
      <li class="stat mx-auto px-4 py-1 border(b gray-500 opacity-30) w-full sm:(max-w-sm) lg:(mx-0 my-10)">
        <mast
          url="/systems/"
          label="Systems"
          :data_1="homeSystemsConsoleCount.length"
          data_1_label="Consoles"
          :data_2="homeSystemsHandheldCount.length"
          data_2_label="Handhelds"
          :data_3="homeSystemsMiniCount.length"
          data_3_label="Mini/Classic"
          home="true">{{ homeSystemsCount.length }}</mast>
      </li>
      <li class="stat mx-auto px-4 py-1 border(b gray-500 opacity-30) w-full sm:(max-w-sm) lg:(mx-0 my-10)">
        <mast
          url="/controllers/"
          label="Controllers"
          :data_1="homeControllersWirelessCount.length"
          data_1_label="Wireless"
          :data_2="homeControllersUsbCount.length"
          data_2_label="USB"
          :data_3="homeControllersAdaptersCount.length"
          data_3_label="Adapters"
          home="true">{{ homeControllersCount.length }}</mast>
      </li>
    </ul>
    <heading>Recently Added</heading>
    <ul class="list-game pb-4 flex flex-wrap">
      <game v-for="game of homeGamesRecently"
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
    <heading :subtext="homeGamesPending.length"><nuxt-link to="/games/pending/">Pending</nuxt-link></heading>
    <ul class="list-game pb-4 flex flex-wrap">
      <game v-for="(game, index) of homeGamesPending" v-if="index <= 5"
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
  async asyncData({ $content }) {
    const homeGamesCount = await $content("games").only(['title']).fetch();
    const homeGamesPhysicalCount = await $content("games").only(['title']).where({physical: true,}).fetch();
    const homeGamesDigitalCount = await $content("games").only(['title']).where({digital: true,}).fetch();
    const homeGamesPendingCount = await $content("games").only(['title']).where({pending: true,}).fetch();
    const homeSystemsCount = await $content("systems").only(['title']).fetch();
    const homeSystemsConsoleCount = await $content("systems").only(['title']).where({system_type: { $in: ['console', 'hybrid']}}).fetch();
    const homeSystemsHandheldCount = await $content("systems").only(['title']).where({system_type: { $in: ['handheld', 'hybrid']}}).fetch();
    const homeSystemsMiniCount = await $content("systems").only(['title']).where({system_type: { $eq: 'mini'}}).fetch();
    const homeControllersCount = await $content("controllers").only(['title']).fetch();
    const homeControllersWirelessCount = await $content("controllers").only(['title']).where({connection: { $in: ['2.4Ghz', 'Bluetooth']}}).fetch();
    const homeControllersUsbCount = await $content("controllers").only(['title']).where({connection: { $in: ['System', 'USB']}}).fetch();
    const homeControllersAdaptersCount = await $content("controllers").only(['title']).search('title', 'adapter').fetch();
    const homeGamesPending = await $content("games")
      .sortBy('posted', 'desc')
      .where({ pending: { $eq: true } })
      .fetch();
    const homeGamesRecently = await $content("games")
      .sortBy('posted', 'desc')
      .where({ pending: { $eq: false } })
      .limit(6)
      .fetch();
    return {
      homeGamesCount,
      homeGamesPhysicalCount,
      homeGamesDigitalCount,
      homeGamesPendingCount,
      homeSystemsCount,
      homeSystemsConsoleCount,
      homeSystemsHandheldCount,
      homeSystemsMiniCount,
      homeControllersCount,
      homeControllersWirelessCount,
      homeControllersUsbCount,
      homeControllersAdaptersCount,
      homeGamesPending,
      homeGamesRecently,
    };
  },
  head() {
    return {
      titleTemplate: null,
      script: [{ src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }],
    };
  },
}
</script>
