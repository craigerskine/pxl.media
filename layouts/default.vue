<template>
  <div class="min-h-screen flex(& col)">
    <header>
      <div class="mx-auto container flex items-center relative">
        <nav>
          <ul class="nav-menu flex items-center">
            <li class="nav-home">
              <nuxt-link to="/" aria-label="Home" class="p-4 block text-white opacity-40 transition hover:(opacity-100) focus:(opacity-100)" active-class="" exact-active-class="opacity-100">
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
            <li class="nav-item" v-for="i in 2">
              <nuxt-link :to="i === 1 ? '/platform/' : '/genre/'" class="p-4 block text-white opacity-40 transition hover:(opacity-100) focus:(opacity-100)" active-class="opacity-100" exact-active-class="">
                <i :class="['fa-fw', i === 1 ? 'fa-duotone fa-layer-group' : 'fa-duotone fa-bars-filter']"></i>
                <span class="sr-only" v-text="i === 1 ? 'Platform' : 'Genre'"></span>
              </nuxt-link>
            </li>
          </ul>
        </nav>
        <fieldset class="mr-4 ml-auto w-64 flex justify-end items-center relative z-30">
          <label for="site-search" class="sr-only">Search</label>
          <input v-model="query" type="search" id="site-search" name="keywords" @keyup.esc="searchClose()" placeholder="Search..." class="input-search border(& transparent) p-2 w-8 text-sm bg-transparent text-transparent cursor-pointer outline-none relative appearance-none z-10 opacity-0 transition-all focus:(w-full bg-gray-700 text-white opacity-100)" title="Search" autocomplete="off" />
          <i class="absolute right-0 z-0 fa-light fa-fw fa-lg fa-search opacity-40 transition"></i>
        </fieldset>
        <div v-if="searchResults.length" @click.prevent="searchClose()" class="bg(gray-900 opacity-60) backdrop-blur-sm fixed inset-0 z-20"></div>
        <transition name="page">
          <ul v-if="searchResults.length" class="w-full max-h-[75vh] bg(gray-800) overflow-y-scroll absolute right-0 top-full z-50 ring(1 black opacity-30) shadow-2xl lg:(mx-4 w-1/2)">
            <li class="bg(gray-800) text(xs) uppercase flex(& row-reverse) items-center sticky top-0 z-20 shadow-xl">
              <button @click.prevent="searchClose()" aria-label="Close" class="ml-auto p-2 hover:(text-gray-200) focus:(text-gray-200 outline-none)">
                <i class="fa-solid fa-fw fa-xmark"></i>
              </button>
              <p class="py-1 px-4"><b v-text="searchResults.length"></b> Games</p>
            </li>
            <li v-for="(result, index) in searchResults" :key="result.slug" :class="['py-3 px-4 leading-loose flex items-center space-x-4', index % 2 === 0 ? 'border(t white opacity-5) bg-white bg-opacity-5' : '']">
              <div class="min-w-0 flex-1">
                <b v-text="result.title" class="min-w-0 text-gray-300 leading-none block truncate" :title="result.title"></b>
                <small v-if="result.note" v-text="result.note" class="pt-1 italic leading-none block opacity-80"></small>
              </div>
              <nuxt-link :to="'/platform/'+ result.platform +'/'" class="ml-auto text(gray-200 opacity-50) flex-none transition-all hover:(text-white opacity-100) focus:(text-white opacity-100)">
                <svg v-for="item of searchPlatform(result.platform)" :key="item.slug" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" role="img" class="w-[50px] h-auto fill-current">
                  <title>{{ item.title }}</title>
                  <g v-html="item.logo"></g>
                </svg>
              </nuxt-link>
            </li>
          </ul>
        </transition>
      </div>
    </header>
    <main class="pt-8 flex-1">
      <section class="container mx-auto">
        <nuxt />
      </section>
    </main>
    <footer class="mt-auto">
      <p class="foot-info m-0 pt-4 pb-8 px-4 font-bold text-center text-xs md:text-sm">
        &copy;{{new Date().getFullYear()}} <a href="https://qrayg.com/" class="mx-2 text-blue-100 hover:(text-blue-500) focus:(text-blue-500) transition">qrayg</a>
        - Made with
        <svg xmlns="http://www.w3.org/2000/svg" class="mx-2 text-red-500 inline-block" width="16" height="16" viewBox="0 0 16 16" role="img" aria-labelledby="footer-heart"><title id="footer-heart">Love</title><polygon class="fill-current" fill-rule="evenodd" points="8 6 12 2 16 6 8 14 0 6 4 2" /></svg>
        using
        <a href="https://code.visualstudio.com/" class="mx-2 text-blue-100 transition hover:(text-blue-500) focus:(text-blue-500)">Code</a>
        +
        <a href="https://nuxtjs.org/" class="mx-2 text-blue-100 transition hover:(text-blue-500) focus:(text-blue-500)">Nuxt</a>
        and is powered by a responsive layout.
      </p>
    </footer>
    <div class="bg-gradient-to-b from-transparent via-transparent to-gray-800 fixed inset-0 z-[-1]"><div class="bg(grid fixed) absolute inset-0"></div></div>
  </div>
</template>

<script>
  import { tw, setup, theme, silent } from 'twind/shim'
  import { css, apply } from 'twind/css'
  import * as colors from 'twind/colors'

  export default {
    data() {
      return {
        query: '',
        searchResults: [],
        resultPlatforms: [],
      }
    },
    methods: {
      searchPlatform: function(platform) {
        return this.resultPlatforms.filter((item) => item.slug === platform)
      },
      searchClose: function() {
        this.query = '';
        this.searchResults = [];
      },
    },
    watch: {
      async query(query) {
        if(!query) {
          this.searchResults = []
          return
        }
        this.searchResults = await this.$content('games')
          .only(['title', 'slug', 'platform', 'note'])
          .sortBy('title', 'asc')
          .search(query)
          .fetch();
        this.resultPlatforms = await this.$content("_platform").only(['title', 'slug', 'logo']).fetch();
      }
    },
    head() {
      return {
        
      };
    },
  }

  async function twindinit() {
    setup({
      mode: silent,
      theme: {
        screens: {
          'sm': '640px',
          'md': '768px',
          'lg': '960px',
        },
        extend: {
          colors: {
            gray: colors.trueGray,
          },
          fontFamily: (theme) => ({ sans: 'Roboto,'+ theme('fontFamily.sans') }),
        },
      },
      plugins: {
        'backdrop-blur-sm': { 'backdrop-filter': 'blur(4px)' },
        'bg-grid': { 'background-image': 'url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 4 4\' width=\'4\' height=\'4\'><rect x=\'0\' y=\'0\' width=\'2\' height=\'2\' fill=\'rgba(5,5,5,.33)\'></rect></svg>")', },
        'bg-close': { 'background-image': 'url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 10 10\' width=\'10\' height=\'10\'><g fill=\'rgba(255,255,255,.66)\' fill-rule=\'evenodd\'><polygon points=\'8 0 10 2 7 5 10 8 8 10 5 7 2 10 0 8 3 5 0 2 2 0 5 3\'></polygon></g></svg>")', },
      },
    })
    tw(() => ({
      '@global': {
        '.input-search:hover + i': { '@apply': 'opacity-100', },
        '.input-search::-webkit-search-cancel-button': { '@apply': 'hidden', },
        '.box': { 'background-color': 'rgba(255,255,255,.05)', },
        '.page-enter-active,.page-leave-active': { '@apply': 'transition', },
        '.page-enter,.page-leave-to': { '@apply': 'scale-[.98] opacity-0', },
      }
    }))
  }

  twindinit()
</script>