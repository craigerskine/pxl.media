<template>
  <div>
    <heading>Systems</heading>
    <ul class="container mx-auto mb-12 px-4 md:(grid(& flow-row cols-2) gap-12)">
      <li v-for="platform of systemPlatform" class="mb-12 md:(mb-0)">
        <nuxt-link :to="'/platform/'+ platform.slug +'/'" class="group py-5 border(b dashed gray-500 opacity-30) block transition hover:(text-white) focus:(text-white)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" role="img" class="w-auto h-12 max-w-full fill-current opacity-50 transition group-hover:(opacity-100) group-focus:(opacity-100)">
            <title>{{ platform.title }}</title>
            <g v-html="platform.logo"></g>
          </svg>
        </nuxt-link>
        <ul class="mt-5 ml-5 pl-5 border(l dashed gray-500 opacity-30) divide(y dashed gray-500 opacity-30) md:(ml-12 pl-12)">
          <template v-if="systemIndexFilter(platform.slug).length">
            <li v-for="system of systemIndexFilter(platform.slug)" class="py-2 flex(& wrap) items-center">
              <b>{{ system.title }}</b>
              <div class="ml-auto opacity-75">
                <small v-text="system.variation"></small>
                <small v-text="system.accessories"></small>
                <i v-if="system.system_type === 'mini'" class="fad fa-fw fa-compress-arrows-alt ml-1"></i>
              </div>
            </li>
          </template>
          <li v-else><i class="fad fa-fw fa-frown fa-2x" title="No systems"></i></li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data:() => ({
      systemIndex: [],
    }),
    methods: {
      systemIndexFilter: function(platform) {
        return this.systemIndex.filter((item) => item.platform === platform)
      },
    },
    async asyncData({ $content }) {
      const systemIndex = await $content("systems").fetch();
      const systemPlatform = await $content("_platform").sortBy('order').fetch();
      return {
        systemIndex,
        systemPlatform,
      };
    },
    head() {
      return {
        title: 'Systems'
      };
    },
  }
</script>