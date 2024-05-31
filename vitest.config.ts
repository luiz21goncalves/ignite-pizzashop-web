import { defineConfig, mergeConfig } from 'vitest/config'

import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: false,
      setupFiles: ['./test/setup.ts'],
      environment: 'happy-dom',
    },
  }),
)
