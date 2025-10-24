import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import HamperCard from '@/components/HamperCard';
import HamperModal from '@/components/HamperModal';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { mockHampers, Hamper } from '@/data/mockHampers';
import { ArrowDown, Mail, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import heroImage from '@/assets/hero-hamper.jpg';

const Home = () => {
  const [selectedHamper, setSelectedHamper] = useState<Hamper | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleHamperClick = (hamper: Hamper) => {
    setSelectedHamper(hamper);
    setModalOpen(true);
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you soon.');
    (e.target as HTMLFormElement).reset();
  };

  const scrollToHampers = () => {
    document.getElementById('hampers')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        </div>
        
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6 animate-scale-in">
            Curate Moments,
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Gift Memories
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Thoughtfully crafted hampers for every celebration, delivered with love
          </p>
          <Button
            variant="hero"
            size="xl"
            onClick={scrollToHampers}
            className="gap-2 animate-scale-in"
          >
            Explore Hampers
            <ArrowDown className="h-5 w-5 animate-bounce" />
          </Button>
        </div>
      </section>

      {/* Hampers Section */}
      <section id="hampers" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
            Our Best Hampers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium gift hampers, perfect for any occasion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockHampers.map((hamper) => (
            <HamperCard
              key={hamper.id}
              hamper={hamper}
              onClick={() => handleHamperClick(hamper)}
            />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="gradient-card py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
                Get In Touch
              </h2>
              <p className="text-lg text-muted-foreground">
                Have a question or special request? We'd love to hear from you!
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    required
                    placeholder="Tell us how we can help..."
                    className="w-full min-h-32"
                  />
                </div>
                <div className="flex gap-4">
                  <Button type="submit" variant="default" className="flex-1 gap-2">
                    <Mail className="h-4 w-4" />
                    Send Message
                  </Button>
                  <Button
                    type="button"
                    variant="premium"
                    className="flex-1 gap-2"
                    onClick={() => window.open('https://wa.me/918168080791', '_blank')}
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Us
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <HamperModal
        hamper={selectedHamper}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
};

export default Home;
