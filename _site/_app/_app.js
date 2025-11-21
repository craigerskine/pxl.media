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
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A1A1A1',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0A0A0A',
        },
      }),
      fontSize: {
        80: ['80%', { lineHeight: 1 }],
      },
      fontFamily: ({ theme }) => ({
        sans: ['Roboto', ...theme('fontFamily.sans')],
      }),
    },
  },
  rules: [
    ['text-wrap-(unset|wrap|nowrap|balance)', 'textWrap'],
    ['bg-gradient-radial', 'bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))]'],
    ['bg-gradient-conic', 'bg-[conic-gradient(from_180deg,var(--tw-gradient-stops))]'],
    ['bg-close', { 'background-image': 'url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' width=\'1em\' height=\'1em\' fill=\'rgba(128,128,128,1)\'><g><path d=\'M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z\' /></g></svg>")', }],
    ['container-', ({ $$ }) => `mx-auto w-full max-w-${$$}`],
  ],
});
injectGlobal`
  @layer base {
    :focus-visible { @apply outline-(& 2 current offset-1); }
    .tippy-box[data-state="hidden"] { @apply opacity-0 scale-90; }
    [data-tippy-root] { @apply max-w-[calc(100vw-10px)]; }
    .tippy-box { @apply bg-gray-950 text-(gray-400 xs) font-semibold relative outline-(& 1 gray-950/75 offset-2) opacity-100 rounded scale-100 motion-safe:(transition); }
    .tippy-box[data-placement^="top"] > .tippy-arrow { @apply bottom-0 before:(bottom-[-7px] left-0 border-(t-[8px] r-[8px] b-0 l-[8px] t-[initial])) origin-top; }
    .tippy-box[data-placement^="bottom"] > .tippy-arrow { @apply top-0 before:(top-[-7px] left-0 border-(t-0 r-[8px] b-[8px] l-[8px] b-[initial])) origin-bottom; }
    .tippy-box[data-placement^="left"] > .tippy-arrow {@apply right-0 before:(right-[-7px] border-(t-[8px] r-0 b-[8px] l-[8px] l-[initial])) origin-left; }
    .tippy-box[data-placement^="right"] > .tippy-arrow { @apply left-0 before:(left-[-7px] border-(t-[8px] r-[8px] b-[8px] l-0 r-[initial]) origin-right); }
    .tippy-arrow { @apply w-4 h-4 text-gray-950 absolute before:(content-[''] absolute border-(transparent solid)); }
    .tippy-content { @apply py-1 px-2 relative z-[1]; }
  }
`

// alpine
import Alpine from 'alpinejs';
import focus from '@alpinejs/focus';
import tippy from 'tippy.js';

document.addEventListener('alpine:init', () => {
  Alpine.data('app', () => ({
    query: new URLSearchParams(location.search).get('q'),
    slugify(text) {
      return text?.toString()
        .toLowerCase()
        .normalize('NFKD')
        .trim()
        .toLowerCase()
        .replace(/[^\w\-]+/g, '-')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
    },
    csv(text) {
      return text?.toString().replace(',', ', ')
    },
  }));


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
