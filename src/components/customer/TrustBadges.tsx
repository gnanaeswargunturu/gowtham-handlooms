import { Truck, Shield, RefreshCw, Headphones } from "lucide-react";

const badges = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders above ₹5,000",
  },
  {
    icon: Shield,
    title: "Authentic Handloom",
    description: "100% genuine products",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "7-day return policy",
  },
  {
    icon: Headphones,
    title: "Support",
    description: "WhatsApp assistance",
  },
];

export function TrustBadges() {
  return (
    <section className="border-y border-border bg-card py-8">
      <div className="container">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {badges.map((badge, index) => (
            <div
              key={badge.title}
              className="flex items-center gap-4 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <badge.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">{badge.title}</h4>
                <p className="text-sm text-muted-foreground">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
