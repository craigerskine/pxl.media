<template>
  <div>
    <heading>Recently Added</heading>
    <ul>
      <li v-for="game of recently" :key="game.slug">
        {{ game.title }}
      </li>
    </ul>
    <heading :subtext="pending.length">Pending</heading>
    <ul>
      <li v-for="game of pending" :key="game.slug">
        {{ game.title }}
      </li>
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
}
</script>
