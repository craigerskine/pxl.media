<template>
  <div>
    <div class="mx-auto justify-between lg:(flex) space-x-4">
      <div class="stat mx-auto px-4 py-1 border-b border-gray-500 border-opacity-30 w-full sm:max-w-xs lg:mx-0 lg:my-10">
        <mast
          label="Games"
          data_1="123"
          data_1_label="Physical"
          data_2="123"
          data_2_label="Digital"
          data_3="123"
          data_3_label="Pending"
          home="true">{{ games.length }}</mast>
      </div>
      <div class="stat mx-auto px-4 py-1 border-b border-gray-500 border-opacity-30 w-full sm:max-w-xs lg:mx-0 lg:my-10">
        <mast
          label="Systems"
          data_1="123"
          data_1_label="Consoles"
          data_2="123"
          data_2_label="Handhelds"
          data_3="123"
          data_3_label="Mini/Classic"
          home="true">{{ systems.length }}</mast>
      </div>
      <div class="stat mx-auto px-4 py-1 border-b border-gray-500 border-opacity-30 w-full sm:max-w-xs lg:mx-0 lg:my-10">
        <mast
          label="Controllers"
          data_1="123"
          data_1_label="Wireless"
          data_2="123"
          data_2_label="System"
          data_3="123"
          data_3_label="Adapters"
          home="true">{{ controllers.length }}</mast>
      </div>
    </div>

    <heading>Recently Added</heading>
    <ul class="list-game pb-4 flex flex-wrap">
      <game v-for="game of recently"
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
    <heading :subtext="pending.length">Pending</heading>
    <ul class="list-game pb-4 flex flex-wrap">
      <game v-for="game of pending"
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
    const games = await $content("games").only(['title']).fetch();
    const systems = await $content("systems").only(['title']).fetch();
    const controllers = await $content("controllers").only(['title']).fetch();
    const pending = await $content("games")
      .where({ pending: { $eq: true } })
      .fetch();
    const recently = await $content("games")
      .sortBy('posted', 'desc')
      .where({ pending: { $eq: false } })
      .limit(6)
      .fetch();
    return {
      games,
      systems,
      controllers,
      pending,
      recently,
    };
  },
  head() {
    return {
      script: [{ src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }],
    };
  },
}
</script>
