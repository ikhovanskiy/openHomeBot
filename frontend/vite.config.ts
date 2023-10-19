import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      "/api":{
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: true,
        rewrite: (path)=>path.replace(/^\/api/,"")
      }
    },
    port: 8080,
    host:true
  }
})

