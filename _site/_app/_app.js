// instant page
import 'instant.page';

// icons
import 'iconify-icon';

// // highway - animations
// import Highway from '@dogstudio/highway';
// import PageTrans from './transition';
// const H = new Highway.Core({
//   transitions: {
//     default: PageTrans
//   }
// });
// const links = document.querySelectorAll('header .nav-item a');
// H.on('NAVIGATE_IN', ({ to, location }) => {
//   for (let i = 0; i < links.length; i++) {
//     const link = links[i];
//     link.classList.remove('active');
//     link.removeAttribute('aria-current');
//     if (location.href.includes(link.href)) {
//       link.classList.add('active');
//       link.setAttribute('aria-current', 'page');
//     }
//   }
// });
// // pageloading
// const pageloading = document.querySelector('.loading');
// const pageloadingprogress = document.querySelector('.loading-progress');
// H.on('NAVIGATE_OUT', () => {
//   pageloading.classList.remove(['opacity-0']);
//   pageloadingprogress.classList.add(['motion-safe:animate-progress']);
// });
// H.on('NAVIGATE_END', () => {
//   pageloading.classList.add(['opacity-0']);
//   pageloadingprogress.classList.remove(['motion-safe:animate-progress']);
// });

// twind
import { install, injectGlobal } from '@twind/core';
import presetAutoprefix from '@twind/preset-autoprefix';
import presetTailwind from '@twind/preset-tailwind';
import presetLineClamp from '@twind/preset-line-clamp';
install({
  presets: [presetAutoprefix(), presetTailwind(), presetLineClamp()],
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
        brand: theme('colors.rose'),
        gray: theme('colors.neutral'),
      }),
      fontFamily: ({ theme }) => ({
        sans: ['Roboto', ...theme('fontFamily.sans')],
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
    [ 'text-wrap-(unset|wrap|nowrap|balance)', 'textWrap' ],
    [ 'bg-grid', { 'background-image': 'url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'4\' height=\'4\' viewBox=\'0 0 4 4\'><g fill=\'rgb(128 128 128 / .05)\'><polygon points=\'4 0 4 4 3 4 3 1 0 1 0 0\' /></g></svg>")', } ],
    [ 'bg-line', { 'background-image': 'url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'4\' height=\'4\' viewBox=\'0 0 4 4\' fill=\'rgb(51 51 51 / .66)\'><rect x=\'0\' y=\'1\' width=\'4\' height=\'1\' /><rect x=\'0\' y=\'3\' width=\'4\' height=\'1\' /></svg>")', } ],
  ],
});
injectGlobal`
  @layer base {
    .box { @apply bg-white/5 rounded-lg ring-(inset 1 white/5) shadow-lg; }
    .box .box-cover { @apply rounded-t-lg; }
    .box .box-cover-img { @apply ring-(inset 1 white/10); }
  }
`

// alpine
import Alpine from 'alpinejs';
import focus from '@alpinejs/focus';
Alpine.plugin(focus);
window.Alpine = Alpine;
Alpine.start();