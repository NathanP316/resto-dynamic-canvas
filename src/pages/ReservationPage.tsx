
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ReservationForm from "@/components/ReservationForm";

const ReservationPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Faça sua Reserva</h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Reserve sua mesa no Bella Cucina e desfrute de uma experiência gastronômica inesquecível.
                Preencha o formulário abaixo e aguarde nossa confirmação.
              </p>
            </div>
            
            <ReservationForm />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReservationPage;
