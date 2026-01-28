import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <h3 className="font-serif text-xl font-bold text-primary">
                Gowtham Handlooms
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground">
              Preserving the rich heritage of Andhra handloom sarees since generations. 
              Each saree tells a story of tradition, craftsmanship, and timeless beauty.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link 
                to="/shop" 
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Shop All Sarees
              </Link>
              <Link 
                to="/categories" 
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Categories
              </Link>
              <Link 
                to="/about" 
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Our Story
              </Link>
              <Link 
                to="/account/orders" 
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Track Order
              </Link>
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">Customer Service</h4>
            <nav className="flex flex-col gap-2">
              <Link 
                to="/shipping" 
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Shipping Policy
              </Link>
              <Link 
                to="/returns" 
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Returns & Exchanges
              </Link>
              <Link 
                to="/faq" 
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                FAQs
              </Link>
              <Link 
                to="/contact" 
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">Contact Us</h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <a 
                href="tel:+919876543210" 
                className="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4 text-primary" />
                +91 98765 43210
              </a>
              <a 
                href="https://wa.me/919876543210" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <MessageCircle className="h-4 w-4 text-primary" />
                WhatsApp
              </a>
              <a 
                href="mailto:info@gowthamhandlooms.com" 
                className="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4 text-primary" />
                info@gowthamhandlooms.com
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>Jandrapeta, Chirala Mandal, Andhra Pradesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Mon - Sat: 10 AM - 8 PM
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Gowtham Handlooms. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link 
                to="/privacy" 
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
