import { createBrowserRouter } from 'react-router';
import RootLayout from './pages/RootLayout';
import Home from './pages/Home';
import CatalogPage from './pages/CatalogPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import PaymentSelection from './pages/PaymentSelection';

// Configuración del enrutador de la aplicación.
// Dicta qué componente o página se muestra según la dirección (URL) a la que entre el usuario.
export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout, // RootLayout envuelve todas las páginas (incluye Header y Footer)
    children: [
      { index: true, Component: Home }, // La página de inicio ("/")
      { path: 'catalogo', Component: CatalogPage }, // Catálogo femenino, masculino o general
      { path: 'nosotros', Component: About },
      { path: 'contacto', Component: Contact },
      { path: 'admin', Component: Admin }, // Panel para crear/gestionar perfumes

      // ':productId' es un parámetro dinámico. 
      // Por ejemplo, /pago/123 cargará la página de Selection referenciando el producto 123
      { path: 'pago/:productId', Component: PaymentSelection },

      // El asterisco atrapa cualquier ruta que no exista y muestra una página de "Error 404 No Encontrado"
      { path: '*', Component: NotFound },
    ],
  },
]);