import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Reddy",
    location: "Hyderabad",
    rating: 5,
    text: "Absolutely stunning Kuppadam silk saree! The quality is outstanding and the zari work is so detailed. Will definitely order again.",
  },
  {
    name: "Lakshmi Devi",
    location: "Bangalore",
    rating: 5,
    text: "I ordered a Pochampally Ikat for my daughter's engagement. Everyone complimented the saree. The colors are exactly as shown.",
  },
  {
    name: "Anitha Kumar",
    location: "Chennai",
    rating: 5,
    text: "Great customer service! They helped me choose the perfect Dharmavaram silk for my wedding. Delivered on time with beautiful packaging.",
  },
  {
    name: "Swathi Naidu",
    location: "Vijayawada",
    rating: 5,
    text: "As someone from AP, I appreciate authentic handloom. Gowtham Handlooms delivers genuine quality every single time. Highly recommended!",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 bg-secondary/20">
      <div className="container">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl font-bold">What Our Customers Say</h2>
          <p className="mt-2 text-muted-foreground">Trusted by saree lovers across India</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-xl bg-card p-6 shadow-premium animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="mt-4 border-t border-border pt-3">
                <p className="font-medium text-sm">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
