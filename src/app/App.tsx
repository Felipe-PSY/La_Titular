import { RouterProvider } from 'react-router';
import { router } from './routes';
import { ProductProvider } from './context/ProductContext';
import { Toaster } from './components/ui/sonner';
import { Preloader } from './components/Preloader';
import { useState } from 'react';

// Componente principal (raíz) de la aplicación.
// Aquí se configuran los proveedores globales (como ProductProvider para el estado de los productos)
// y el sistema de rutas (RouterProvider).
function App() {
  // Comprobamos si la URL actual empieza por '/admin' para no mostrar el video de carga (Preloader)
  // a los administradores, brindando un acceso más rápido.
  const isServerAdminContext = window.location.pathname.startsWith('/admin');
  const [showPreloader, setShowPreloader] = useState(!isServerAdminContext);

  return (
    // ProductProvider envuelve la app para que cualquier componente pueda acceder a los productos
    <ProductProvider>
      {/* Si showPreloader es true, mostramos el video de introducción inicial */}
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}

      {/* Administra la navegación entre páginas (Home, Catálogo, Admin, etc.) */}
      <RouterProvider router={router} />

      {/* Componente para mostrar notificaciones emergentes (ej. "Producto agregado correctamente") */}
      <Toaster position="top-center" richColors />
    </ProductProvider>
  );
}

export default App;
