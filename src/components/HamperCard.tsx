import { Hamper } from '@/data/mockHampers';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface HamperCardProps {
  hamper: Hamper;
  onClick: () => void;
}

const HamperCard = ({ hamper, onClick }: HamperCardProps) => {
  return (
    <Card
      onClick={onClick}
      className="group cursor-pointer overflow-hidden border-border hover:border-primary transition-smooth hover-scale shadow-soft hover:shadow-hover"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={hamper.image}
          alt={hamper.name}
          className="h-full w-full object-cover transition-smooth group-hover:scale-110"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-2 mb-2">
          {hamper.occasion.slice(0, 2).map((occ) => (
            <Badge key={occ} variant="secondary" className="text-xs">
              {occ}
            </Badge>
          ))}
        </div>
        <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
          {hamper.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
          {hamper.description}
        </p>
        <p className="text-xl font-bold text-primary">£{hamper.price.toFixed(2)}</p>
      </CardContent>
    </Card>
  );
};

export default HamperCard;
