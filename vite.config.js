import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwdindcss from '@tailwindcss/vite'

// i dont know what to do any more
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwdindcss()],
  base: '/portfolio-react/'
})
