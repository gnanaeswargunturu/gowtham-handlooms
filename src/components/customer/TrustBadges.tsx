import { Truck, Shield, RefreshCw, MessageCircle } from "lucide-react";

const badges = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping on orders above ₹5,000",
  },
  {
    icon: Shield,
    title: "Authentic Handloom",
    description: "100% handloom, sourced directly from weavers",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "7-day hassle-free returns",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Support",
    description: "WhatsApp & phone support for every order",
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
                <p className="text-xs text-muted-foreground">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
