import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder'

// Intentar crear el cliente, pero envolverlo para evitar que rompa toda la aplicación
let supabaseInstance: any;

try {
    // Solo intentamos crear el cliente si parece una URL válida (empieza por http)
    if (supabaseUrl.startsWith('http')) {
        supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    } else {
        console.warn('Supabase URL no configurada correctamente.');
        supabaseInstance = null;
    }
} catch (e) {
    console.error('Fallo al inicializar Supabase:', e);
    supabaseInstance = null;
}

export const supabase = supabaseInstance;
