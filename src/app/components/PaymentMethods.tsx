import { CreditCard, Banknote, Smartphone, Building2 } from 'lucide-react';
import { motion } from 'motion/react';

const WHATSAPP_NUMBER = '3002099243'; // Cambiar por el número real

interface PaymentMethod {
  name: string;
  icon: React.ReactNode;
  iconColor: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    name: 'ADDI',
    icon: <CreditCard className="w-8 h-8 md:w-10 md:h-10" />,
    iconColor: 'text-purple-600',
  },
  {
    name: 'EFECTIVO',
    icon: <Banknote className="w-8 h-8 md:w-10 md:h-10" />,
    iconColor: 'text-green-600',
  },
  {
    name: 'NEQUI',
    icon: <Smartphone className="w-8 h-8 md:w-10 md:h-10" />,
    iconColor: 'text-pink-600',
  },
  {
    name: 'BANCOLOMBIA',
    icon: <Building2 className="w-8 h-8 md:w-10 md:h-10" />,
    iconColor: 'text-yellow-600',
  },
];

export function PaymentMethods() {
  const handlePaymentClick = (method: string) => {
    const message = encodeURIComponent(`QUIERO COMPRAR POR ${method}`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4">
            Medios de Pago
          </h2>
          <p className="font-['Montserrat'] text-lg text-gray-600 max-w-2xl mx-auto">
            Elige tu método de pago preferido y compra de forma segura
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {paymentMethods.map((method, index) => (
            <motion.button
              key={method.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handlePaymentClick(method.name)}
              className="bg-white border border-gray-100 p-6 md:p-10 rounded-sm shadow-sm hover:shadow-md hover:border-gray-900 transition-all duration-300 flex flex-col items-center justify-center space-y-4 group min-h-[140px] md:min-h-[180px]"
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
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="font-['Montserrat'] text-sm text-gray-500">
            Al hacer clic en cualquier método, serás redirigido a WhatsApp para completar tu compra
          </p>
        </motion.div>
      </div>
    </section>
  );
}
