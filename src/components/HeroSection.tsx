
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative bg-muted/30 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&auto=format&fit=crop')", 
          opacity: 0.3 
        }}
      />
      
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Bella Cucina
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Uma experiência gastronômica autêntica com ingredientes selecionados e técnicas tradicionais.
          </p>
          
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button size="lg" asChild>
              <Link to="/reservas">Fazer Reserva</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#menu-do-dia">Ver Menu</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
