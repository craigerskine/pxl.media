<template>
  <h1 class="m-auto py-8 px-4 text-gray-500 text-8xl font-bold text-center">
    <template v-if="error.statusCode === 404">404</template>
    <template v-else>An error occurred</template>
    <small class="text-2xl block opacity-90">↑ ↑ ↓ ↓ ← → ← → B A</small>
  </h1>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error' // you can set a custom layout for the error page
  }
</script>