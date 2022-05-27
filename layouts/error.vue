<template>
  <h1 class="m-auto px-4 text-gray-500 text-[calc(4vw+4vh)] leading-none font-bold text-center fixed top-1/2 left-1/2 transform -translate-1/2">
    <template v-if="error.statusCode === 404">404</template>
    <template v-else>oops</template>
    <small class="text-lg block opacity-80 md:(text-2xl)">↑ ↑ ↓ ↓ ← → ← → B A</small>
  </h1>
</template>

<script>
  export default {
    head() {
      return {
        title: '404',  
      };
    },
    props: ['error'],
    layout: 'default' // you can set a custom layout for the error page
  }
</script>