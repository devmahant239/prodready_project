import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const backendUrl = env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:5000';

  return {
    plugins: [react()],
    server: {
      proxy: {
        // In dev, proxy /api calls to the backend server
        '/api': {
          target: backendUrl,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
