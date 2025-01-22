import { defineConfig } from 'vitest/config';  // ✅ Correct import for Vitest
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./__tests__/setupTests.ts'],
  },
});
