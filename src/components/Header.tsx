
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold">Bella Cucina</h1>
        </Link>

        {isMobile ? (
          <>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              className="relative z-50"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
            
            <div 
              className={cn(
                "fixed inset-0 bg-background/95 z-40 flex flex-col items-center justify-center space-y-8 transform transition-transform duration-300",
                mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
              )}
            >
              <NavLinks isMobile={true} onClick={() => setMobileMenuOpen(false)} />
            </div>
          </>
        ) : (
          <nav className="hidden md:flex items-center space-x-8">
            <NavLinks isMobile={false} />
          </nav>
        )}
      </div>
    </header>
  );
};

interface NavLinksProps {
  isMobile?: boolean;
  onClick?: () => void;
}

const NavLinks = ({ isMobile = false, onClick }: NavLinksProps) => {
  const navLinks = [
    { name: 'Menu do Dia', path: '/' },
    { name: 'Reservas', path: '/reservas' },
    { name: 'Admin', path: '/admin' },
  ];

  return (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={cn(
            "text-foreground hover:text-primary transition-colors",
            isMobile ? "text-2xl py-2" : "text-base"
          )}
          onClick={onClick}
        >
          {link.name}
        </Link>
      ))}
      <Button asChild>
        <Link to="/reservas">Fazer Reserva</Link>
      </Button>
    </>
  );
};

export default Header;
