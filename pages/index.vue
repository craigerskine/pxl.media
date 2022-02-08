<template>
  <div>
    <heading url="#">Recently Added</heading>
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
    const pending = await $content("games").where({ pending: { $eq: true } }).fetch();
    return {
      pending,
    };
  },
}
</script>
