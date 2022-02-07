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
        red: twindColors.red,
        blue: twindColors.lightBlue,
        purple: twindColors.purple,
        yellow: twindColors.amber,
        green: twindColors.green,
      },
      spacing: {
        '5px': '5px',
        '10px': '10px',
        '15px': '15px',
        '20px': '20px',
        '50px': '50px',
        '75px': '75px',
        '90px': '90px',
        '100px': '100px',
        '120px': '120px',
      },
      borderWidth: {
        '5': '5px',
      },
      fontFamily: (theme) => ({ sans: 'Roboto,'+ theme('fontFamily.sans') }),
      cursor: {
        help: 'help',
      },
    },
  },
  plugins: {
    'bg-grid': { 'background-image': 'url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 4 4\' width=\'4\' height=\'4\'><rect x=\'0\' y=\'0\' width=\'2\' height=\'2\' fill=\'rgba(5,5,5,.33)\'></rect></svg>")', },
    'bg-cross': { 'background-image': 'url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 4 4\' width=\'4\' height=\'4\'><g fill=\'rgba(5,5,5,.33)\' fill-rule=\'evenodd\'><path d=\'m0 0h1v1h-1z\'/><path d=\'m1 1h1v1h-1z\'/><path d=\'m2 2h1v1h-1z\'/><path d=\'m3 3h1v1h-1z\'/><path d=\'m3 1h1v1h-1z\'/><path d=\'m1 3h1v1h-1z\'/></g></svg>")', },
  },
})
twind.tw(() => ({
  '@global': {
    '.input-search:hover + svg': { '@apply': 'opacity-100', },
    '.box': { 'background-color': 'rgba(255,255,255,.05)', 'box-shadow': 'inset 0 1px 0 0 rgba(255,255,255,.075)', },
  }
}))
twindObserve.observe(document.documentElement);
document.documentElement.removeAttribute('hidden');