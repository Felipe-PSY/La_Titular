import { Link } from 'react-router';
import { Home as HomeIcon } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-['Playfair_Display'] text-9xl font-bold text-[#D00000] mb-4">
          404
        </h1>
        <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-black mb-4">
          Página No Encontrada
        </h2>
        <p className="font-['Montserrat'] text-lg text-gray-600 mb-8">
          Lo sentimos, la página que buscas no existe.
        </p>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-[#D00000] text-white px-8 py-4 rounded-full font-['Montserrat'] font-semibold hover:bg-[#A00000] transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <HomeIcon className="w-5 h-5" />
          <span>Volver al Inicio</span>
        </Link>
      </div>
    </div>
  );
}
