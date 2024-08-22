// instant page
import 'instant.page';

// icons
import 'iconify-icon';

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
    [ 'bg-close', { 'background-image': 'url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' width=\'1em\' height=\'1em\' fill=\'rgb(255 255 255)\'><g opacity=\'.5\'><path d=\'M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z\' /></g></svg>")', }],
  ],
});
injectGlobal`
  @layer base {
    .tippy-box[data-state="hidden"] { @apply opacity-0 translate-y-1; }
    [data-tippy-root] { @apply max-w-[calc(100vw-10px)]; }
    .tippy-box { @apply bg-black text-(gray-400 xs) font-semibold relative outline-0 opacity-100 rounded translate-y-0 motion-safe:(transition duration-75); }
    .tippy-box[data-placement^="top"] > .tippy-arrow { @apply bottom-0 before:(bottom-[-7px] left-0 border-(t-[8px] r-[8px] b-0 l-[8px] t-[initial])) origin-top; }
    .tippy-box[data-placement^="bottom"] > .tippy-arrow { @apply top-0 before:(top-[-7px] left-0 border-(t-0 r-[8px] b-[8px] l-[8px] b-[initial])) origin-bottom; }
    .tippy-box[data-placement^="left"] > .tippy-arrow {@apply right-0 before:(right-[-7px] border-(t-[8px] r-0 b-[8px] l-[8px] l-[initial])) origin-left; }
    .tippy-box[data-placement^="right"] > .tippy-arrow { @apply left-0 before:(left-[-7px] border-(t-[8px] r-[8px] b-[8px] l-0 r-[initial]) origin-right); }
    .tippy-arrow { @apply w-4 h-4 text-black absolute before:(content-[''] absolute border-(transparent solid)); }
    .tippy-content { @apply py-1 px-2 relative z-[1]; }
  }
`

// alpine
import Alpine from 'alpinejs';
import focus from '@alpinejs/focus';
import tippy from 'tippy.js';

document.addEventListener('alpine:init', () => {
  // tooltip
  // magic: @focus="$tooltip('some tooltip')"
  Alpine.magic('tooltip', el => message => {
    let instance = tippy(el, { content: message })
    instance.show()
  });
  // directive: x-tooltip="'some tooltip'"
  Alpine.directive('tooltip', (el, { expression }, { evaluate }) => {
    tippy(el, { content: evaluate(expression) })
  });
});

Alpine.plugin(focus);
window.Alpine = Alpine;
Alpine.start();