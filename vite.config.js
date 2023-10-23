import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'serve-example-html',

      configureServer (server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/') {
            req.url = '/example.html'
          }
          next()
        })
      }
    }
  ],
  root: 'examples',
  build: {
    rollupOptions: {
      input: {
        main: 'example.html'
      }
    }
  }
})
