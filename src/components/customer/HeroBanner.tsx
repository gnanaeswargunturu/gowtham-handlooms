import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-saree.jpg";

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container py-16 md:py-24 lg:py-32">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Content */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
              ✨ New Collection Available
            </div>
            
            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Handwoven with{" "}
              <span className="text-primary">Love & Tradition</span>
              {" "}from Andhra Pradesh
            </h1>
            
            <p className="mx-auto max-w-lg text-lg text-muted-foreground lg:mx-0">
              Discover authentic handloom sarees crafted by master weavers from Chirala and surrounding regions. Each piece is a masterwork of heritage, elegance, and timeless beauty.
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button size="lg" className="btn-premium gap-2" asChild>
                <Link to="/shop">
                  Shop Sarees
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/about">Explore Our Story</Link>
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative aspect-[3/4] lg:aspect-[4/5]">
            <div className="absolute inset-0 overflow-hidden rounded-2xl shadow-premium-lg">
              <img
                src={heroImage}
                alt="Premium Andhra handloom silk saree in maroon and gold – Gowtham Handlooms collection"
                className="h-full w-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
            </div>
            
            {/* Floating badge */}
            <div className="absolute -left-4 bottom-8 hidden rounded-xl bg-card p-4 shadow-premium-lg lg:block">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="font-serif text-2xl font-bold text-primary">25+</p>
                  <p className="text-xs text-muted-foreground">Years of Trust</p>
                </div>
                <div className="h-10 w-px bg-border" />
                <div className="text-center">
                  <p className="font-serif text-2xl font-bold text-primary">1000+</p>
                  <p className="text-xs text-muted-foreground">Happy Customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative background patterns */}
      <div className="absolute -left-4 top-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -right-4 bottom-1/4 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
    </section>
  );
}
