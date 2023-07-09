// we are using defineConfig,
// to have type support alternatievly we could have used
// /** @type {import('vite').UserConfig} */
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
