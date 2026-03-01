import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// --- INTERFACES: Definen la forma de los datos clave de la aplicación ---
export interface Product {
  id: string; // Identificador único creado con Date.now() al añadir un producto nuevo
  name: string;
  price: number;
  image: string; // URL pública de la imagen
  description?: string; // Opcional
  category?: 'men' | 'women' | 'unisex'; // Importante: determina dónde aparece el perfume
}

// Interfaz para el "Contexto" (la bolsa invisible de datos que comparten los componentes)
interface ProductContextType {
  products: Product[]; // Lista completa de todos los productos actuales
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Omit<Product, 'id'>) => void;
  deleteProduct: (id: string) => void;
}

// Creamos la "Bolsa" vacía. Los componentes le pedirán los datos a esta variable usando useProducts()
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Datos iniciales que se cargarán la primera vez que un visitante abra la página,
// antes de que se guarden en el almacenamiento local de su navegador.
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Chanel No. 5',
    price: 450000,
    image: 'https://images.unsplash.com/photo-1770301410072-f6ef6dad65b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZXJmdW1lJTIwYm90dGxlJTIwZWxlZ2FudHxlbnwxfHx8fDE3NzIxNjg3MDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Fragancia icónica y atemporal',
    category: 'women',
  },
  {
    id: '2',
    name: 'Dior Sauvage',
    price: 380000,
    image: 'https://images.unsplash.com/photo-1708486235073-14879ff14c4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwZnJhZ3JhbmNlJTIwYm90dGxlJTIwbWluaW1hbGlzdHxlbnwxfHx8fDE3NzIyMTU5NTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Masculino y sofisticado',
    category: 'men',
  },
  {
    id: '3',
    name: 'Versace Eros',
    price: 320000,
    image: 'https://images.unsplash.com/photo-1709095458514-573bc6277d3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleHBlbnNpdmUlMjBwZXJmdW1lJTIwY29sbGVjdGlvbnxlbnwxfHx8fDE3NzIxODA0ODl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Seductor y vibrante',
    category: 'men',
  },
  {
    id: '4',
    name: 'Paco Rabanne',
    price: 290000,
    image: 'https://images.unsplash.com/photo-1759793500315-e64644e6954c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwY29sb2duZSUyMGJvdHRsZSUyMHN0dWRpb3xlbnwxfHx8fDE3NzIyMTU5NTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Elegante y moderno',
    category: 'men',
  },
  {
    id: '5',
    name: 'Giorgio Armani',
    price: 410000,
    image: 'https://images.unsplash.com/photo-1590156220728-bea5ba090f82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjb3NtZXRpYyUyMHBlcmZ1bWV8ZW58MXx8fHwxNzcyMjE1OTU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Sofisticación italiana',
    category: 'women',
  },
  {
    id: '6',
    name: 'Tom Ford',
    price: 520000,
    image: 'https://images.unsplash.com/photo-1770301410072-f6ef6dad65b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZXJmdW1lJTIwYm90dGxlJTIwZWxlZ2FudHxlbnwxfHx8fDE3NzIxNjg3MDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Lujo incomparable',
    category: 'unisex',
  },
];

// Componente Proveedor: Debe envolver a la aplicación (en App.tsx). 
// Es el motor real que almacena y actualiza la lista de perfumes.
export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);

  // useEffect se ejecuta 1 sola vez cuando la página carga
  useEffect(() => {
    // 1. Buscamos si ya hay productos guardados de una visita anterior
    const stored = localStorage.getItem('perfumeria-products');
    if (stored) {
      // 2. Si sí, convertimos de texto a objetos y actualizamos
      setProducts(JSON.parse(stored));
    } else {
      // 3. Si no, usamos nuestros initialProducts y los guardamos
      setProducts(initialProducts);
      localStorage.setItem('perfumeria-products', JSON.stringify(initialProducts));
    }
  }, []);

  // Función para agregar un nuevo perfume (Llamada desde el Panel de Admin)
  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(), // Creamos un ID único usando la fecha actual
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts); // Actualiza la pantalla
    localStorage.setItem('perfumeria-products', JSON.stringify(updatedProducts)); // Guarda en la computadora
  };

  // Función para editar todos los campos de un perfume existente
  const updateProduct = (id: string, product: Omit<Product, 'id'>) => {
    const updatedProducts = products.map((p) =>
      p.id === id ? { ...product, id } : p
    );
    setProducts(updatedProducts);
    localStorage.setItem('perfumeria-products', JSON.stringify(updatedProducts));
  };

  // Función para borrar del inventario
  const deleteProduct = (id: string) => {
    const updatedProducts = products.filter((p) => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('perfumeria-products', JSON.stringify(updatedProducts));
  };

  // Entregamos el estado y las funciones a cualquier componente que lo pida
  return (
    <ProductContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct }}
    >
      {/* children representa a todos los componentes que envuelve este Proveedor (ej. todo el Router) */}
      {children}
    </ProductContext.Provider>
  );
}

// "Hook" personalizado: Forma fácil para que un componente consuma los datos
// Ejemplo de uso: `const { products } = useProducts();`
export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
}
