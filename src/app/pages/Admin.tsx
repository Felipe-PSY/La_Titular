import { useState, useEffect } from 'react';
import { AdminPanel } from '../components/AdminPanel';
import { motion } from 'motion/react';
import { Lock } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { toast } from 'sonner';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState(''); // Cambiado de username a email para Supabase Auth
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Verificar si ya hay una sesión activa al cargar la página
    const checkSession = async () => {
      if (!supabase) return;
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setIsAuthenticated(true);
        }
      } catch (e) {
        console.error('Error al obtener sesión:', e);
      }
    };
    checkSession();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      toast.error('La base de datos no está configurada aún.');
      return;
    }
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session) {
        setIsAuthenticated(true);
        toast.success('Sesión iniciada correctamente');
      }
    } catch (error: any) {
      toast.error(error.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  if (isAuthenticated) {
    return <AdminPanel onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#D00000]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative z-10 border border-gray-100"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
            <Lock className="w-8 h-8 text-[#D00000]" />
          </div>
        </div>

        <h1 className="font-['Playfair_Display'] text-3xl font-bold text-center text-black mb-2">
          Acceso Administrador
        </h1>
        <p className="font-['Montserrat'] text-gray-500 text-center text-sm mb-8">
          Ingresa con tu cuenta de Supabase para gestionar la tienda
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block font-['Montserrat'] text-sm font-medium text-gray-700 mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg font-['Montserrat'] focus:ring-2 focus:ring-[#D00000] focus:border-transparent transition-all outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-['Montserrat'] text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg font-['Montserrat'] focus:ring-2 focus:ring-[#D00000] focus:border-transparent transition-all outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-black text-white py-3.5 rounded-lg font-['Montserrat'] font-semibold tracking-wide transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200 flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#D00000]'}`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              'INGRESAR'
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
