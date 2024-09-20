import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx', // Isso garante que os arquivos .js que contenham JSX sejam interpretados corretamente
    include: /src\/.*\.js$/, // Inclua arquivos .js dentro da pasta src
    exclude: /node_modules/, // Exclua os node_modules
  },
});
