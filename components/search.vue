<template>
  <form @submit.prevent="searchSubmit();" class="ml-auto flex items-center">
    <fieldset class="mr-4 ml-auto w-64 flex justify-end items-center relative z-30">
      <label for="site-search" class="sr-only">Search</label>
      <input v-model="query" type="search" id="site-search" name="keywords" @keyup.esc="searchClose(), $event.target.blur()" placeholder="Search..." class="input-search border(& transparent) p-2 w-8 text-sm bg-transparent text-transparent cursor-pointer outline-none relative appearance-none z-10 opacity-0 motion-safe:transition-all focus:(w-full bg-gray-700 text-white opacity-100)" title="Search" autocomplete="off" />
      <i class="absolute right-0 z-0 fa-light fa-fw fa-lg fa-search opacity-40 motion-safe:transition"></i>
    </fieldset>
  </form>
</template>

<script>
  export default {
    data() {
      return {
        query: '',
      }
    },
    methods: {
      searchSubmit: function() {
        this.$router.push({ path: '/games/'+ this.query.toLowerCase().replace(' ', '-') +'/'});
      },
      searchClose: function() {
        this.query = '';
      },
    },
  }
</script>