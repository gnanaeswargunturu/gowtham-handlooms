import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
            </h1>
            
            <p className="mx-auto max-w-lg text-lg text-muted-foreground lg:mx-0">
              Discover exquisite Andhra handloom sarees crafted by skilled artisans. 
              Each piece is a masterwork of heritage, elegance, and timeless beauty.
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button size="lg" className="btn-premium gap-2" asChild>
                <Link to="/shop">
                  Explore Collection
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/about">Our Story</Link>
              </Button>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative aspect-[4/5] lg:aspect-square">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5">
              {/* Decorative elements */}
              <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-primary/20" />
              <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/30" />
              
              {/* Placeholder content */}
              <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                <div className="h-32 w-32 rounded-full bg-primary/10 backdrop-blur" />
                <p className="font-serif text-lg text-muted-foreground">
                  Premium Saree Collection
                </p>
                <p className="text-sm text-muted-foreground/70">
                  Images will be added soon
                </p>
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
