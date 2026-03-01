import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../supabaseClient';
import { toast } from 'sonner';

// --- INTERFACES ---
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: 'men' | 'women' | 'unisex';
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, product: Omit<Product, 'id'>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  loading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar productos desde Supabase al iniciar
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Si no hay Supabase inicializado, simplemente devolvemos lista vacía
      if (!supabase) {
        setProducts([]);
        return;
      }

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]); // Fallback
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Omit<Product, 'id'>) => {
    if (!supabase) {
      toast.error('La base de datos no está conectada.');
      return;
    }
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select();

      if (error) throw error;
      if (data) setProducts([...data, ...products]);
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Error al añadir producto. Verifica tu conexión.');
    }
  };

  const updateProduct = async (id: string, product: Omit<Product, 'id'>) => {
    if (!supabase) return;
    try {
      const { error } = await supabase
        .from('products')
        .update(product)
        .eq('id', id);

      if (error) throw error;
      setProducts(products.map((p) => (p.id === id ? { ...product, id } : p)));
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!supabase) return;
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <ProductContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct, loading }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
}
