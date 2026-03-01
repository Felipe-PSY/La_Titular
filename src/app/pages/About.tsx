import { motion } from 'motion/react';
import { Award, Shield, TrendingUp } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: <Award className="w-12 h-12" />,
      title: 'Autenticidad Garantizada',
      description: 'Todos nuestros perfumes son 100% originales, directamente de las marcas oficiales.',
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: 'Confianza y Calidad',
      description: 'Contamos con certificados de autenticidad y garantía de satisfacción.',
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: 'Experiencia Premium',
      description: 'Más de 5 años brindando las mejores fragancias de lujo.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-20 sm:py-28">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1709095458514-573bc6277d3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleHBlbnNpdmUlMjBwZXJmdW1lJTIwY29sbGVjdGlvbnxlbnwxfHx8fDE3NzIxODA0ODl8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Perfumería La Titular"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            Sobre Nosotros
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-['Montserrat'] text-lg sm:text-xl text-gray-200"
          >
            Tu destino de confianza para fragancias premium y auténticas
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-black mb-6">
              Nuestra Historia
            </h2>
            <p className="font-['Montserrat'] text-lg text-gray-600 leading-relaxed mb-4">
              En <strong>Perfumería La Titular</strong>, nos especializamos en ofrecer las fragancias
              más exclusivas del mercado. Nacimos con la misión de hacer accesibles los perfumes
              de lujo, manteniendo siempre la autenticidad y calidad que nuestros clientes merecen.
            </p>
            <p className="font-['Montserrat'] text-lg text-gray-600 leading-relaxed">
              Cada fragancia en nuestro catálogo es cuidadosamente seleccionada y verificada para
              garantizar su originalidad. Trabajamos directamente con distribuidores autorizados
              y contamos con certificados de autenticidad.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-black mb-4">
              ¿Por qué elegirnos?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow text-center"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-[#D00000] text-white rounded-full mb-6">
                  {feature.icon}
                </div>
                <h3 className="font-['Playfair_Display'] text-xl font-bold text-black mb-4">
                  {feature.title}
                </h3>
                <p className="font-['Montserrat'] text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-black mb-6">
              ¿Listo para descubrir tu fragancia perfecta?
            </h2>
            <p className="font-['Montserrat'] text-lg text-gray-600 mb-8">
              Explora nuestro catálogo exclusivo de perfumes premium
            </p>
            <a
              href="/catalogo"
              className="inline-block bg-[#D00000] text-white px-8 py-4 rounded-full font-['Montserrat'] font-semibold hover:bg-[#A00000] transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Ver Catálogo
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
