import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import BestSellers from "@/components/home/BestSellers";
import Lookbook from "@/components/home/Lookbook";
import FeaturedCollectionBanner from "@/components/home/FeaturedCollectionBanner";
import NewArrivals from "@/components/home/NewArrivals";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Statistics from "@/components/home/Statistics";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedCategories />
      <BestSellers />
      <Lookbook />
      <FeaturedCollectionBanner />
      <NewArrivals />
      <WhyChooseUs />
      <Statistics />
      <Testimonials />
      <Newsletter />
    </>
  );
}
