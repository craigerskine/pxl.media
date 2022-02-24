<template>
  <div>
    <heading>Controllers</heading>
    <ul class="container mx-auto mb-12 px-4 md:(grid(& flow-row cols-2) gap-12)">
      <li v-for="company of controllersCompany" :class="['mb-12 md:(mb-0)', company.slug === '8bitdo' ? 'col-span-2' : '']">
        <figure class="py-5 border(b dashed gray-500 opacity-30) block">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" role="img" class="w-auto h-12 max-w-full fill-current opacity-50">
            <title>{{ company.title }}</title>
            <g v-html="company.logo"></g>
          </svg>
          <figcaption class="sr-only">{{ company.title }}</figcaption>
        </figure>
        <ul :class="['ml-5 py-5 pl-5 border(l dashed gray-500 opacity-30) md:(ml-12 pl-12)', company.slug === '8bitdo' ? 'md:(grid(& flow-row cols-2) gap-x-12)' : '']">
          <template v-if="controllersIndexFilter(company.title).length">
            <li v-for="controller of controllersIndexFilter(company.title)" class="py-2 border(b dashed gray-500 opacity-30) flex(& wrap) items-center">
              <b>{{ controller.title }}</b>
              <div class="ml-auto opacity-75">
                <small v-text="controller.variation"></small>
                <small v-text="controller.connection"></small>
              </div>
            </li>
          </template>
          <li v-else><i class="fad fa-fw fa-frown fa-2x" title="No controllers"></i></li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data:() => ({
      controllersIndex: [],
    }),
    methods: {
      controllersIndexFilter: function(company) {
        return this.controllersIndex.filter((item) => item.company === company)
      },
    },
    async asyncData({ $content }) {
      const controllersIndex = await $content("controllers").fetch();
      const controllersCompany = await $content("_controllers-company").sortBy('title', 'asc').fetch();
      return {
        controllersIndex,
        controllersCompany,
      };
    },
    head() {
      return {
        title: 'Controllers'
      };
    },
  }
</script>