import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // El plugin de React y el de Tailwind son obligatorios para Make,
    // incluso si Tailwind no se está usando activamente – no eliminarlos
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      // Crea un alias para que "@" apunte a la carpeta src
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    open: true, // Abre el navegador automáticamente al iniciar el servidor
  },

  // Tipos de archivos permitidos para importaciones directas (raw imports).
  // Nunca agregar aquí archivos .css, .tsx o .ts
  assetsInclude: ['**/*.svg', '**/*.csv'],
})