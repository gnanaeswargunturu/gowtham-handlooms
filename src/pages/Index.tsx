import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { HeroBanner } from "@/components/customer/HeroBanner";
import { CategoryGrid } from "@/components/customer/CategoryGrid";
import { FeaturedProducts } from "@/components/customer/FeaturedProducts";
import { HeritageSection } from "@/components/customer/HeritageSection";
import { TrustBadges } from "@/components/customer/TrustBadges";

const Index = () => {
  return (
    <CustomerLayout>
      {/* Hero Banner */}
      <HeroBanner />
      
      {/* Trust Badges */}
      <TrustBadges />
      
      {/* Category Navigation */}
      <CategoryGrid />
      
      {/* Featured Products */}
      <FeaturedProducts />
      
      {/* Heritage/About Section */}
      <HeritageSection />
      
      {/* New Arrivals - can reuse FeaturedProducts with different props */}
      <FeaturedProducts 
        title="New Arrivals"
        subtitle="Fresh additions to our handloom collection"
      />
    </CustomerLayout>
  );
};

export default Index;
