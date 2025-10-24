import { Instagram, MessageCircle, Gift } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Gift className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-serif font-bold text-foreground">Amora Gifts</h3>
            </div>
            <p className="text-muted-foreground">
              Curate Moments, Gift Memories. Handcrafted hampers for every special occasion.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-smooth">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-smooth">Our Hampers</a></li>
              <li><a href="#contact" className="hover:text-primary transition-smooth">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-smooth">FAQs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Connect With Us</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth hover-scale"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/918168080791"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth hover-scale"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} Amora Gifts. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
