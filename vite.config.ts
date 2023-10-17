import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const port: number = parseInt(process.env.PORT || '5173', 10);

export default defineConfig({
  server: {
    port,
  },
  plugins: [react()],
});
