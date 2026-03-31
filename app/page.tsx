// app/page.tsx
import NicotineWarningMarquee from "../src/components/Banner";
import Navbar from "../src/components/Navbar";
import HeroSlider from "../src/components/Crousel";

import ProductGrid from "../src/components/cards";
import BrandMarquee from "../src/components/Brands";
import NewArrivals from "../src/components/testimonial";
import ProductSection from "../src/components/categories";
import DeliveryBanner from "../src/components/Banner";
import VapesCarousel from "../src/components/VapeCrousel";
import LiquidCarousel from "../src/components/liquid-crousel";

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
      {/* <NewArrivals /> */}
    </>
  );
}
