<template>
  <div>
    <div class="mx-auto justify-between lg:(flex space-x-4)">
      <div class="stat mx-auto px-4 py-1 border-b border-gray-500 border-opacity-30 w-full sm:(max-w-md) lg:(mx-0 my-10)">
        <mast
          label="Games"
          :data_1="indexGamesPhysicalCount.length"
          data_1_label="Physical"
          :data_2="indexGamesDigitalCount.length"
          data_2_label="Digital"
          :data_3="indexGamesPendingCount.length"
          data_3_label="Pending"
          home="true">{{ indexGamesCount.length }}</mast>
      </div>
      <div class="stat mx-auto px-4 py-1 border-b border-gray-500 border-opacity-30 w-full sm:(max-w-md) lg:(mx-0 my-10)">
        <mast
          label="Systems"
          :data_1="indexSystemsConsoleCount.length"
          data_1_label="Consoles"
          :data_2="indexSystemsHandheldCount.length"
          data_2_label="Handhelds"
          :data_3="indexSystemsMiniCount.length"
          data_3_label="Mini/Classic"
          home="true">{{ indexSystemsCount.length }}</mast>
      </div>
    </div>

    <heading>Recently Added</heading>
    <ul class="list-game pb-4 flex flex-wrap">
      <game v-for="game of indexGamesRecently"
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
    <heading :subtext="indexGamesPending.length"><nuxt-link to="/games/pending/">Pending</nuxt-link></heading>
    <ul class="list-game pb-4 flex flex-wrap">
      <game v-for="game of indexGamesPending"
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
    const indexGamesCount = await $content("games").only(['title']).fetch();
    const indexGamesPhysicalCount = await $content("games").only(['title']).where({physical: true,}).fetch();
    const indexGamesDigitalCount = await $content("games").only(['title']).where({digital: true,}).fetch();
    const indexGamesPendingCount = await $content("games").only(['title']).where({pending: true,}).fetch();
    const indexSystemsCount = await $content("systems").only(['title']).fetch();
    const indexSystemsConsoleCount = await $content("systems").only(['title']).where({system_type: { $in: ['console', 'hybrid']}}).fetch();
    const indexSystemsHandheldCount = await $content("systems").only(['title']).where({system_type: { $in: ['handheld', 'hybrid']}}).fetch();
    const indexSystemsMiniCount = await $content("systems").only(['title']).where({system_type: { $eq: 'mini'}}).fetch();
    const indexGamesPending = await $content("games")
      .where({ pending: { $eq: true } })
      .limit(6)
      .fetch();
    const indexGamesRecently = await $content("games")
      .sortBy('posted', 'desc')
      .where({ pending: { $eq: false } })
      .limit(6)
      .fetch();
    return {
      indexGamesCount,
      indexGamesPhysicalCount,
      indexGamesDigitalCount,
      indexGamesPendingCount,
      indexSystemsCount,
      indexSystemsConsoleCount,
      indexSystemsHandheldCount,
      indexSystemsMiniCount,
      indexGamesPending,
      indexGamesRecently,
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
