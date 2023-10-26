import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import dotenv from "dotenv";
// https://vitejs.dev/config/

let config;
dotenv.config({path: ".env"});

//npm install -g win-node-env для NODE_ENV на windows
if (process.env.NODE_ENV === 'development') {
  config = {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api/, "")
        }
      },
      port: 8080,
      host: true,
    }
  };
} else {
  config = {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api/, "")
        }
      },
      port: 8080,
      host: true,
      https: {
        key: fs.readFileSync(process.env.KEY),
        cert: fs.readFileSync(process.env.CERT),
        ca: [
          fs.readFileSync(process.env.MDL),
          fs.readFileSync(process.env.REQ),
          fs.readFileSync(process.env.ROOT)
        ]
      }
    }
  };
}

export default defineConfig(config);

