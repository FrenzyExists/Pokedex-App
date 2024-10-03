import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: '../server/public',
    emptyOutDir: true
  },
  server: {
    proxy: {
      '/pokemons': {
        target: 'http://localhost:3001'
      },
      '/pokemons/:id': {
        target: 'http://localhost:3001'

      }
      
    }
  }

})