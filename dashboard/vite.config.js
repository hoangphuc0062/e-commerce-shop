import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "node_modules/bootstrap/scss/functions";`,
      },
    },
  },
  server: {
    // eslint-disable-next-line no-undef
    port: parseInt(process.env.VITE_PORT) || 3000, // Fallback to port 3000 if not defined
  },
})
