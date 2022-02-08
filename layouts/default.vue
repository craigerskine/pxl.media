<template>
  <div class="min-h-screen flex(& col)">
    <header>
      <div class="mx-auto container flex items-center relative">
        <nav>
          <ul class="nav-menu flex items-center">
            <li class="nav-home">
              <nuxt-link to="/" aria-label="Home" class="p-4 block text-white opacity-30 hover:(opacity-100) focus:(opacity-100) transition" active-class="" exact-active-class="opacity-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" role="img" class="block fill-current">
                  <title>pxl.media</title>
                  <g fill-rule="evenodd">
                    <rect width="8" height="8" x="8" y="8" opacity=".25" />
                    <rect width="8" height="8" y="8" opacity=".5" />
                    <rect width="8" height="8" x="8" opacity=".75" />
                    <rect width="8" height="8" />
                  </g>
                </svg>
              </nuxt-link>
            </li>
            <li class="nav-item" v-for="(i, index) in 2">
              <nuxt-link :to="index === 0 ? '/platform/' : '/genre/'" class="p-4 block text-white opacity-30 hover:(opacity-100) focus:(opacity-100) transition" active-class="opacity-100" exact-active-class="">
                <i :class="['fad fa-fw', index === 0 ? 'fa-layer-group' : 'fa-filter']" :title="index === 0 ? 'Platform' : 'Genre'"></i>
              </nuxt-link>
            </li>
          </ul>
        </nav>
        <fieldset class="mr-4 ml-auto w-64 flex justify-end items-center relative">
          <label for="site-search" class="sr-only">Search</label>
          <input type="search" id="site-search" name="keywords" placeholder="Search..." class="input-search border border-transparent p-2 w-8 focus:w-full text-sm bg-transparent focus:bg-gray-700 text-transparent focus:text-white cursor-pointer outline-none relative z-10 opacity-0 focus:opacity-100 transition-all" title="Search" v-model="query" autocomplete="off" />
          <i class="absolute right-0 z-0 far fa-fw fa-lg fa-search opacity-30 transition"></i>
        </fieldset>
        <ul v-if="results.length" class="p-5 w-full bg(black) absolute inset-x-0 top-full z-50">
          <li v-for="result of results" :key="result.slug">
            {{ result.title }}
          </li>
        </ul>
      </div>
    </header>
    <main class="pt-8 flex-1">
      <section class="container mx-auto">
        <Nuxt />
      </section>
    </main>
    <footer class="mt-auto">
      <p class="foot-info m-0 pt-4 pb-8 px-4 font-bold text-center text-xs md:text-sm">
        &copy;{{new Date().getFullYear()}} <a href="https://qrayg.com/" class="mx-2 text-blue-100 hover:(text-blue-500) focus:(text-blue-500) transition">qrayg</a>
        - Made with
        <svg xmlns="http://www.w3.org/2000/svg" class="mx-2 text-red-500 inline-block" width="16" height="16" viewBox="0 0 16 16" role="img" aria-labelledby="footer-heart"><title id="footer-heart">Love</title><polygon class="fill-current" fill-rule="evenodd" points="8 6 12 2 16 6 8 14 0 6 4 2" /></svg>
        using
        <a href="https://code.visualstudio.com/" class="mx-2 text-blue-100 hover:(text-blue-500) focus:(text-blue-500) transition">Code</a>
        +
        <a href="http://netlifycms.org/" class="mx-2 text-blue-100 hover:(text-blue-500) focus:(text-blue-500) transition">Netlify</a>
        and is powered by a responsive layout.
      </p>
    </footer>
    <div class="bg-gradient-to-b from-transparent via-transparent to-gray-800 fixed inset-0 z-[-1]"><div class="bg(grid fixed) absolute inset-0"></div></div>
  </div>
</template>

<script>
  export default {
    head() {
      return {

      };
    },
    data() {
      return {
        query: '',
        results: []
      }
    },
    watch: {
      async query(query) {
        if(!query) {
          this.results = []
          return
        }
        this.results = await this.$content('games')
          .only(['title', 'slug'])
          .sortBy('title', 'asc')
          .limit(20)
          .search('title', query)
          .fetch();
      }
    }
  }
</script>