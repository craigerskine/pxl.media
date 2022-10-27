<template>
  <div>
    <heading :subtext="filteredGames.length"><b v-text="this.$route.params.slug.replace('-', ' ')"></b> Games</heading>
    <template v-if="filteredGames.length">
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
    </template>
    <template v-else>
      <h2 class="m-auto py-10 px-4 text(gray-500 base center) leading-none font-bold uppercase md:(text-[calc(2vw)])">No results</h2>
    </template>
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