import { SplitScreenHero } from '../components/SplitScreenHero';
import { Catalog } from '../components/Catalog';
import { PaymentMethods } from '../components/PaymentMethods';
import { ParallaxHero } from '../components/ParallaxHero';

export default function Home() {
  return (
    <>
      <ParallaxHero />
      <div className="relative z-10 bg-white shadow-2xl">
        <SplitScreenHero />
        <Catalog />
        <PaymentMethods />
      </div>
    </>
  );
}
