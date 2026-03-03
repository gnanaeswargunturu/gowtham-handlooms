import { Link } from "react-router-dom";
import { Sparkles, PartyPopper, Sun, Heart } from "lucide-react";

const occasions = [
  { label: "Wedding", value: "wedding", icon: Heart },
  { label: "Festive", value: "festive", icon: Sparkles },
  { label: "Party", value: "party", icon: PartyPopper },
  { label: "Daily Wear", value: "daily", icon: Sun },
];

export function OccasionFilter() {
  return (
    <section className="py-8">
      <div className="container">
        <h3 className="mb-4 text-center font-serif text-xl font-semibold">Shop by Occasion</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {occasions.map((occasion) => (
            <Link
              key={occasion.value}
              to={`/shop?occasion=${occasion.value}`}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition-all hover:border-primary hover:bg-primary/5 hover:text-primary"
            >
              <occasion.icon className="h-4 w-4" />
              {occasion.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
