import { MessageCircle, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WhatsAppCTA() {
  return (
    <section className="bg-primary/5 py-16">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-bold lg:text-4xl">
            Visit Our Store in Chirala or Shop Online
          </h2>
          
          <div className="mt-6 space-y-3 text-muted-foreground">
            <div className="flex items-center justify-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span>Jandrapeta, Chirala Mandal, Andhra Pradesh</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Mon – Sat, 10 AM – 8 PM</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" className="gap-2" asChild>
              <a
                href="https://wa.me/919876543210?text=Hi%20Gowtham%20Handlooms%2C%20I%27m%20interested%20in%20your%20saree%20collection."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <a href="tel:+919876543210">
                <Phone className="h-5 w-5" />
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
