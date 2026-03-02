import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '3192203782'; // Cambiar por el número real

export default function Contact() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hola, necesito información');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            Contáctanos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-['Montserrat'] text-lg sm:text-xl text-gray-200"
          >
            Estamos aquí para ayudarte a encontrar tu fragancia perfecta
          </motion.p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-['Playfair_Display'] text-3xl font-bold text-black mb-8">
                Información de Contacto
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#D00000] rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-['Montserrat'] font-semibold text-black mb-1">
                      Teléfono
                    </h3>
                    <p className="font-['Montserrat'] text-gray-600">
                      3192203782
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#D00000] rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-['Montserrat'] font-semibold text-black mb-1">
                      Email
                    </h3>
                    <p className="font-['Montserrat'] text-gray-600">
                      Latitularr3@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#D00000] rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-['Montserrat'] font-semibold text-black mb-1">
                      Ubicación
                    </h3>
                    <p className="font-['Montserrat'] text-gray-600">
                      Santa Marta, Magdalena
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#D00000] rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-['Montserrat'] font-semibold text-black mb-1">
                      Horario de Atención
                    </h3>
                    <p className="font-['Montserrat'] text-gray-600">
                      Lunes a Sábado: 9:00 AM - 7:00 PM
                    </p>
                    <p className="font-['Montserrat'] text-gray-600">
                      Domingo: 8:00 AM - 12:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* WhatsApp CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 rounded-2xl p-8 sm:p-12 flex flex-col justify-center"
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6">
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>
                <h2 className="font-['Playfair_Display'] text-3xl font-bold text-black mb-4">
                  Chatea con Nosotros
                </h2>
                <p className="font-['Montserrat'] text-lg text-gray-600 mb-8">
                  ¿Tienes preguntas? Escríbenos por WhatsApp y te responderemos de inmediato
                </p>
                <button
                  onClick={handleWhatsAppClick}
                  className="bg-green-500 text-white px-8 py-4 rounded-full font-['Montserrat'] font-semibold hover:bg-green-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Abrir WhatsApp</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section (placeholder) */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-black mb-6">
              Visítanos
            </h2>
            <p className="font-['Montserrat'] text-lg text-gray-600 mb-8">
              Enviamos a toda Colombia. Contáctanos para coordinar tu pedido.
            </p>
            <div className="bg-gray-200 rounded-2xl h-64 sm:h-96 flex items-center justify-center">
              <MapPin className="w-16 h-16 text-gray-400" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
