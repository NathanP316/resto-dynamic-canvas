
import { MenuOfTheDay } from "@/types";
import MenuList from "./MenuList";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DailyMenuSectionProps {
  menu: MenuOfTheDay;
}

const DailyMenuSection = ({ menu }: DailyMenuSectionProps) => {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "EEEE, dd 'de' MMMM", { locale: ptBR });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Menu do Dia</h2>
          <p className="text-muted-foreground text-lg">
            {formatDate(menu.date)}
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6"></div>
        </div>

        {menu.items.length > 0 ? (
          <MenuList items={menu.items} />
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold mb-4">
              Menu não disponível
            </h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Nossa equipe está trabalhando no menu especial de hoje.
              Por favor, volte em breve ou entre em contato conosco para mais informações.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DailyMenuSection;
