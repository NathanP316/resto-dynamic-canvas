
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MenuItem } from "@/types";
import { cn } from "@/lib/utils";
import { Euro } from "lucide-react";

interface MenuCardProps {
  item: MenuItem;
  className?: string;
}

const MenuCard = ({ item, className }: MenuCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  return (
    <Card className={cn("menu-item-card group", className)}>
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {item.isSpecial && (
          <Badge className="absolute top-2 right-2 bg-primary/90" variant="default">
            Especial
          </Badge>
        )}
        {!item.available && (
          <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
            <span className="text-lg font-semibold text-muted-foreground">Indisponível</span>
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{item.name}</CardTitle>
        <CardDescription className="line-clamp-2">{item.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {item.allergens && item.allergens.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {item.allergens.map(allergen => (
              <Badge key={allergen} variant="outline" className="text-xs">
                {allergen}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="font-display text-lg text-primary flex items-center">
          <Euro size={16} className="mr-1" />
          {formatPrice(item.price)}
        </span>
        <Badge variant="secondary" className="text-xs font-medium">
          {item.category}
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default MenuCard;
