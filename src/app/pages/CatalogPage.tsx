import { Catalog } from '../components/Catalog';

export default function CatalogPage() {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Fondo Fijo con Logo */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.05] flex items-center justify-center -z-10"
        style={{
          backgroundImage: 'url("/LOGO.png")',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '40%', // Tamaño moderado para que no sature
          backgroundAttachment: 'fixed'
        }}
      />
      <Catalog />
    </div>
  );
}
