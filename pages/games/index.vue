<template>
  <div>
    <heading>Games</heading>
    <ul class="m-0 grid(& flow-row cols-3) gap-10">
      <li v-for="game in gamesAll">
        <figure class="w-full max-w-screen-sm h-10 bg-yellow-400">
          <img :src="'/assets/img/games/'+ game.slug +'.jpg'" class="w-full h-10 object-cover filter grayscale" />
        </figure>
        <small v-text="game.slug" class="text-xs font-mono"></small>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    async asyncData({ $content }) {
      const gamesAll = await $content("games")
        .sortBy('title', 'asc')
        .fetch();
      return {
        gamesAll,
      };
    },
    head() {
      return {
        title: 'Games',
      };
    },
  }
</script>