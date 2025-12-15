import Hero from "@/components/Hero";
import Features from "@/components/Features";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategorySection from "@/components/CategorySection";
import NewArrivals from "@/components/NewArrivals";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <FeaturedProducts />
      <CategorySection />
      <NewArrivals />
    </>
  );
}
