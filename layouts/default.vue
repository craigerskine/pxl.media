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
            <li class="nav-item" v-for="i in ['platform', 'genre']" :key="i">
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
        <search></search>
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
    <div class="bg-grid fixed inset-0 z-[-1]"></div>
  </div>
</template>

<script>
  import { tw, setup, theme, silent } from 'twind/shim'
  import { css, apply } from 'twind/css'
  import * as colors from 'twind/colors'

  export default {
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