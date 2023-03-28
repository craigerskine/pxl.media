import 'instant.page';

import 'iconify-icon';

import Highway from '@dogstudio/highway';
import PageTrans from './transition';

const H = new Highway.Core({
  transitions: {
    default: PageTrans
  }
});

// highway
const links = document.querySelectorAll('header .nav-item a');
H.on('NAVIGATE_IN', ({ to, location }) => {
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    link.classList.remove('active');
    link.removeAttribute('aria-current');
    if (location.href.includes(link.href)) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  }
});

// pageloading
const pageloading = document.querySelector('.loading');
const pageloadingprogress = document.querySelector('.loading-progress');
H.on('NAVIGATE_OUT', () => {
  pageloading.classList.remove(['opacity-0']);
  pageloadingprogress.classList.add(['motion-safe:animate-progress']);
});
H.on('NAVIGATE_END', () => {
  pageloading.classList.add(['opacity-0']);
  pageloadingprogress.classList.remove(['motion-safe:animate-progress']);
});

import { install, injectGlobal } from '@twind/core';
import presetAutoprefix from '@twind/preset-autoprefix';
import presetTailwind from '@twind/preset-tailwind';

install({
  presets: [presetAutoprefix(), presetTailwind()],
  darkMode: 'class',
  hash: false,
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '960px',
    },
    extend: {
      colors: ({ theme }) => ({
        gray: theme('colors.neutral'),
      }),
      fontFamily: ({ theme }) => ({
        sans: 'Roboto,'+ theme('fontFamily.sans'),
      }),
      keyframes: {
        progress: {
          '0%': { width: '1%', },
          '25%': { width: '25%', },
          '50%': { width: '75%', },
          '75%': { width: '100%', },
          '100%': { width: '100%', },
        },
      },
      animation: {
        progress: 'progress 1s ease-in-out infinite',
      },
    },
  },
  rules: [
    [ 'box', 'bg-(white opacity-[.05])' ],
    [ 'bg-grid', { 'background-image': 'url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 4 4\' width=\'4\' height=\'4\'><rect x=\'0\' y=\'0\' width=\'2\' height=\'2\' fill=\'rgba(5,5,5,.33)\'></rect></svg>")', } ],
  ],
});

injectGlobal({
  // global
  'html': { '@apply': 'bg-gray-900' },
  'body': { '@apply': 'text-(gray-400 sm) font-sans !block' },
  '.nav-menu a': { '@apply': 'opacity-40' },
  '.nav-menu .active': { '@apply': 'opacity-100' },
  '.nav-menu .active b > b': { '@apply': 'w-full opacity-100' },
  '.input-search:hover + i': { '@apply': 'opacity-100', },
  '.input-search::-webkit-search-cancel-button': { '@apply': 'hidden', },
});

import Alpine from 'alpinejs';
window.Alpine = Alpine;

Alpine.start();