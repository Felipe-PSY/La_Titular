import { Link } from 'react-router';
import { motion } from 'motion/react';

export function Hero() {
  return (
    <section className="relative bg-black text-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1770301410072-f6ef6dad65b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZXJmdW1lJTIwYm90dGxlJTIwZWxlZ2FudHxlbnwxfHx8fDE3NzIxNjg3MDh8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Perfumes de lujo"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Perfumes 100% Originales
          </h1>
          <p className="font-['Montserrat'] text-lg sm:text-xl mb-8 text-gray-200">
            Descubre nuestra exclusiva colección de fragancias premium.
            Autenticidad garantizada, elegancia incomparable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/catalogo"
              className="bg-[#D00000] text-white px-8 py-4 rounded-full font-['Montserrat'] font-semibold text-center hover:bg-[#A00000] transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Ver Catálogo
            </Link>
            <a
              href="https://wa.me/3002099243?text=Hola,%20quiero%20mas%20informacion"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-8 py-4 rounded-full font-['Montserrat'] font-semibold text-center hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Contactar Ahora
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
