<template>
  <li class="game">
    <p class="p-4">{{ title }}
      <small class="block" v-for="item in genre" :key="item.id"> - {{ item }} </small>
    </p>
  </li>
</template>

<script>
  export default {
    name: 'game',
    props: {
      id: String,
      title: String,
      platforms: Array,
      platform: String,
      genres: Array,
      genre: Array,
    },
    methods: {
    }
  }
</script>