<template>
  <nav class="pb-10">
    <ul class="flex flex-wrap items-center justify-center space-x-5">
      <li><nuxt-link v-if="currentPage !== 1" :to="pagePath +'/page/'+ prevPage"><span class="sr-only">Previous</span> <i class="fal fa-fw fa-angle-left fa-2x"></i></nuxt-link></li>
      <li>{{ $route.params.page }}</li>
      <li><nuxt-link v-if="currentPage !== totalPages" :to="pagePath +'/page/'+ nextPage"><span class="sr-only">Next</span> <i class="fal fa-fw fa-angle-right fa-2x"></i></nuxt-link></li>
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