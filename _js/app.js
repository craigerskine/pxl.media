import Highway from '@dogstudio/highway';
import PageTrans from './_transition';

const H = new Highway.Core({
  transitions: {
    default: PageTrans
  }
});

// nav - seriously highway?
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
      colors: {
        gray: presetTailwind().theme.colors.neutral,
      },
      fontFamily: {
        sans: 'Roboto,'+ presetTailwind().theme.fontFamily.sans,
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