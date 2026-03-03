import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { HeroBanner } from "@/components/customer/HeroBanner";
import { TrustBadges } from "@/components/customer/TrustBadges";
import { OccasionFilter } from "@/components/customer/OccasionFilter";
import { CategoryGrid } from "@/components/customer/CategoryGrid";
import { FeaturedProducts } from "@/components/customer/FeaturedProducts";
import { HeritageSection } from "@/components/customer/HeritageSection";
import { TestimonialsSection } from "@/components/customer/TestimonialsSection";
import { WhatsAppCTA } from "@/components/customer/WhatsAppCTA";

const Index = () => {
  return (
    <CustomerLayout>
      <HeroBanner />
      <TrustBadges />
      <OccasionFilter />
      <CategoryGrid />
      <FeaturedProducts />
      <HeritageSection />
      <TestimonialsSection />
      <WhatsAppCTA />
    </CustomerLayout>
  );
};

export default Index;
