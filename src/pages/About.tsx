import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { TrustBadges } from "@/components/customer/TrustBadges";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

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
              The Story of{" "}
              <span className="text-primary">Gowtham Handlooms</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              A legacy of craftsmanship, tradition, and unwavering commitment to 
              preserving the art of Andhra handloom weaving.
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
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Nestled in the heart of Jandrapeta, Chirala Mandal – the weaving capital 
                  of Andhra Pradesh – Gowtham Handlooms was founded with a vision to bring 
                  the finest handloom sarees directly from the looms of master artisans to 
                  discerning customers across India.
                </p>
                <p>
                  For over two decades, we have been custodians of an ancient craft, working 
                  hand-in-hand with skilled weavers who have inherited their artistry through 
                  generations. Each saree in our collection is a labor of love, taking anywhere 
                  from a week to several months to complete.
                </p>
                <p>
                  From the intricate zari work of Kuppadam silk to the geometric brilliance of 
                  Pochampally Ikat, from the lustrous elegance of Dharmavaram to the delicate 
                  jamdani weave of Uppada – every piece tells a story of tradition, patience, 
                  and artistic excellence.
                </p>
              </div>
            </div>
            
            <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-serif text-xl text-muted-foreground">Heritage Image</p>
                  <p className="text-sm text-muted-foreground/70">Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary/30 py-16">
        <div className="container">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold">What We Stand For</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Authenticity",
                description: "Every saree is 100% genuine handloom, directly sourced from verified artisans.",
              },
              {
                title: "Quality",
                description: "Rigorous quality checks ensure only the finest pieces reach our customers.",
              },
              {
                title: "Fair Trade",
                description: "We ensure fair wages and ethical working conditions for all our weavers.",
              },
              {
                title: "Preservation",
                description: "Supporting traditional weaving techniques to keep ancient arts alive.",
              },
              {
                title: "Trust",
                description: "Building lasting relationships through transparency and honest dealings.",
              },
              {
                title: "Service",
                description: "Dedicated customer support to ensure a delightful shopping experience.",
              },
            ].map((value, index) => (
              <div
                key={value.title}
                className="rounded-xl bg-card p-6 shadow-premium animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="font-serif text-xl font-semibold text-primary">{value.title}</h3>
                <p className="mt-2 text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TrustBadges />

      {/* Contact Section */}
      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold">Visit Our Store</h2>
            <p className="mt-4 text-muted-foreground">
              We'd love to welcome you to our store and help you find the perfect saree.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Jandrapeta, Chirala Mandal, Andhra Pradesh, India</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <span>Monday - Saturday: 10:00 AM - 8:00 PM</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <a href="tel:+919876543210" className="hover:text-primary">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:info@gowthamhandlooms.com" className="hover:text-primary">
                  info@gowthamhandlooms.com
                </a>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild className="gap-2">
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="tel:+919876543210">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </CustomerLayout>
  );
}
