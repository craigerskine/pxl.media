<template>
  <div>
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
  name: 'index',
  async asyncData({ $content }) {
    const pending = await $content("games")
      .where({ pending: { $eq: true } })
      .fetch();
    const recently = await $content("games")
      .sortBy('posted', 'desc')
      .where({ pending: { $eq: false } })
      .limit(6)
      .fetch();
    return {
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
