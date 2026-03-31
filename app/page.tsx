// app/page.tsx
import NicotineWarningMarquee from "./components/Banner";
import Navbar from "./components/Navbar";
import HeroSlider from "./components/Crousel";


import ProductGrid from "./components/cards";
import BrandMarquee from "./components/Brands";
import NewArrivals from "./components/testimonial";
import ProductSection from "./components/categories";
import DeliveryBanner from "./components/Banner";
import VapesCarousel from "./components/VapeCrousel";
import LiquidCarousel from "./components/liquid-crousel";


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