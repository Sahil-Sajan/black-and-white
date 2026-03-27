import NicotineWarningMarquee from "./components/Banner";
import Navbar from "./components/Navbar";
import HeroSlider from "./components/Crousel";
import CategoryGrid from "./components/categories";
import ProductGrid from "./components/cards";
import BrandMarquee from "./components/Brands";
import NewArrivals from "./components/testimonial";


export default function Home() {
  return (
    <>
      <NicotineWarningMarquee />

      <HeroSlider />
      <CategoryGrid />
      <ProductGrid />
      <BrandMarquee />
      <NewArrivals />
      {/* <TestimonialSection /> */}
    </>
  );
}
