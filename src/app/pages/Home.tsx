import { SplitScreenHero } from '../components/SplitScreenHero';
import { Catalog } from '../components/Catalog';
import { PaymentMethods } from '../components/PaymentMethods';

export default function Home() {
  return (
    <>
      <SplitScreenHero />
      <Catalog />
      <PaymentMethods />
    </>
  );
}
