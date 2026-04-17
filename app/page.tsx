// app/page.tsx
import { DeliveryBanner, NicotineWarningMarquee } from "../src/components/Banner";
import HeroSlider from "../src/components/Crousel";

import BrandMarquee from "../src/components/Brands";
import ProductSection from "../src/components/categories";
import VapesCarousel from "../src/components/VapeCrousel";
import LiquidCarousel from "../src/components/liquid-crousel";
import AccessoriesCarousel from "../src/components/accessories";

export default function Home() {
  return (
    <>
      <NicotineWarningMarquee />

      <HeroSlider />
      <ProductSection />

      {/* <ProductGrid /> */}
      <DeliveryBanner />
      <BrandMarquee />
      <VapesCarousel />
      <LiquidCarousel />
      <AccessoriesCarousel />
      {/* <NewArrivals /> */}
    </>
  );
}
