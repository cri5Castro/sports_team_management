import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        pride: {
          red: '#E40303',
          orange: '#FF8C00',
          yellow: '#FFED00',
          green: '#008026',
          blue: '#24408E',
          purple: '#9D4EDD',
          light: '#5BCEFA', // light blue
          pink: '#FF3366',
          white: '#FFFFFF',
          brown: '#613915',
          black: '#000000'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      }
    }
  }
}
