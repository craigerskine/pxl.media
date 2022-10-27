<template>
  <div>
    <heading :subtext="filteredGames.length"><b v-text="this.$route.params.slug.replace('-', ' ')"></b> Games</heading>
    <ul class="list-game flex(& wrap)">
      <game v-for="filter in filteredGames"
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
        .where({ 'slug': { $contains: params.slug } })
        .fetch();
      return {
        filteredGames
      };
    },
    head() {
      return {
        title: this.$route.params.slug.replace('-', ' ').toLowerCase().split(' ').map(function(word) {
          return (word.charAt(0).toUpperCase() + word.slice(1));
        }).join(' ') +' Games',
      };
    },
  }
</script>