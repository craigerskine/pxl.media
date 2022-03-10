// twind
twind.setup({
  mode: "silent",
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '960px',
    },
    extend: {
      colors: {
        gray: twindColors.trueGray,
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
twind.tw(() => ({
  '@global': {
    '.input-search:hover + i': { '@apply': 'opacity-100', },
    '.input-search::-webkit-search-cancel-button': { '@apply': 'hidden', },
    '.box': { 'background-color': 'rgba(255,255,255,.05)', },
    '.page-enter-active,.page-leave-active': { '@apply': 'transition', },
    '.page-enter,.page-leave-to': { '@apply': 'scale-[.98] opacity-0', },
  }
}))
twindObserve.observe(document.documentElement);
document.documentElement.removeAttribute('hidden');