import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heritageImage from "@/assets/heritage-weaver.jpg";

export function HeritageSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-premium-lg">
              <img
                src={heritageImage}
                alt="Master weaver working on traditional handloom in Chirala, Andhra Pradesh"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Floating stats card */}
            <div className="absolute -bottom-6 -right-6 hidden rounded-xl bg-card p-6 shadow-premium-lg lg:block">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="font-serif text-3xl font-bold text-primary">25+</p>
                  <p className="text-xs text-muted-foreground">Years of Trust</p>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="text-center">
                  <p className="font-serif text-3xl font-bold text-primary">1000+</p>
                  <p className="text-xs text-muted-foreground">Happy Customers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 space-y-6 lg:order-2">
            <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Our Heritage
            </div>

            <h2 className="font-serif text-3xl font-bold leading-tight lg:text-4xl">
              Preserving the Art of{" "}
              <span className="text-gradient-gold">Andhra Handloom</span>
            </h2>

            <div className="space-y-4 text-muted-foreground">
              <p>
                At Gowtham Handlooms, we are custodians of a centuries-old tradition. 
                Located in the heart of Chirala, Andhra Pradesh – the land of master weavers – 
                our journey began with a simple mission: to bring the finest handloom sarees 
                to discerning women across India.
              </p>
              <p>
                Each saree in our collection is a testament to the skill, patience, and artistry 
                of our weavers. From the intricate zari work of Kuppadam to the geometric brilliance 
                of Pochampally Ikat, every piece tells a story of tradition meeting elegance.
              </p>
              <p>
                We source directly from artisan families, ensuring fair wages and authentic craftsmanship. 
                No powerloom, no shortcuts – just pure handloom tradition passed down through generations.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 pt-2">
              <div>
                <p className="font-serif text-2xl font-bold text-primary">100%</p>
                <p className="text-sm text-muted-foreground">Authentic Handloom</p>
              </div>
              <div className="h-auto w-px bg-border" />
              <div>
                <p className="font-serif text-2xl font-bold text-primary">Direct</p>
                <p className="text-sm text-muted-foreground">From Artisans</p>
              </div>
              <div className="h-auto w-px bg-border" />
              <div>
                <p className="font-serif text-2xl font-bold text-primary">Pan India</p>
                <p className="text-sm text-muted-foreground">Delivery</p>
              </div>
            </div>

            <Button className="btn-premium mt-4" asChild>
              <Link to="/about">Read Our Full Story</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
