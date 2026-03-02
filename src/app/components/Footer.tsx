import { Facebook, Instagram, MapPin, Package, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Información de contacto */}
          <div>
            <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-6">
              Perfumería La Titular
            </h3>
            <p className="font-['Montserrat'] text-gray-300 mb-6">
              Fragancias 100% originales. Elegancia y calidad premium.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/share/1G7gNEtBzL/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#D00000] rounded-full flex items-center justify-center hover:bg-[#A00000] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/perfumerialatitularr_/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#D00000] rounded-full flex items-center justify-center hover:bg-[#A00000] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-['Playfair_Display'] text-xl font-bold mb-6">
              Contacto
            </h4>
            <ul className="space-y-4 font-['Montserrat'] text-gray-300">
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-[#D00000] flex-shrink-0 mt-0.5" />
                <span>3192203782</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-[#D00000] flex-shrink-0 mt-0.5" />
                <span>Latitularr3@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Ubicación */}
          <div>
            <h4 className="font-['Playfair_Display'] text-xl font-bold mb-6">
              Ubicación
            </h4>
            <ul className="space-y-4 font-['Montserrat'] text-gray-300">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#D00000] flex-shrink-0 mt-0.5" />
                <span>Santa Marta, Magdalena</span>
              </li>
            </ul>
          </div>

          {/* Envíos */}
          <div>
            <h4 className="font-['Playfair_Display'] text-xl font-bold mb-6">
              Envíos
            </h4>
            <ul className="space-y-4 font-['Montserrat'] text-gray-300">
              <li className="flex items-start space-x-3">
                <Package className="w-5 h-5 text-[#D00000] flex-shrink-0 mt-0.5" />
                <span>Envíos gratuitos a toda Colombia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="font-['Montserrat'] text-gray-400 text-sm">
            © 2026 Perfumería La Titular. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
