import { useParams, useNavigate } from 'react-router';
import { useProducts } from '../context/ProductContext';
import { motion } from 'motion/react';
import { CreditCard, Banknote, Smartphone, Building2, ArrowLeft } from 'lucide-react';

const WHATSAPP_NUMBER = '3192203782'; // Cambiar por el número real

interface PaymentMethod {
  name: string;
  icon: React.ReactNode;
  color: string;
  hoverColor: string;
}

const paymentMethods: (PaymentMethod & { iconColor: string })[] = [
  {
    name: 'ADDI',
    icon: <CreditCard className="w-8 h-8 md:w-10 md:h-10" />,
    color: 'bg-white',
    hoverColor: 'hover:border-black',
    iconColor: 'text-purple-600',
  },
  {
    name: 'EFECTIVO',
    icon: <Banknote className="w-8 h-8 md:w-10 md:h-10" />,
    color: 'bg-white',
    hoverColor: 'hover:border-black',
    iconColor: 'text-green-600',
  },
  {
    name: 'NEQUI',
    icon: <Smartphone className="w-8 h-8 md:w-10 md:h-10" />,
    color: 'bg-white',
    hoverColor: 'hover:border-black',
    iconColor: 'text-pink-600',
  },
  {
    name: 'BANCOLOMBIA',
    icon: <Building2 className="w-8 h-8 md:w-10 md:h-10" />,
    color: 'bg-white',
    hoverColor: 'hover:border-black',
    iconColor: 'text-yellow-600',
  },
];

export default function PaymentSelection() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-['Playfair_Display'] text-3xl font-bold text-black mb-4">
            Producto no encontrado
          </h2>
          <button
            onClick={() => navigate('/catalogo')}
            className="bg-[#D00000] text-white px-6 py-3 rounded-full font-['Montserrat'] font-semibold hover:bg-[#A00000] transition-all"
          >
            Volver al catálogo
          </button>
        </div>
      </div>
    );
  }

  const handlePaymentClick = (method: string) => {
    const message = encodeURIComponent(
      `QUIERO COMPRAR ${product.name.toUpperCase()} POR ${method}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Botón volver */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-[#D00000] transition-colors mb-8 font-['Montserrat'] group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold">Volver</span>
        </motion.button>

        {/* Información del producto - Estilo Luxury Invoice */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-12"
        >
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-[4/5] md:aspect-auto h-full overflow-hidden bg-gray-50 border-r border-gray-50">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover mix-blend-multiply"
              />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
              <span className="font-['Montserrat'] text-[10px] md:text-[12px] text-gray-400 uppercase tracking-[0.3em] mb-4">Resumen de Pedido</span>
              <h1 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-medium text-black mb-4">
                {product.name}
              </h1>
              {product.description && (
                <p className="font-['Montserrat'] text-[13px] md:text-sm text-gray-500 mb-8 leading-relaxed uppercase tracking-widest">
                  {product.description}
                </p>
              )}
              <div className="border-t border-gray-100 pt-6">
                <div className="flex justify-between items-end">
                  <span className="font-['Montserrat'] text-[11px] text-gray-400 uppercase tracking-widest">Total Estimado</span>
                  <div className="font-['Montserrat'] text-3xl font-bold text-black">
                    {formatPrice(product.price)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Medios de pago */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center mb-12">
            <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl font-medium text-black mb-3">
              Método de Pago
            </h2>
            <p className="font-['Montserrat'] text-[11px] text-gray-400 uppercase tracking-[0.2em]">Seleccione una opción para finalizar vía WhatsApp</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {paymentMethods.map((method, index) => (
              <motion.button
                key={method.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePaymentClick(method.name)}
                className={`bg-white border border-gray-100 p-6 md:p-10 rounded-sm shadow-sm hover:shadow-md hover:border-gray-900 transition-all duration-300 flex flex-col items-center justify-center space-y-4 group`}
              >
                <div className={`${method.iconColor} transition-colors opacity-80 group-hover:opacity-100`}>
                  {method.icon}
                </div>
                <span className="font-['Montserrat'] font-bold text-[13px] md:text-[15px] text-black tracking-widest uppercase">
                  {method.name}
                </span>
              </motion.button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-16 text-center border-t border-gray-50 pt-10"
          >
            <div className="flex justify-center items-center gap-3 mb-4 opacity-40">
              <Building2 className="w-5 h-5 text-black" />
              <CreditCard className="w-5 h-5 text-black" />
              <Banknote className="w-5 h-5 text-black" />
            </div>
            <p className="font-['Montserrat'] text-[10px] md:text-[11px] text-gray-400 uppercase tracking-[0.2em] max-w-lg mx-auto leading-relaxed">
              Su solicitud será procesada de forma segura a través de nuestra línea directa de atención al cliente.
              Al continuar, será redirigido a WhatsApp para finalizar su orden.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}