<template>
  <h1 class="h-hr mt-8 mb-6 pb-2 px-4 text(gray-400 sm) font-bold uppercase relative">
    <b v-if="subtext" class="mr-2 text-xs opacity-75">{{ subtext }}</b>
    <slot />
    <b class="py-px w-full max-w-xs bg-current block opacity-30 absolute left-0 bottom-px opacity-60"></b>
    <b class="h-px bg-current block opacity-30 absolute inset-x-0 bottom-0"></b>
    <nuxt-link :prefetch="false" v-if="url" :to="url" class="absolute inset-0"></nuxt-link>
  </h1>
</template>

<script>
  export default {
    props: [
      'url',
      'subtext'
    ]
  }
</script>