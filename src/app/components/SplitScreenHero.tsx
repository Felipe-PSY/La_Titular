import { motion } from 'motion/react';
import { Link } from 'react-router';

export function SplitScreenHero() {
    return (
        <div className="relative w-full min-h-screen flex flex-col md:flex-row">
            {/* Centered Minimalist Navigation Menu */}
            <nav className="absolute top-0 left-0 right-0 z-50 py-6 px-4 pointer-events-auto">
                <div className="relative items-center justify-between w-full max-w-3xl mx-auto hidden md:flex">
                    {/* Left Links */}
                    <div className="flex space-x-12 flex-1 justify-end pr-12">
                        <Link to="/" className="text-white hover:text-[#D4AF37] text-sm font-['Montserrat'] uppercase tracking-[0.2em] transition-colors whitespace-nowrap">Inicio</Link>
                        <Link to="/catalogo?category=women" className="text-white hover:text-[#D4AF37] text-sm font-['Montserrat'] uppercase tracking-[0.2em] transition-colors whitespace-nowrap">Femenino</Link>
                    </div>

                    {/* Center Logo */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 flex justify-center items-center">
                        <Link to="/" className="text-[#D4AF37] font-['Playfair_Display'] text-3xl md:text-4xl font-semibold tracking-wider hover:opacity-80 transition-opacity">
                            RM
                        </Link>
                    </div>

                    {/* Right Links */}
                    <div className="flex space-x-12 flex-1 justify-start pl-12">
                        <Link to="/catalogo?category=men" className="text-white hover:text-[#D4AF37] text-sm font-['Montserrat'] uppercase tracking-[0.2em] transition-colors whitespace-nowrap">Masculino</Link>
                        <Link to="/contacto" className="text-white hover:text-[#D4AF37] text-sm font-['Montserrat'] uppercase tracking-[0.2em] transition-colors whitespace-nowrap">Contacto</Link>
                    </div>
                </div>

                {/* Mobile version (fallback) */}
                <div className="flex md:hidden flex-col items-center space-y-4">
                    <Link to="/" className="text-[#D4AF37] font-['Playfair_Display'] text-3xl font-semibold tracking-wider">
                        RM
                    </Link>
                    <div className="flex space-x-4">
                        <Link to="/catalogo?category=women" className="text-white text-xs font-['Montserrat'] uppercase tracking-[0.1em]">Femenino</Link>
                        <Link to="/catalogo?category=men" className="text-white text-xs font-['Montserrat'] uppercase tracking-[0.1em]">Masculino</Link>
                    </div>
                </div>
            </nav>

            {/* Left Side - Women's Collection */}
            <div className="relative w-full md:w-1/2 h-[50vh] md:h-screen group overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: 'url("/womens-collection.png")' }}
                >
                    {/* subtle overlay to ensure text readability */}
                    <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-[#4a0a0a]/80 via-transparent to-black/30 md:bg-gradient-to-r md:from-black/60 md:to-transparent" />
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2 className="text-[#D4AF37] font-['Playfair_Display'] text-sm tracking-[0.3em] uppercase mb-4">
                            Colección Femenina
                        </h2>
                        <h1 className="text-white font-['Playfair_Display'] text-4xl md:text-6xl font-normal tracking-wide mb-8">
                            FEMENINO
                        </h1>
                        <Link
                            to="/catalogo?category=women"
                            className="inline-block border border-[#D4AF37] text-white px-10 py-3 uppercase tracking-widest text-xs font-['Montserrat'] hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
                        >
                            Catálogo
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Men's Collection */}
            <div className="relative w-full md:w-1/2 h-[50vh] md:h-screen group overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: 'url("/mens-collection.png")' }}
                >
                    {/* subtle overlay to ensure text readability */}
                    <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/90 via-black/40 to-black/30 md:bg-gradient-to-l md:from-black/80 md:to-black/30" />
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <h2 className="text-white font-['Playfair_Display'] text-sm tracking-[0.3em] uppercase mb-4 text-gray-300">
                            Colección Masculina
                        </h2>
                        <h1 className="text-white font-['Playfair_Display'] text-4xl md:text-6xl font-normal tracking-wide mb-8">
                            MASCULINO
                        </h1>
                        <Link
                            to="/catalogo?category=men"
                            className="inline-block border border-white text-white px-10 py-3 uppercase tracking-widest text-xs font-['Montserrat'] hover:bg-white hover:text-black transition-all duration-300"
                        >
                            Catálogo
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Center Divider styling removed since logo is in the nav now */}
        </div>
    );
}
