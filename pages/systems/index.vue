<template>
  <div>
    <heading :subtext="systemIndex.length">Systems</heading>
    <ul class="container mx-auto mb-12 px-4 md:(grid(& flow-row cols-2) gap-12)">
      <li v-for="platform of systemPlatform" class="mb-12 flex(& col) md:(mb-0)">
        <nuxt-link :to="'/platform/'+ platform.slug +'/'" class="group py-5 border(b dashed gray-500 opacity-30) flex-none transition hover:(text-white) focus:(text-white)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" role="img" class="w-auto h-12 max-w-full fill-current opacity-50 transition group-hover:(opacity-100) group-focus:(opacity-100)">
            <title>{{ platform.title }}</title>
            <g v-html="platform.logo"></g>
          </svg>
        </nuxt-link>
        <ul class="ml-5 border(l dashed gray-500 opacity-30) flex(& col) md:(ml-12)">
          <template v-if="systemIndexFilter(platform.slug).length">
            <li v-for="system of systemIndexFilter(platform.slug)" class="py-2 border(b dashed gray-500 opacity-30) flex items-center">
              <div class="w-8 h-8 border(1 dashed gray-500 opacity-30) bg(grid gray-900) flex-none flex rounded-full -translate-x-4"><i class="far fa-fw fa-computer-classic fa-lg m-auto opacity-30"></i></div>
              <div class="flex-1">
                <b>{{ system.title }}</b>
                <div class="flex justify-between opacity-75">
                  <small>
                    <span v-text="system.variation"></span>
                    <span v-text="system.accessories"></span>
                  </small>
                  <i v-if="system.system_type === 'mini'" class="fad fa-fw fa-compress-arrows-alt ml-1" title="Mini/Classic"></i>
                </div>
              </div>
            </li>
          </template>
          <li v-else class="py-2 pl-5 border(b dashed gray-500 opacity-30) md:(pl-12)"><i class="fat fa-fw fa-ban" title="No systems"></i></li>
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