import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@api': path.resolve(__dirname, './src/api'),
      '@images': path.resolve(__dirname, './src/assets/images'),
      '@svg': path.resolve(__dirname, './src/assets/svg'),
    }
  }
})
