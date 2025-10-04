import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
  allowedHosts: ['0495-2409-40c1-319d-3141-1da6-c333-5c1d-63c1.ngrok-free.app']
}
})
