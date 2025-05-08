
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import DailyMenuSection from "@/components/DailyMenuSection";
import { mockMenuOfTheDay } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        
        <div id="menu-do-dia">
          <DailyMenuSection menu={mockMenuOfTheDay} />
        </div>
        
        {/* Seção de Informações */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&auto=format&fit=crop"
                  alt="Restaurante"
                  className="rounded-lg shadow-lg object-cover h-[400px] w-full"
                />
              </div>
              
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Sobre o Bella Cucina</h2>
                <p className="text-muted-foreground">
                  Fundado em 2010, o Bella Cucina nasceu da paixão pela culinária italiana autêntica.
                  Utilizamos ingredientes frescos e selecionados, importados diretamente da Itália,
                  para criar pratos que transportam nossos clientes diretamente para as tradicionais
                  trattorias italianas.
                </p>
                <p className="text-muted-foreground">
                  Nossa equipe de chefs treinados nas melhores escolas de gastronomia da Itália
                  está sempre inovando o menu, respeitando a tradição e adicionando toques contemporâneos.
                </p>
                
                <div>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/reservas">Faça sua Reserva</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Seção de Contato */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Visite-nos</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Estamos localizados em uma área privilegiada da cidade, com fácil acesso e estacionamento próprio.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-muted p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Informações</h3>
                <div className="space-y-3">
                  <p><strong>Endereço:</strong> Rua das Oliveiras, 123 - Centro</p>
                  <p><strong>Telefone:</strong> (11) 3456-7890</p>
                  <p><strong>Email:</strong> contato@bellacucina.com.br</p>
                  <p><strong>Horário:</strong> Segunda a Quinta: 18h às 23h</p>
                  <p>Sexta: 18h às 00h</p>
                  <p>Sábado: 12h às 00h</p>
                  <p>Domingo: 18h às 23h</p>
                </div>
              </div>
              
              <div className="bg-muted p-6 rounded-lg h-64 md:h-auto">
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  <p>[Mapa do restaurante seria exibido aqui]</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
