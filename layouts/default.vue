<template>
  <div class="min-h-screen flex(& col)">
    <header>
      <div class="mx-auto container flex items-center relative">
        <nav>
          <ul class="nav-menu flex items-center">
            <li class="nav-home">
              <nuxt-link to="/" aria-label="Home" class="p-4 block text-white opacity-40 motion-safe:transition hover:(opacity-100)" active-class="" exact-active-class="opacity-100">
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
            <li class="nav-item" v-for="i in ['platform', 'genre']">
              <nuxt-link :to="'/'+ i +'/'" class="group p-4 block text-white relative opacity-40 motion-safe:transition hover:(opacity-100)" active-class="active opacity-100" exact-active-class="">
                <i :class="['fa-fw', i === 'platform' ? 'fa-duotone fa-layer-group' : 'fa-solid fa-hashtag']"></i>
                <span class="sr-only" v-text="i === 'platform' ? 'Platform' : 'Genre'"></span>
                <b class="px-1 w-full h-px flex justify-center absolute inset-x-0 bottom-1">
                  <b class="w-0 bg-current opacity-0 motion-safe:transition-all group-hover:(w-full opacity-100)"></b>
                </b>
              </nuxt-link>
            </li>
          </ul>
        </nav>
        <fieldset class="mr-4 ml-auto w-64 flex justify-end items-center relative z-30">
          <label for="site-search" class="sr-only">Search</label>
          <input v-model="query" type="search" id="site-search" name="keywords" @keyup.esc="searchClose(), $event.target.blur()" placeholder="Search..." class="input-search border(& transparent) p-2 w-8 text-sm bg-transparent text-transparent cursor-pointer outline-none relative appearance-none z-10 opacity-0 motion-safe:transition-all focus:(w-full bg-gray-700 text-white opacity-100)" title="Search" autocomplete="off" />
          <i class="absolute right-0 z-0 fa-light fa-fw fa-lg fa-search opacity-40 motion-safe:transition"></i>
        </fieldset>
        <div v-if="searchResults.length" @click.prevent="searchClose()" class="bg(gray-900 opacity-60) backdrop-blur-sm fixed inset-0 z-20"></div>
        <transition name="page">
          <div v-if="searchResults.length" class="w-[40rem] max-w-full max-h-[75vh] bg(gray-800) overflow-y-scroll absolute right-0 top-full z-50 ring(1 black opacity-30) shadow-2xl lg:(mx-4)">
            <heading :subtext="searchResults.length">Games</heading>
            <ul class="list-game flex(& wrap)">
              <game v-for="(result, index) in searchResults"
                :key="result.slug"
                :title="result.title"
                :slug="result.slug"
                :note="result.note"
                :platform="result.platform"
                :genre="result.genre"
                :physical="result.physical"
                :digital="result.digital"
                :guide="result.guide"
                :pending="result.pending"
                :posted="result.posted"
              />
            </ul>
          </div>
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
        &copy;{{new Date().getFullYear()}} <a href="https://qrayg.com/" class="mx-2 text-blue-100 hover:(text-blue-500) motion-safe:transition">qrayg</a>
        - Made with
        <svg xmlns="http://www.w3.org/2000/svg" class="mx-2 text-red-500 inline-block" width="16" height="16" viewBox="0 0 16 16" role="img" aria-labelledby="footer-heart"><title id="footer-heart">Love</title><polygon class="fill-current" fill-rule="evenodd" points="8 6 12 2 16 6 8 14 0 6 4 2" /></svg>
        using
        <a href="https://code.visualstudio.com/" class="mx-2 text-blue-100 motion-safe:transition hover:(text-blue-500)">Code</a>
        +
        <a href="https://nuxtjs.org/" class="mx-2 text-blue-100 motion-safe:transition hover:(text-blue-500)">Nuxt</a>
        and is powered by a responsive layout.
      </p>
    </footer>
    <div class="bg-grid fixed inset-0 z-[-1]"><div class="bg(grad bottom repeat-x fixed) absolute inset-0 opacity-10"></div></div>
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
          .sortBy('title', 'asc')
          .search(query)
          .limit(96)
          .fetch();
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
        'bg-grad': { 'background-image': 'url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 8 480\' width=\'8\' height=\'480\'><path fill=\'rgba(255,255,255,1)\' d=\'m0 8h1v1h-1zm0 8h1v1h-1zm5 4h-1v1h1zm-5 4h1v1h-1zm5 0h-1v1h1zm-1 4h1v1h-1zm-3 4h-1v1h1zm3 0h1v1h-1zm-3 4h-1v1h1zm3 0h1v1h-1zm-3 4h-1v1h1zm3 0h1v1h-1zm-1 2h-1v1h1zm-3 2h1v1h-1zm5 0h-1v1h1zm1 2h1v1h-1zm-5 2h-1v1h1zm3 0h1v1h-1zm-1 2h-1v1h1zm-3 2h1v1h-1zm5 0h-1v1h1zm1 2h1v1h-1zm-5 2h-1v1h1zm3 0h1v1h-1zm-1 2h-1v1h1zm3 0h1v1h-1zm-5 2h-1v1h1zm3 0h1v1h-1zm-1 2h-1v1h1zm3 0h1v1h-1zm-5 2h-1v1h1zm3 0h1v1h-1zm-1 2h-1v1h1zm3 0h1v1h-1zm-5 2h-1v1h1zm3 0h1v1h-1zm-1 2h-1v1h1zm3 0h1v1h-1zm-5 2h-1v1h1zm1 0h1v1h-1zm3 0h-1v1h1zm-3 2h1v1h-1zm5 0h-1v1h1zm-7 2h1v1h-1zm5 0h-1v1h1zm1 0h1v1h-1zm-3 2h-1v1h1zm3 0h1v1h-1zm-5 2h-1v1h1zm1 0h1v1h-1zm3 0h-1v1h1zm-3 2h1v1h-1zm5 0h-1v1h1zm-7 2h1v1h-1zm5 0h-1v1h1zm1 0h1v1h-1zm-3 2h-1v1h1zm3 0h1v1h-1zm-5 2h-1v1h1zm1 0h1v1h-1zm3 0h-1v1h1zm1 0h1v1h-1zm-3 2h-1v1h1zm3 0h1v1h-1zm-5 2h-1v1h1zm1 0h1v1h-1zm3 0h-1v1h1zm1 0h1v1h-1zm-3 2h-1v1h1zm3 0h1v1h-1zm-5 2h-1v1h1zm1 0h1v1h-1zm3 0h-1v1h1zm1 0h1v1h-1zm-5 2h-1v1h1zm1 0h1v1h-1zm5 0h-1v1h1zm-7 2h1v1h-1zm3 0h-1v1h1zm1 0h1v1h-1zm3 0h-1v1h1zm-5 2h1v1h-1zm5 0h-1v1h1zm-7 2h1v1h-1zm3 0h-1v1h1zm1 0h1v1h-1zm3 0h-1v1h1zm-7 2h1v1h-1zm3 0h-1v1h1zm3 0h1v1h-1zm-5 2h-1v1h1zm1 0h1v1h-1zm3 0h-1v1h1zm1 0h1v1h-1zm-3 2h-1v1h1zm1 0h1v1h-1zm3 0h-1v1h1zm-7 2h1v1h-1zm3 0h-1v1h1zm1 0h1v1h-1zm3 0h-1v1h1zm-7 2h1v1h-1zm3 0h-1v1h1zm1 0h1v1h-1zm3 0h-1v1h1zm-7 2h1v1h-1zm3 0h-1v1h1zm1 0h1v1h-1zm3 0h-1v1h1zm-7 2h1v1h-1zm3 0h-1v1h1zm1 0h1v1h-1zm3 0h-1v1h1zm-7 2h1v1h-1zm3 0h-1v1h1zm1 0h1v1h-1zm3 0h-1v1h1zm-7 2h1v1h-1zm3 0h-1v1h1zm1 0h1v1h-1zm3 0h-1v1h1zm-7 2h1v1h-1zm3 0h-1v1h1zm1 0h1v1h-1zm3 0h-1v1h1zm-7 2h1v1h-1zm3 0h-1v1h1zm1 0h1v1h-1zm3 0h-1v1h1zm-7 2h1v1h-1zm2 1h-1v1h-1v1h1v-1h1v1h1v-1h-1zm0 0v-1h1v1zm2-1h1v1h-1zm3 0h-1v1h1zm-2 2h-1v1h1zm1 0h1v1h-1zm-5 2h-1v1h1zm1 0h1v1h-1zm3 0h-1v1h1v1h-1v1h1v-1h1v1h1v-1h-1v-1h1v-1h-1v1h-1zm-5 2h1v1h-1zm3 0h-1v1h1zm-3 329v-7h1v-1h-1v-7h1v-1h-1v-3h1v-1h-1v-3h1v-1h-1v-3h1v-1h-1v-3h1v-1h-1v-3h1v-1h-1v-3h1v-1h-1v-3h1v-1h-1v-3h1v-1h-1v-3h1v-1h-1v-3h1v-1h-1v-3h1v-1h-1v-3h1v-1h-1v-3h1v-1h-1v-3h1v-1h-1v-3h1v-1h-1v-3h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-3h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-3h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v3h-1v1h-1v1h1v-1h1v3h-1v1h-1v1h1v-1h1v3h-1v1h-1v1h1v-1h1v3h-1v1h-1v1h1v-1h1v167h-8v-8h1v-1h-1v-7h1v-1zm5-4h-1v1h1zm0-4h-1v1h1zm0-4h-1v1h1zm0-4h-1v1h1zm0-4h-1v1h1zm0-4h-1v1h1zm-2-2h-1v1h1zm2-2h-1v1h1zm2-2h-1v1h1zm-2-2h-1v1h1zm-2-2h-1v1h1zm2-2h-1v1h1zm2-2h-1v1h1zm-2-2h-1v1h1zm2-2h-1v1h1zm-4 0h-1v1h1zm2-2h-1v1h1zm-2-2h-1v1h1zm4 0h-1v1h1zm-2-2h-1v1h1zm-2-2h-1v1h1zm4 0h-1v1h1zm-2-2h-1v1h1zm2-2h-1v1h1zm-4 0h-1v1h1zm2-2h-1v1h1zm-2 0h-1v1h1zm4-2h-1v1h1zm-4 0h-1v1h1zm4-2h-1v1h1zm-2 0h-1v1h1zm-2-2h-1v1h1zm4 0h-1v1h1zm-2-2h-1v1h1zm-2 0h-1v1h1zm0-2h-1v1h1zm4 0h-1v1h1zm-2-2h-1v1h1zm2 0h-1v1h1zm-4-2h-1v1h1zm4 0h-1v1h1zm-4-2h-1v1h1zm4 0h-1v1h1zm-2 0h-1v1h1zm2-2h-1v1h1zm-4 0h-1v1h1zm2-2h-1v1h1zm-2 0h-1v1h1zm4 0h-1v1h1zm-4-2h-1v1h1zm4 0h-1v1h1zm-4-2h-1v1h1zm2 0h-1v1h1zm2 0h-1v1h1zm-4-2h-1v1h1zm4 0h-1v1h1zm-2-2h-1v1h1zm2 0h-1v1h1zm-4 0h-1v1h1zm0-2h-1v1h1zm4 0h-1v1h1zm0-2h-1v1h1zm-2 0h-1v1h1zm-2 0h-1v1h1zm4-2h-1v1h1zm-4 0h-1v1h1zm0-2h-1v1h1zm2 0h-1v1h1zm2 0h-1v1h1zm-2-2h-1v1h1zm-2 0h-1v1h1zm4 0h-1v1h1zm-4-2h-1v1h1zm4 0h-1v1h1zm-2 0h-1v1h1zm-2-2h-1v1h1zm4 0h-1v1h1zm-2 0h-1v1h1zm-2-2h-1v1h1zm2 0h-1v1h1zm2 0h-1v1h1zm-2-2h-1v1h1zm-2 0h-1v1h1zm4 0h-1v1h1zm-4-2h-1v1h1zm4 0h-1v1h1zm-2 0h-1v1h1zm2-2h-1v1h1zm-2 0h-1v1h1zm-2 0h-1v1h1zm2-2h-1v1h1zm-2 0h-1v1h1zm4 0h-1v1h1zm0-2h-1v1h1zm-2 0h-1v1h1zm-2 0h-1v1h1zm2-2h-1v1h1zm2 0h-1v1h1zm-4 0h-1v1h1zm-1-1h-1v1h1zm3-1h-1v1h1zm-2 0h-1v1h1zm4 0h-1v1h1zm-2-2h-1v1h1zm-2 0h-1v1h1zm4 0h-1v1h1zm-1-1h-1v1h1zm-3-1h-1v1h1zm4 0h-1v1h1zm-2 0h-1v1h1zm2-2h-1v1h1zm-4 0h-1v1h1zm2 0h-1v1h1zm-3-1h-1v1h1zm3-1h-1v1h1zm2 0h-1v1h1zm-4 0h-1v1h1zm0-2h-1v1h1zm2 0h-1v1h1zm2 0h-1v1h1zm-1-1h-1v1h1zm-3-1h-1v1h1zm4 0h-1v1h1zm-2 0h-1v1h1zm2-2h-1v1h1zm-4 0h-1v1h1zm2 0h-1v1h1zm1-1h-1v1h1zm-4 0h-1v1h1zm3-1h-1v1h1zm2 0h-1v1h1zm-4 0h-1v1h1zm4-2h-1v1h1zm-2 0h-1v1h1zm-2 0h-1v1h1zm3-1h-1v1h1zm-4 0h-1v1h1zm5-1h-1v1h1zm-2 0h-1v1h1zm-2 0h-1v1h1zm2-2h-1v1h1zm2 0h-1v1h1zm-4 0h-1v1h1zm3-1h-1v1h1zm-4 0h-1v1h1zm3-1h-1v1h1zm-2 0h-1v1h1zm4 0h-1v1h1zm-3-1h-1v1h1zm1-1h-1v1h1zm2 0h-1v1h1zm-4 0h-1v1h1zm3-1h-1v1h1zm-4 0h-1v1h1zm3-1h-1v1h1zm-2 0h-1v1h1zm4 0h-1v1h1zm0-2h-1v1h1zm-4 0h-1v1h1zm2 0h-1v1h1zm-3-1h-1v1h1zm4 0h-1v1h1zm-1-1h-1v1h1zm2 0h-1v1h1zm-4 0h-1v1h1zm1-1h-1v1h1zm-1-1h-1v1h1zm4 0h-1v1h1zm-2 0h-1v1h1zm-3-1h-1v1h1zm4 0h-1v1h1zm-1-1h-1v1h1zm-2 0h-1v1h1zm0-2h-1v1h1zm4 0h-1v1h1zm-2 0h-1v1h1zm1-1h-1v1h1zm-4 0h-1v1h1zm3-1h-1v1h1zm-2 0h-1v1h1zm1-1h-1v1h1zm-1-1h-1v1h1zm4 0h-1v1h1zm-2 0h-1v1h1zm1-1h-1v1h1zm-4 0h-1v1h1zm1-1h-1v1h1zm2 0h-1v1h1zm2-2h-1v1h1zm-4 0h-1v1h1zm2 0h-1v1h1zm1-1h-1v1h1zm-5 0v1h-1v-1zm3-4h1v1h-1v1h-1v-1h-1v1h1v1h-1v1h-1v-1h-1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v3h-1v1h-1v1h-1v-1h-1zm1 3h-1v1h1zm2-2h-1v1h1zm-6-1v1h-1v-1zm1-3v1h1v1h-1v1h-1v-1h-1v-1h1v-1zm5 0h-1v1h1zm-3 0v1h-1v-1zm2-7h1v1h-1v1h1v-1h1v3h-1v1h-1v1h-1v-1h-1v1h-1v1h-1v-1h-1v1h-1v-1h1v-1h-1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v3h-1v-1h-1zm-1 6v1h-1v-1zm-2-1h-1v1h1zm1-1h-1v1h1zm1-1h-1v1h1zm-2 0h-1v1h1zm4 0h-1v1h1zm-1-1h-1v1h1zm-5 0v1h-1v-1zm4-1h-1v1h1zm-3-2v1h1v1h-1v1h-1v-1h-1v-1h1v-1zm2 0v1h-1v-1zm-3-1v1h-1v-1zm4 0v1h-1v-1zm-2 0v1h-1v-1zm1 0h-1v-1h1v-1h1v-1h1v1h1v1h-1v1h-1v-1h-1zm0-4h1v1h-1v1h-1v-1h-1v1h1v1h-1v1h-1v-1h-1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v1h1v1h-1v1h-1v-1h-1zm4 1v1h-1v-1zm-1-1v1h-1v-1zm-6 0v1h-1v-1zm7-1v1h-1v-1zm-6-2v1h1v1h-1v1h-1v-1h-1v-1h1v-1zm2 0v1h-1v-1zm4 0v1h-1v-1zm-1-1v1h-1v-1zm-4 0v1h-1v-1zm-2 0v1h-1v-1zm4 0v1h-1v-1zm3-1v1h-1v-1zm-4 1h-1v-1h1v-1h1v-1h1v1h1v1h-1v1h-1v-1h-1zm0-4h1v1h-1v1h-1v-1h-1v1h1v1h-1v1h-1v-1h-1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v1h1v1h-1v1h-1v-1h-1zm4 1v1h-1v-1zm-1-1v1h-1v-1zm-6 0v1h-1v-1zm7-1v1h-1v-1zm-6-2v1h1v1h-1v1h-1v-1h-1v-1h1v-1zm2 0v1h-1v-1zm4 0v1h-1v-1zm-5-1v1h-1v-1zm2 0v1h-1v-1zm-4 0v1h-1v-1zm6 0v1h-1v-1zm-3 0h-1v-1h1v-1h1v-1h1v1h1v1h-1v1h-1v-1h-1zm4-1v1h-1v-1zm-6-2v1h1v1h-1v1h-1v-1h-1v-1h1v-1zm6 0v1h-1v-1zm-4 0v1h-1v-1zm-1-1v1h-1v-1zm2 0v1h-1v-1zm2 0v1h-1v-1zm-6 0v1h-1v-1zm3 0h-1v-1h1v-1h1v-1h1v1h1v1h-1v1h-1v-1h-1zm-2-2h1v1h-1v1h-1v-1h-1v-1h1v-1h1v-1h1v-1h-1v1h-1v-1h1v-1h1v-1h1v1h1v-1h1v1h1v1h-1v1h-1v1h-1v1h-1v-1h-1zm6 1v1h-1v-1zm0-2v1h-1v-1zm-4-1h-1v1h1zm3 0v1h-1v-1zm-6 0v1h-1v-1zm4-1h-1v1h1zm3 0v1h-1v-1zm-4-1h-1v1h1zm-3 0v1h-1v-1zm7-1v1h-1v-1zm-6 0v1h-1v-1zm1-1v1h-1v-1zm4 0v1h-1v-1zm-6 0v1h-1v-1zm4 0v1h-1v-1zm3-1v1h-1v-1zm-6-2v1h1v1h-1v1h-1v-1h-1v-1h1v-1zm4 2v1h-1v-1zm-2 0v1h-1v-1zm1-1v1h-1v-1zm2 0v1h-1v-1zm-3-1v1h-1v-1zm2 0v1h-1v-1zm2 0v1h-1v-1zm-1-1v1h-1v-1zm-4 0v1h-1v-1zm-2 0v1h-1v-1zm4 0v1h-1v-1zm-1 0h-1v-1h1v-1h1v-1h1v1h1v1h-1v1h-1v-1h-1zm4-1v1h-1v-1zm-6 0v1h-1v-1zm-1-1v1h-1v-1zm2 0v1h-1v-1zm5-1v1h-1v-1zm-4 0v1h-1v-1zm-2 0v1h-1v-1zm3-1v1h-1v-1zm-4 0v1h-1v-1zm6 0v1h-1v-1zm-4 0v1h-1v-1zm5-1v1h-1v-1zm-6-2v1h1v1h-1v1h-1v-1h-1v-1h1v-1zm2 2v1h-1v-1zm2 0v1h-1v-1zm-1-1v1h-1v-1zm2 0v1h-1v-1zm1-1v1h-1v-1zm-2 0v1h-1v-1zm-2 0v1h-1v-1zm-1-1v1h-1v-1zm4 0v1h-1v-1zm-6 0v1h-1v-1zm4 0v1h-1v-1zm1-1v1h-1v-1zm2 0v1h-1v-1zm-6 0v1h-1v-1zm2 0v1h-1v-1zm-1-1v1h-1v-1zm2 0v1h-1v-1zm2 0v1h-1v-1zm-6 0v1h-1v-1zm3-1v1h-1v-1zm2 0v1h-1v-1zm2 0v1h-1v-1zm-6 0v1h-1v-1zm1-1v1h-1v-1zm-2 0v1h-1v-1zm4 0v1h-1v-1zm2 0v1h-1v-1zm-3-1v1h-1v-1zm4 0v1h-1v-1zm-2 0v1h-1v-1zm-4 0v1h-1v-1zm5-1v1h-1v-1zm-4 0v1h-1v-1zm-2 0v1h-1v-1zm4 0v1h-1v-1zm-3-1v1h-1v-1zm6 0v1h-1v-1zm-4 0v1h-1v-1zm2 0v1h-1v-1zm-1-1v1h-1v-1zm-2 0v1h-1v-1zm-2 0v1h-1v-1zm6 0v1h-1v-1zm-5-1v1h-1v-1zm6 0v1h-1v-1zm-2 0v1h-1v-1zm-2 0v1h-1v-1zm3-1v1h-1v-1zm-6 0v1h-1v-1zm2 0v1h-1v-1zm2 0v1h-1v-1zm-1-1v1h-1v-1zm4 0v1h-1v-1zm-2 0v1h-1v-1zm-4 0v1h-1v-1zm1-1v1h-1v-1zm-2 0v1h-1v-1zm4 0v1h-1v-1zm2 0v1h-1v-1zm-1-1v1h-1v-1zm2 0v1h-1v-1zm-4 0v1h-1v-1zm-2 0v1h-1v-1zm5-1v1h-1v-1zm-6 0v1h-1v-1zm4 0v1h-1v-1zm-2 0v1h-1v-1zm5-1v1h-1v-1zm-4 0v1h-1v-1zm2 0v1h-1v-1zm1-1v1h-1v-1zm-4 0v1h-1v-1zm2 0v1h-1v-1zm-4 0v1h-1v-1zm1-1v1h-1v-1zm2 0v1h-1v-1zm4 0v1h-1v-1zm-2 0v1h-1v-1zm-5-1v1h-1v-1zm2 0v1h-1v-1zm4 0v1h-1v-1zm-2 0v1h-1v-1zm-1-1v1h-1v-1zm-2 0v1h-1v-1zm6 0v1h-1v-1zm-7-1v1h-1v-1zm4 0v1h-1v-1zm2 0v1h-1v-1zm-4 0v1h-1v-1zm3-1v1h-1v-1zm-4 0v1h-1v-1zm2 0v1h-1v-1zm4 0v1h-1v-1zm-3-1v1h-1v-1zm-2 0v1h-1v-1zm-2 0v1h-1v-1zm6 0v1h-1v-1zm-1-1v1h-1v-1zm-2 0v1h-1v-1zm4 0v1h-1v-1zm-1-1v1h-1v-1zm-6 0v1h-1v-1zm4 0v1h-1v-1zm-2 0v1h-1v-1zm1-1v1h-1v-1zm2 0v1h-1v-1zm-4 0v1h-1v-1zm6 0v1h-1v-1zm-3-1v1h-1v-1zm-4 0v1h-1v-1zm2 0v1h-1v-1zm4 0v1h-1v-1zm-3-1v1h-1v-1zm4 0v1h-1v-1zm-6 0v1h-1v-1zm5-1v1h-1v-1zm-6 0v1h-1v-1zm2 0v1h-1v-1zm2 0v1h-1v-1zm-3-1v1h-1v-1zm4 0v1h-1v-1zm2 0v1h-1v-1zm-4 0v1h-1v-1zm1-1v1h-1v-1zm-4 0v1h-1v-1zm6 0v1h-1v-1zm-4 0v1h-1v-1zm1-1v1h-1v-1zm4 0v1h-1v-1zm-3-1v1h-1v-1zm-2 0v1h-1v-1zm4 0v1h-1v-1zm-6 0v1h-1v-1zm3-1v1h-1v-1zm-2 0v1h-1v-1zm4 0v1h-1v-1zm2 0v1h-1v-1zm-5-1v1h-1v-1zm4 0v1h-1v-1zm-2 0v1h-1v-1zm-4 0v1h-1v-1zm3-1v1h-1v-1zm4 0v1h-1v-1zm-7-1v1h-1v-1zm4 0v1h-1v-1zm2 0v1h-1v-1zm-4 0v1h-1v-1zm5-1v1h-1v-1zm-6 0v1h-1v-1zm2 0v1h-1v-1zm2 0v1h-1v-1zm-1-1v1h-1v-1zm2 0v1h-1v-1zm-6 0v1h-1v-1zm2 0v1h-1v-1zm1-1v1h-1v-1zm4 0v1h-1v-1zm-5-1v1h-1v-1zm4 0v1h-1v-1zm-6 0v1h-1v-1zm4 0v1h-1v-1zm1-1v1h-1v-1zm-4 0v1h-1v-1zm6 0v1h-1v-1zm-7-1v1h-1v-1zm6 0v1h-1v-1zm-2 0v1h-1v-1zm-2 0v1h-1v-1zm5-1v1h-1v-1zm-4 0v1h-1v-1zm1-1v1h-1v-1zm2 0v1h-1v-1zm-4 0v1h-1v-1zm-2 0v1h-1v-1zm7-1v1h-1v-1zm-4 0v1h-1v-1zm-2 0v1h-1v-1zm4 0v1h-1v-1zm-1-1v1h-1v-1zm2 0v1h-1v-1zm-4 0v1h-1v-1zm-2 0v1h-1v-1zm3-1v1h-1v-1zm4 0v1h-1v-1zm-7-1v1h-1v-1zm2 0v1h-1v-1zm4 0v1h-1v-1zm-2 0v1h-1v-1zm1-1v1h-1v-1zm-4 0v1h-1v-1zm6 0v1h-1v-1zm-7-1v1h-1v-1zm2 0v1h-1v-1zm4 0v1h-1v-1zm-2 0v1h-1v-1zm3-1v1h-1v-1zm-4 0v1h-1v-1zm-3-1v1h-1v-1zm6 0v1h-1v-1zm-4 0v1h-1v-1zm2 0v1h-1v-1zm-1-1v1h-1v-1zm-2 0v1h-1v-1zm4 0v1h-1v-1zm-3-1v1h-1v-1zm-2 0v1h-1v-1zm4 0v1h-1v-1zm2 0v1h-1v-1zm1-1v1h-1v-1zm-4 0v1h-1v-1zm1-1v1h-1v-1zm2 0v1h-1v-1zm-6 0v1h-1v-1zm2 0v1h-1v-1zm-1-1v1h-1v-1zm4 0v1h-1v-1zm1-1v1h-1v-1zm-4 0v1h-1v-1zm-2 0v1h-1v-1zm4 0v1h-1v-1zm-1-1v1h-1v-1zm4 0v1h-1v-1zm-1-1v1h-1v-1zm-6 0v1h-1v-1zm4 0v1h-1v-1zm-2 0v1h-1v-1zm-1-1v1h-1v-1zm4 0v1h-1v-1zm-2 0v1h-1v-1zm-1-1v1h-1v-1zm4 0v1h-1v-1zm-2 0v1h-1v-1zm-4 0v1h-1v-1zm7-1v1h-1v-1zm-4 0v1h-1v-1zm1-1v1h-1v-1zm2 0v1h-1v-1zm-6 0v1h-1v-1zm2 0v1h-1v-1zm-1-1v1h-1v-1zm4 0v1h-1v-1zm1-1v1h-1v-1zm-2 0v1h-1v-1zm-4 0v1h-1v-1zm2 0v1h-1v-1zm1-1v1h-1v-1zm4 0v1h-1v-1zm-5-1v1h-1v-1zm4 0v1h-1v-1zm-6 0v1h-1v-1zm4 0v1h-1v-1zm1-1v1h-1v-1zm-4 0v1h-1v-1zm1-1v1h-1v-1zm-2 0v1h-1v-1zm4 0v1h-1v-1zm2 0v1h-1v-1zm1-1v1h-1v-1zm-1-1v1h-1v-1zm-2 0v1h-1v-1zm-4 0v1h-1v-1zm2 0v1h-1v-1zm3-1v1h-1v-1zm-4 0v1h-1v-1zm1-1v1h-1v-1zm2 0v1h-1v-1zm2 0v1h-1v-1zm-6 0v1h-1v-1zm7-1v1h-1v-1zm-4 0v1h-1v-1zm1-1v1h-1v-1zm-4 0v1h-1v-1zm2 0v1h-1v-1zm4 0v1h-1v-1zm-1-1v1h-1v-1zm-4 0v1h-1v-1zm5-1v1h-1v-1zm-2 0v1h-1v-1zm-4 0v1h-1v-1zm2 0v1h-1v-1zm5-1v1h-1v-1zm-1-1v1h-1v-1zm-2 0v1h-1v-1zm-4 0v1h-1v-1zm2 0v1h-1v-1zm3-1v1h-1v-1zm-4 0v1h-1v-1zm-1-1v1h-1v-1zm2 0v1h-1v-1zm4 0v1h-1v-1zm-2 0v1h-1v-1zm-1-1v1h-1v-1zm-3-1v1h-1v-1zm4 0v1h-1v-1zm2 0v1h-1v-1zm-4 0v1h-1v-1zm3-1v1h-1v-1zm-4 0v1h-1v-1zm-1-1v1h-1v-1zm2 0v1h-1v-1zm2 0v1h-1v-1zm2 0v1h-1v-1zm0-2v1h-1v-1zm-2 0v1h-1v-1zm-2 0v1h-1v-1zm-2 0v1h-1v-1zm5-1v1h-1v-1zm-4 0v1h-1v-1zm-1-1v1h-1v-1zm6 0v1h-1v-1zm-2 0v1h-1v-1zm-2 0v1h-1v-1zm1-1v1h-1v-1zm-1-1v1h-1v-1zm2 0v1h-1v-1zm2 0v1h-1v-1zm-6 0v1h-1v-1zm5-1v1h-1v-1zm-4 0v1h-1v-1zm5-1v1h-1v-1zm-4 0v1h-1v-1zm2 0v1h-1v-1zm-4 0v1h-1v-1zm4-2v1h-1v-1zm-2 0v1h-1v-1zm-2 0v1h-1v-1zm6 0v1h-1v-1zm-5-1v1h-1v-1zm4 0v1h-1v-1zm-1-1v1h-1v-1zm-2 0v1h-1v-1zm4 0v1h-1v-1zm-6 0v1h-1v-1zm0-2v1h-1v-1zm6 0v1h-1v-1zm-4 0v1h-1v-1zm2 0v1h-1v-1zm1-1v1h-1v-1zm-4 0v1h-1v-1zm-1-1v1h-1v-1zm2 0v1h-1v-1zm4 0v1h-1v-1zm-2 0v1h-1v-1zm0-2v1h-1v-1zm2 0v1h-1v-1zm-6 0v1h-1v-1zm2 0v1h-1v-1zm3-1v1h-1v-1zm1-1v1h-1v-1zm-2 0v1h-1v-1zm-4 0v1h-1v-1zm2 0v1h-1v-1zm0-2v1h-1v-1zm2 0v1h-1v-1zm2 0v1h-1v-1zm-6 0v1h-1v-1zm1-1v1h-1v-1zm5-1v1h-1v-1zm-6 0v1h-1v-1zm2 0v1h-1v-1zm2 0v1h-1v-1z\' fill-rule=\'evenodd\' /></svg>")', },
        'bg-close': { 'background-image': 'url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 10 10\' width=\'10\' height=\'10\'><g fill=\'rgba(255,255,255,.66)\' fill-rule=\'evenodd\'><polygon points=\'8 0 10 2 7 5 10 8 8 10 5 7 2 10 0 8 3 5 0 2 2 0 5 3\'></polygon></g></svg>")', },
      },
    })
    tw(() => ({
      '@global': {
        '.nav-menu .active b > b': { '@apply': 'w-full opacity-100'},
        '.input-search:hover + i': { '@apply': 'opacity-100', },
        '.input-search::-webkit-search-cancel-button': { '@apply': 'hidden', },
        '.box': { 'background-color': 'rgba(255,255,255,.05)', },
        '.page-enter-active,.page-leave-active': { '@apply': 'motion-safe:transition', },
        '.page-enter,.page-leave-to': { '@apply': 'scale-[.98] opacity-0', },
      }
    }))
  }

  twindinit()
</script>