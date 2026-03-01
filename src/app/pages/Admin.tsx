import { useState, useEffect } from 'react';
import { AdminPanel } from '../components/AdminPanel';
import { motion } from 'motion/react';
import { Lock } from 'lucide-react';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const authStatus = sessionStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'adminRM') {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      setError('');
    } else {
      setError('Credenciales incorrectas');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    sessionStorage.removeItem('adminAuth');
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
          Acceso Restringido
        </h1>
        <p className="font-['Montserrat'] text-gray-500 text-center text-sm mb-8">
          Por favor ingresa tus credenciales de administrador
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block font-['Montserrat'] text-sm font-medium text-gray-700 mb-2">
              Usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="text-[#D00000] text-sm text-center font-['Montserrat'] font-medium"
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white py-3.5 rounded-lg font-['Montserrat'] font-semibold tracking-wide hover:bg-[#D00000] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
          >
            INGRESAR
          </button>
        </form>
      </motion.div>
    </div>
  );
}
