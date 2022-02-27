<template>
  <nav class="pb-10">
    <ul class="flex flex-wrap items-center justify-center space-x-5">
      <li v-if="currentPage > 2"><nuxt-link :to="pagePath +'page/'+ prevPage +'/'" class="transition hover:(text-white) focus:(text-white)"><span class="sr-only">Previous</span> <i class="fal fa-fw fa-angle-left fa-2x"></i></nuxt-link></li>
      <li v-else-if="prevPage === 1"><nuxt-link :to="pagePath" class="transition hover:(text-white) focus:(text-white)"><span class="sr-only">Previous</span> <i class="fal fa-fw fa-angle-left fa-2x"></i></nuxt-link></li>
      <li v-else class="pointer-events-none opacity-50"><i class="fal fa-fw fa-angle-left fa-2x"></i></li>
      <li class="flex flex-wrap items-center justify-center space-x-3"><b class="text-gray-300">{{ $route.params.page || 1 }}</b> <i class="opacity-50">/</i> <small class="text-xs">{{ totalPages }}</small></li>
      <li v-if="currentPage !== totalPages"><nuxt-link :to="pagePath +'/page/'+ nextPage +'/'" class="transition hover:(text-white) focus:(text-white)"><span class="sr-only">Next</span> <i class="fal fa-fw fa-angle-right fa-2x"></i></nuxt-link></li>
      <li v-else class="pointer-events-none opacity-50"><i class="fal fa-fw fa-angle-right fa-2x"></i></li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    pageTotal: {
      type: Number,
      default: 0,
    },
    pagePer: {
      type: Number,
      default: 24,
    },
    pagePath: {
      type: String,
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.pageTotal / this.pagePer);
    },
    currentPage() {
      return parseInt(this.$route.params.page) || 1;
    },
    prevPage() {
      return this.currentPage > 1 ? this.currentPage - 1 : 1;
    },
    nextPage() {
      return this.currentPage < this.totalPages ? this.currentPage + 1 : this.totalPages;
    },
  },
};
</script>