<template>
  <div>
    <!--
      screen width regardless of parent container width
      -ml-[50vw] -mr-[50vw] w-screen relative left-1/2 right-1/2
    -->
    <ul class="lg:(flex justify-center space-x-8)">
      <li class="stat mx-auto py-1 w-full max-w-sm lg:(my-10 max-w-none)">
        <mast
          url="/games/"
          label="Games"
          :data_1="homeGamesPhysicalCount.length"
          data_1_label="Physical"
          :data_2="homeGamesDigitalCount.length"
          data_2_label="Digital"
          :data_3="homeGamesPendingCount.length"
          data_3_label="Pending"
          hr="true"
          home="true">{{ homeGamesCount.length.toLocaleString() }}</mast>
      </li>
      <li class="stat mx-auto py-1 w-full max-w-sm lg:(my-10 max-w-none)">
        <mast
          url="/systems/"
          label="Systems"
          :data_1="homeSystemsConsoleCount.length"
          data_1_label="Consoles"
          :data_2="homeSystemsHandheldCount.length"
          data_2_label="Handhelds"
          :data_3="homeSystemsMiniCount.length"
          data_3_label="Mini/Classic"
          hr="true"
          home="true">{{ homeSystemsCount.length.toLocaleString() }}</mast>
      </li>
      <li class="stat mx-auto py-1 w-full max-w-sm lg:(my-10 max-w-none)">
        <mast
          url="/controllers/"
          label="Controllers"
          :data_1="homeControllersWirelessCount.length"
          data_1_label="Wireless"
          :data_2="homeControllersUsbCount.length"
          data_2_label="USB"
          :data_3="homeControllersAdaptersCount.length"
          data_3_label="Adapters"
          hr="true"
          home="true">{{ homeControllersCount.length.toLocaleString() }}</mast>
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
    const homeControllersWirelessCount = await $content("controllers").only(['title']).where({connection: { $containsAny: ['2.4Ghz', 'Bluetooth']}}).fetch();
    const homeControllersUsbCount = await $content("controllers").only(['title']).where({connection: { $containsAny: 'USB'}}).fetch();
    const homeControllersAdaptersCount = await $content("controllers").only(['title']).where({variation: { $containsAny: 'Adapter'}}).fetch();
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
