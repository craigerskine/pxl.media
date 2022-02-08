<template>
  <div>
    <heading>Game by genre</heading>
    <ul class="container mx-auto flex flex-wrap justify-center">
      <category v-for="genre of genres" :key="genre.slug" :title="genre.title" :url="genre.slug" :fg_ico="'text-5xl fad fa-fw fa-'+ genre.icon" :subtext="genreGames(genre.slug).length +' <b class=\'font-normal uppercase\'>Games</b>'" />
    </ul>
  </div>
</template>

<script>
  export default {
    data:() => ({
      games: [],
    }),
    methods: {
      genreGames: function(genre) {
        return this.games.filter((item) => item.genre.includes(genre))
      },
    },
    async asyncData({ $content }) {
      const games = await $content("games").fetch();
      const genres = await $content("_genre").sortBy('title').fetch();
      return {
        games,
        genres
      };
    },
  }
</script>