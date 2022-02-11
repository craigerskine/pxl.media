<template>
  <h1 class="m-auto py-8 px-4 text-gray-500 text-8xl font-bold text-center">
    <template v-if="error.statusCode === 404">404</template>
    <template v-else>oops</template>
    <small class="text-2xl block opacity-90">↑ ↑ ↓ ↓ ← → ← → B A</small>
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
    layout: 'error' // you can set a custom layout for the error page
  }
</script>