
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Bella Cucina</h3>
            <p className="text-muted-foreground">
              Culinária italiana autêntica com ingredientes frescos e selecionados.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Horários</h4>
            <p className="text-muted-foreground mb-2">Segunda a Quinta: 18h - 23h</p>
            <p className="text-muted-foreground mb-2">Sexta: 18h - 00h</p>
            <p className="text-muted-foreground">Sábado: 12h - 00h</p>
            <p className="text-muted-foreground">Domingo: 18h - 23h</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <p className="text-muted-foreground mb-2">Rua das Oliveiras, 123 - Centro</p>
            <p className="text-muted-foreground mb-2">Telefone: (11) 3456-7890</p>
            <p className="text-muted-foreground mb-2">contato@bellacucina.com.br</p>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-6 text-center text-muted-foreground">
          <p>&copy; {currentYear} Bella Cucina. Todos os direitos reservados.</p>
          <div className="mt-2 space-x-4">
            <Link to="/politica-privacidade" className="hover:text-primary text-sm">
              Política de Privacidade
            </Link>
            <Link to="/termos" className="hover:text-primary text-sm">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
