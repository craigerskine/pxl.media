<template>
  <div>
    <heading>Filter: <b v-text="this.$route.params.slug.replace('-', ' ')"></b> (<span v-text="filteredGames.length"></span>)</heading>
    <ul class="list-game flex(& wrap)">
      <game v-for="(filter, index) in filteredGames"
        :key="filter.slug"
        :title="filter.title"
        :slug="filter.slug"
        :note="filter.note"
        :platform="filter.platform"
        :genre="filter.genre"
        :physical="filter.physical"
        :digital="filter.digital"
        :guide="filter.guide"
        :pending="filter.pending"
        :posted="filter.posted"
      />
    </ul>
  </div>
</template>

<script>
  export default {
    async asyncData({ $content, params }) {
      const filteredGames = await $content("games")
        .sortBy('title', 'asc')
        .search(params.slug.replace('-', ' '))
        .fetch();
      return {
        filteredGames
      };
    },
    head() {
      return {
        title: 'Filter: '+ this.$route.params.slug.replace('-', ' '),
      };
    },
  }
</script>