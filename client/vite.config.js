import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import alias from 'vite-plugin-alias';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
        alias({
      entries: [{ find: '@assets', replacement: '/path/to/assets' }],
    }),
  ],
})



