import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    react()
  ],
  eslintPlugin: {
    // Optional: include your ESLint options here
  },
  resolve: {
    alias: {
      '@mui/styled-engine': '@mui/styled-engine-sc',
    },
  },
})
