
import { MenuItem } from "@/types";
import MenuCard from "./MenuCard";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MenuListProps {
  items: MenuItem[];
}

const MenuList = ({ items }: MenuListProps) => {
  // Extraindo categorias únicas
  const categories = Array.from(new Set(items.map(item => item.category)));
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Filtrando itens pela categoria selecionada
  const filteredItems = activeCategory === "all" 
    ? items 
    : items.filter(item => item.category === activeCategory);

  return (
    <div className="w-full">
      <Tabs defaultValue="all" onValueChange={setActiveCategory}>
        <TabsList className="mb-8 flex flex-wrap">
          <TabsTrigger value="all">Todos</TabsTrigger>
          {categories.map(category => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory} className="animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">Nenhum item encontrado</h3>
              <p className="text-muted-foreground">
                Não há itens disponíveis nesta categoria no momento.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MenuList;
