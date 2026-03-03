import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      toast({ title: "Subscribed!", description: "Thank you for subscribing to our updates." });
      setEmail("");
    }
  };

  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <h3 className="font-serif text-xl font-bold text-primary">Gowtham Handlooms</h3>
            </Link>
            <p className="text-sm text-muted-foreground">
              Preserving the rich heritage of Andhra handloom sarees since generations. 
              Each saree tells a story of tradition, craftsmanship, and timeless beauty.
            </p>
            {/* Newsletter */}
            <form onSubmit={handleNewsletterSubmit} className="mt-4">
              <p className="text-sm font-medium mb-2">Sign up for updates</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-sm"
                  required
                />
                <Button type="submit" size="sm">Subscribe</Button>
              </div>
            </form>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">Quick Links</h4>
            <nav className="flex flex-col gap-2.5">
              {[
                { to: "/shop", label: "Shop All Sarees" },
                { to: "/about", label: "Our Story" },
                { to: "/contact", label: "Contact Us" },
                { to: "/profile", label: "Track Order" },
              ].map(link => (
                <Link key={link.to} to={link.to} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">Customer Service</h4>
            <nav className="flex flex-col gap-2.5">
              {[
                { to: "/shipping", label: "Shipping Policy" },
                { to: "/returns", label: "Returns & Exchanges" },
                { to: "/faq", label: "FAQs" },
                { to: "/privacy", label: "Privacy Policy" },
                { to: "/terms", label: "Terms of Service" },
              ].map(link => (
                <Link key={link.to} to={link.to} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">Contact Us</h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <a href="tel:+919876543210" className="flex items-center gap-2 transition-colors hover:text-primary">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                +91 98765 43210
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-primary">
                <MessageCircle className="h-4 w-4 shrink-0 text-primary" />
                WhatsApp Us
              </a>
              <a href="mailto:info@gowthamhandlooms.com" className="flex items-center gap-2 transition-colors hover:text-primary">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                info@gowthamhandlooms.com
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>Jandrapeta, Chirala Mandal, Andhra Pradesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-primary" />
                Mon – Sat: 10 AM – 8 PM
              </div>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="mt-8 rounded-lg border border-border bg-card p-4 text-center text-sm text-muted-foreground">
          <p>💳 We accept UPI, Bank Transfer & Cash on Delivery (COD). Payment integration coming soon.</p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-border pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Gowtham Handlooms. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link to="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-primary">Privacy Policy</Link>
              <Link to="/terms" className="text-sm text-muted-foreground transition-colors hover:text-primary">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
