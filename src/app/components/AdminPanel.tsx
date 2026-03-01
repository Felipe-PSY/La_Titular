import { useState } from 'react';
import { useProducts, Product } from '../context/ProductContext';
import { Pencil, Trash2, Plus, X, LogOut, Upload, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface AdminPanelProps {
  onLogout?: () => void;
}

export function AdminPanel({ onLogout }: AdminPanelProps = {}) {
  // Estas son las herramientas que nos da el ProductContext para leer y modificar la base de datos
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();

  // Variables de Estado que controlan cómo se ve la interfaz en este momento:
  const [isModalOpen, setIsModalOpen] = useState(false); // ¿Está el menú de crear/editar abierto?
  const [editingProduct, setEditingProduct] = useState<Product | null>(null); // ¿Qué producto estamos editando? (null si es uno nuevo)

  // Guardamos temporalmente lo que el usuario escribe en el formulario del Modal
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    category: 'unisex' as 'men' | 'women' | 'unisex',
  });

  // Se ejecuta cuando el administrador presiona "Editar" (le llega el producto entero) 
  // o "Agregar" (no le llega nada).
  const handleOpenModal = (product?: Product) => {
    if (product) {
      // Si estamos editando, llenamos los campos del formulario con los datos actuales del producto
      setEditingProduct(product);
      setFormData({
        name: product.name,
        price: product.price.toString(),
        image: product.image,
        description: product.description || '',
        category: product.category || 'unisex',
      });
    } else {
      setEditingProduct(null);
      setFormData({ name: '', price: '', image: '', description: '', category: 'unisex' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData({ name: '', price: '', image: '', description: '', category: 'unisex' });
  };

  // Función para procesar el archivo de imagen y convertirlo a Base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar que sea una imagen
      if (!file.type.startsWith('image/')) {
        toast.error('Por favor selecciona un archivo de imagen válido');
        return;
      }
      // Validar tamaño (máximo 2MB para no sobrecargar localStorage)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('La imagen es muy pesada. Máximo 2MB.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Se ejecuta al hacer clic en "Guardar" o "Actualizar" dentro del Modal
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evita que la página intente recargarse al enviar el formulario

    if (!formData.name || !formData.price || !formData.image) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    const productData = {
      name: formData.name,
      price: parseFloat(formData.price),
      image: formData.image,
      description: formData.description,
      category: formData.category,
    };

    if (editingProduct) {
      // Si "editingProduct" no es nulo, significa que este producto ya existía, lo actualizamos.
      updateProduct(editingProduct.id, productData);
      toast.success('Producto actualizado correctamente');
    } else {
      // Si era nulo, significa que abrimos la ventana mediante "Agregar Producto".
      addProduct(productData);
      toast.success('Producto agregado correctamente');
    }

    handleCloseModal();
  };

  // Confirmación antes de borrar definitivamente
  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`¿Estás seguro de eliminar ${name}?`)) {
      deleteProduct(id);
      toast.success('Producto eliminado correctamente');
    }
  };

  // Helper para convertir "450000" a formato visual "$ 450.000"
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
            <h1 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-black">
              Panel Administrador
            </h1>
            <div className="flex items-center space-x-3 sm:space-x-4">
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="bg-gray-200 text-black px-4 sm:px-6 py-3 rounded-full font-['Montserrat'] font-semibold hover:bg-gray-300 transition-all shadow-sm hover:shadow-md flex items-center space-x-2"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden sm:inline">Cerrar Sesión</span>
                </button>
              )}
              <button
                onClick={() => handleOpenModal()}
                className="bg-[#D00000] text-white px-4 sm:px-6 py-3 rounded-full font-['Montserrat'] font-semibold hover:bg-[#A00000] transition-all shadow-md hover:shadow-lg flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Agregar Producto</span>
              </button>
            </div>
          </div>

          {/* Grilla principal donde se listan los productos en el admin */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-['Playfair_Display'] text-lg font-bold text-black mb-1">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="font-['Montserrat'] text-sm text-gray-600 mb-2">
                      {product.description}
                    </p>
                  )}
                  <p className="font-['Montserrat'] text-xl font-bold text-[#D00000] mb-4">
                    {formatPrice(product.price)}
                  </p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleOpenModal(product)}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-['Montserrat'] font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Pencil className="w-4 h-4" />
                      <span>Editar</span>
                    </button>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      className="flex-1 bg-red-600 text-white py-2 rounded-lg font-['Montserrat'] font-medium hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Eliminar</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-12">
              <p className="font-['Montserrat'] text-gray-500 text-lg">
                No hay productos. Agrega tu primer producto.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal (Ventana Emergente): Solo existe si "isModalOpen" es true */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                <h2 className="font-['Playfair_Display'] text-2xl font-bold text-black">
                  {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block font-['Montserrat'] font-medium text-black mb-2">
                    Nombre del Producto *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['Montserrat'] focus:ring-2 focus:ring-[#D00000] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block font-['Montserrat'] font-medium text-black mb-2">
                    Precio (COP) *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['Montserrat'] focus:ring-2 focus:ring-[#D00000] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block font-['Montserrat'] font-medium text-black mb-2">
                    Imagen del Producto *
                  </label>
                  <div className="space-y-4">
                    {/* Vista previa de la imagen */}
                    {formData.image ? (
                      <div className="relative aspect-square w-full rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, image: '' })}
                          className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors group">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-10 h-10 text-gray-400 group-hover:text-[#D00000] transition-colors mb-3" />
                          <p className="font-['Montserrat'] text-sm text-gray-500 group-hover:text-gray-700 px-4 text-center">
                            Haz clic para subir una imagen
                          </p>
                          <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest">
                            PNG, JPG, WEBP (MÁX. 2MB)
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </label>
                    )}

                    {/* Input de URL como respaldo (opcional) */}
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <ImageIcon className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="url"
                        value={formData.image}
                        onChange={(e) =>
                          setFormData({ ...formData, image: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg font-['Montserrat'] text-[12px] focus:ring-2 focus:ring-[#D00000] focus:border-transparent transition-all outline-none"
                        placeholder="O pega una URL de imagen aquí..."
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-['Montserrat'] font-medium text-black mb-2">
                    Descripción
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['Montserrat'] focus:ring-2 focus:ring-[#D00000] focus:border-transparent resize-none"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block font-['Montserrat'] font-medium text-black mb-2">
                    Categoría
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as 'men' | 'women' | 'unisex' })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['Montserrat'] focus:ring-2 focus:ring-[#D00000] focus:border-transparent bg-white"
                  >
                    <option value="women">Femenino</option>
                    <option value="men">Masculino</option>
                    <option value="unisex">Unisex</option>
                  </select>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 bg-gray-200 text-black px-6 py-3 rounded-full font-['Montserrat'] font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#D00000] text-white px-6 py-3 rounded-full font-['Montserrat'] font-semibold hover:bg-[#A00000] transition-colors"
                  >
                    {editingProduct ? 'Actualizar' : 'Agregar'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
