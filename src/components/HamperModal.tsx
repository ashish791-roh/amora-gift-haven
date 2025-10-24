import { Hamper } from '@/data/mockHampers';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Share2, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface HamperModalProps {
  hamper: Hamper | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const HamperModal = ({ hamper, open, onOpenChange }: HamperModalProps) => {
  if (!hamper) return null;

  const handleWhatsAppShare = () => {
    const message = `Check out this beautiful hamper from Amora Gifts: ${hamper.name} - £${hamper.price}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleBuyNow = () => {
    const message = `Hi! I'd like to order the ${hamper.name} hamper (£${hamper.price})`;
    const url = getWhatsAppUrl("918168080791", message);
    window.open(url, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">{hamper.name}</DialogTitle>
          <DialogDescription className="text-base">
            {hamper.category} Collection
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <img
            src={hamper.image}
            alt={hamper.name}
            className="w-full h-64 object-cover rounded-lg"
          />

          <div className="flex flex-wrap gap-2">
            {hamper.occasion.map((occ) => (
              <Badge key={occ} variant="secondary">
                {occ}
              </Badge>
            ))}
          </div>

          <p className="text-foreground leading-relaxed">{hamper.description}</p>

          <div className="flex items-center justify-between pt-4 border-t">
            <p className="text-3xl font-bold text-primary">£{hamper.price.toFixed(2)}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleWhatsAppShare}>
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button variant="hero" onClick={handleBuyNow} className="gap-2">
                <ShoppingCart className="h-4 w-4" />
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HamperModal;
