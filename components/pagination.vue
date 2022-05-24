<template>
  <nav :class="paginateCss">
    <ul class="flex flex-wrap items-center justify-center space-x-5">
      <li v-if="pageCurrent > 2"><nuxt-link :to="paginatePath +'page/'+ pagePrev +'/'" class="motion-safe:transition hover:(text-white)"><span class="sr-only">Previous</span> <i class="fa-light fa-fw fa-angle-left"></i></nuxt-link></li>
      <li v-else-if="pageCurrent === 2"><nuxt-link :to="paginatePath" class="motion-safe:transition hover:(text-white)"><span class="sr-only">Previous</span> <i class="fa-light fa-fw fa-angle-left"></i></nuxt-link></li>
      <li v-else class="pointer-events-none opacity-50"><i class="fa-light fa-fw fa-angle-left"></i></li>

      <li class="text-xs flex flex-wrap items-center justify-center"><b class="text-gray-300 font-black">{{ $route.params.page || 1 }}</b> <small class="mx-3 text-sm opacity-70">of</small> <small class="text-xs">{{ pagesTotal }}</small></li>
      
      <li v-if="pageCurrent !== pagesTotal"><nuxt-link :to="paginatePath +'page/'+ pageNext +'/'" class="motion-safe:transition hover:(text-white)"><span class="sr-only">Next</span> <i class="fa-light fa-fw fa-angle-right"></i></nuxt-link></li>
      <li v-else class="pointer-events-none opacity-50"><i class="fa-light fa-fw fa-angle-right"></i></li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    paginateCss: { type: String, default: '', },
    paginateTotal: { type: Number, default: 0, },
    paginatePer: { type: Number, default: 24, },
    paginatePath: { type: String, },
  },
  computed: {
    pagesTotal() {
      return Math.ceil(this.paginateTotal / this.paginatePer);
    },
    pageCurrent() {
      return parseInt(this.$route.params.page) || 1;
    },
    pagePrev() {
      return this.pageCurrent > 1 ? this.pageCurrent - 1 : 1;
    },
    pageNext() {
      return this.pageCurrent < this.pagesTotal ? this.pageCurrent + 1 : this.pagesTotal;
    },
  },
};
</script>