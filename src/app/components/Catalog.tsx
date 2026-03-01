import { useProducts } from '../context/ProductContext';
import { motion } from 'motion/react';
import { useSearchParams, useNavigate } from 'react-router';
import { useState } from 'react';

const WHATSAPP_NUMBER = '3002099243'; // Cambiar por el número real

export function Catalog() {
  const { products } = useProducts();
  const navigate = useNavigate(); // Herramienta para redirigir a otras páginas programáticamente
  const [searchParams] = useSearchParams(); // Herramienta para leer variables en la URL (los "?nombre=valor")

  // Obtenemos si la URL tiene "?category=men" o "?category=women"
  const categoryParam = searchParams.get('category');

  // Ajustamos el título promocional dependiendo de la categoría seleccionada en la URL
  let catalogTitle = 'Nuestro Catálogo';
  if (categoryParam === 'women') catalogTitle = 'Catálogo Femenino';
  if (categoryParam === 'men') catalogTitle = 'Catálogo Masculino';

  const handleBuyClick = (productId: string) => {
    navigate(`/pago/${productId}`);
  };

  // Helper para convertir los números a formato de dinero Colombiano
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Variable de estado que guarda el criterio de ordenamiento seleccionado por el usuario.
  const [sortOrder, setSortOrder] = useState<'default' | 'asc' | 'desc'>('default');

  // PASO 1: Filtrar la lista total de productos basándonos en la categoría
  const filteredProducts = products.filter(product => {
    // Si no hay parámetro en la URL, los mostramos todos
    if (!categoryParam) return true;
    // Si el producto es "unisex", se muestra siempre. Si no, debe coincidir con la categoría de la URL.
    return product.category === categoryParam || product.category === 'unisex';
  });

  // PASO 2: Ordenar los productos filtrados según el precio
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'asc') return a.price - b.price; // Menor a mayor precio
    if (sortOrder === 'desc') return b.price - a.price; // Mayor a menor precio
    return 0; // Orden "Default" (como fueron agregados)
  });

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4">
            {catalogTitle}
          </h2>
          <p className="font-['Montserrat'] text-lg text-gray-600 max-w-2xl mx-auto">
            Fragancias exclusivas para cada ocasión
          </p>
        </motion.div>

        {/* Filtrado / Ordenamiento */}
        <div className="flex justify-end mb-10">
          <div className="relative">
            <select
              className="appearance-none border-b border-gray-300 px-4 py-2 pr-10 font-['Montserrat'] text-[13px] text-gray-800 bg-transparent focus:outline-none focus:border-[#D00000] cursor-pointer hover:border-gray-500 transition-colors uppercase tracking-widest"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
            >
              <option value="default">Relevancia</option>
              <option value="asc">Precio: Bajo a Alto</option>
              <option value="desc">Precio: Alto a Bajo</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {sortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group flex flex-col"
            >
              <div
                className="relative overflow-hidden aspect-square rounded-sm bg-gray-50 cursor-pointer"
                onClick={() => handleBuyClick(product.id)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-white/90 backdrop-blur-sm hidden md:block">
                  <button className="w-full py-2 text-[10px] font-['Montserrat'] font-bold uppercase tracking-[0.2em] bg-black text-white hover:bg-[#D00000] transition-colors">
                    Ver Detalles
                  </button>
                </div>
              </div>
              <div className="pt-4 pb-2 text-center md:text-left">
                <h3 className="font-['Playfair_Display'] text-[15px] md:text-lg font-medium text-black mb-1 group-hover:text-[#D00000] transition-colors line-clamp-1">
                  {product.name}
                </h3>
                {product.description && (
                  <p className="font-['Montserrat'] text-[11px] text-gray-500 mb-2 uppercase tracking-widest line-clamp-1">
                    {product.description}
                  </p>
                )}
                <div className="flex flex-col items-center md:items-start">
                  <span className="font-['Montserrat'] text-[14px] md:text-[16px] font-bold text-black group-hover:text-red-700 transition-colors">
                    {formatPrice(product.price)}
                  </span>
                  <button
                    onClick={() => handleBuyClick(product.id)}
                    className="mt-3 md:hidden w-full border border-black py-2 text-[9px] font-['Montserrat'] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                  >
                    Detalles
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="font-['Montserrat'] text-gray-500 text-lg">
              No hay productos disponibles en este momento.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}