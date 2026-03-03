import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { TrustBadges } from "@/components/customer/TrustBadges";
import { WhatsAppCTA } from "@/components/customer/WhatsAppCTA";
import heritageImage from "@/assets/heritage-weaver.jpg";
import heroSaree from "@/assets/hero-saree.jpg";

export default function About() {
  return (
    <CustomerLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 lg:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Since 1998
            </div>
            <h1 className="mt-4 font-serif text-4xl font-bold lg:text-5xl">
              The Story of <span className="text-primary">Gowtham Handlooms</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              A legacy of craftsmanship, tradition, and unwavering commitment to preserving the art of Andhra handloom weaving.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <h2 className="font-serif text-3xl font-bold">Our Heritage</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Nestled in the heart of Jandrapeta, Chirala Mandal – the weaving capital of Andhra Pradesh – Gowtham Handlooms was founded with a vision to bring the finest handloom sarees directly from the looms of master artisans to discerning customers across India.
                </p>
                <p>
                  For over two decades, we have been custodians of an ancient craft, working hand-in-hand with skilled weavers who have inherited their artistry through generations. Each saree in our collection is a labor of love, taking anywhere from a week to several months to complete.
                </p>
                <p>
                  From the intricate zari work of Kuppadam silk to the geometric brilliance of Pochampally Ikat, from the lustrous elegance of Dharmavaram to the delicate jamdani weave of Uppada – every piece tells a story of tradition, patience, and artistic excellence.
                </p>
              </div>
            </div>
            <div className="aspect-square overflow-hidden rounded-2xl shadow-premium-lg">
              <img src={heritageImage} alt="Master weaver working on traditional handloom in Chirala" className="h-full w-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1 aspect-[4/3] overflow-hidden rounded-2xl shadow-premium-lg">
              <img src={heroSaree} alt="Premium handloom silk saree collection" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="font-serif text-3xl font-bold">Our Mission</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Our mission is simple: <strong className="text-foreground">support artisans, deliver quality.</strong> We believe that handloom weaving is not just a craft – it's a cultural heritage that must be preserved for future generations.
                </p>
                <p>
                  By connecting customers directly with weavers, we eliminate middlemen, ensuring fair wages for artisans and fair prices for our customers. Every purchase supports a weaver family and helps keep this ancient art alive.
                </p>
              </div>
              {/* Timeline */}
              <div className="space-y-3 pt-4">
                {[
                  { year: "1998", event: "Founded in Chirala by the Gowtham family" },
                  { year: "2005", event: "Expanded to serve customers across Andhra Pradesh" },
                  { year: "2015", event: "Started pan-India shipping via courier" },
                  { year: "2024", event: "Launched online store to reach customers worldwide" },
                ].map((item) => (
                  <div key={item.year} className="flex items-start gap-3">
                    <span className="font-serif text-lg font-bold text-primary min-w-[60px]">{item.year}</span>
                    <span className="text-sm text-muted-foreground">{item.event}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold">What We Stand For</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Authenticity", description: "Every saree is 100% genuine handloom, directly sourced from verified artisans." },
              { title: "Quality", description: "Rigorous quality checks ensure only the finest pieces reach our customers." },
              { title: "Fair Trade", description: "We ensure fair wages and ethical working conditions for all our weavers." },
              { title: "Preservation", description: "Supporting traditional weaving techniques to keep ancient arts alive." },
              { title: "Trust", description: "Building lasting relationships through transparency and honest dealings." },
              { title: "Service", description: "Dedicated customer support to ensure a delightful shopping experience." },
            ].map((value, index) => (
              <div key={value.title} className="rounded-xl bg-card p-6 shadow-premium animate-fade-in border border-border" style={{ animationDelay: `${index * 100}ms` }}>
                <h3 className="font-serif text-xl font-semibold text-primary">{value.title}</h3>
                <p className="mt-2 text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TrustBadges />
      <WhatsAppCTA />
    </CustomerLayout>
  );
}
