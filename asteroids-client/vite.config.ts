import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
// config base url
export default defineConfig({
  plugins: [react()]
})
