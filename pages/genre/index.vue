<template>
  <div>
    <heading>Games by genre</heading>
    <ul class="container mx-auto flex flex-wrap justify-center">
      <category v-for="genre of genreIndex"
        :key="genre.slug"
        :title="genre.title"
        :url="'/genre/'+ genre.slug +'/'"
        :fg_ico="'text-5xl fat fa-fw fa-'+ genre.icon"
        :subtext="genreGamesFilter(genre.slug).length +' <b class=\'font-normal uppercase\'>Games</b>'"
      />
    </ul>
  </div>
</template>

<script>
  export default {
    data:() => ({
      genreGames: [],
    }),
    methods: {
      genreGamesFilter: function(genre) {
        return this.genreGames.filter((item) => item.genre.includes(genre))
      },
    },
    async asyncData({ $content }) {
      const genreGames = await $content("games").fetch();
      const genreIndex = await $content("_genre").sortBy('title').fetch();
      return {
        genreGames,
        genreIndex
      };
    },
    head() {
      return {
        title: 'Genres'
      };
    },
  }
</script>