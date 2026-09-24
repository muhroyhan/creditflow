import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

/** @type {import('vite').UserConfig} */
export default defineConfig(({ mode }) => {
  const envDir = '../..'
  const env = loadEnv(mode, envDir, '')
  console.log(env.VITE_WEB_PORT)
  return {
    envDir,
    plugins: [
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
        enableRouteGeneration: false,
      }),
      react(),
      tailwindcss(),
    ],
    resolve: {
      tsconfigPaths: true,
    },
    server: {
      port: parseInt(env.VITE_WEB_PORT) || 3001,
    },
  }
})
