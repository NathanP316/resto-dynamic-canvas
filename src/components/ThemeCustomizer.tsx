
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/toast";
import { useState } from "react";

const predefinedThemes = [
  {
    name: "Elegante",
    primaryColor: "#D35400",
    secondaryColor: "#F5F5DC",
    fontPrimary: "Playfair Display",
    fontSecondary: "Open Sans",
  },
  {
    name: "Moderno",
    primaryColor: "#2980B9",
    secondaryColor: "#ECF0F1",
    fontPrimary: "Montserrat",
    fontSecondary: "Roboto",
  },
  {
    name: "Rústico",
    primaryColor: "#8B4513",
    secondaryColor: "#F5F5F5",
    fontPrimary: "Libre Baskerville",
    fontSecondary: "Lato",
  },
  {
    name: "Tropical",
    primaryColor: "#27AE60",
    secondaryColor: "#FFF9C4",
    fontPrimary: "Poppins",
    fontSecondary: "Work Sans",
  },
];

interface ThemeCustomizerProps {
  onThemeChange?: (theme: {
    primaryColor: string;
    secondaryColor: string;
    fontPrimary: string;
    fontSecondary: string;
  }) => void;
}

const ThemeCustomizer = ({ onThemeChange }: ThemeCustomizerProps) => {
  const { toast } = useToast();
  const [activeTheme, setActiveTheme] = useState(predefinedThemes[0].name);
  const [customTheme, setCustomTheme] = useState({
    primaryColor: predefinedThemes[0].primaryColor,
    secondaryColor: predefinedThemes[0].secondaryColor,
    fontPrimary: predefinedThemes[0].fontPrimary,
    fontSecondary: predefinedThemes[0].fontSecondary,
  });
  
  const handleThemeSelect = (themeName: string) => {
    const selected = predefinedThemes.find(t => t.name === themeName);
    if (selected) {
      setActiveTheme(themeName);
      setCustomTheme({
        primaryColor: selected.primaryColor,
        secondaryColor: selected.secondaryColor,
        fontPrimary: selected.fontPrimary,
        fontSecondary: selected.fontSecondary,
      });
      
      if (onThemeChange) {
        onThemeChange(selected);
      }
    }
  };
  
  const handleCustomThemeChange = (property: keyof typeof customTheme, value: string) => {
    setCustomTheme(prev => ({
      ...prev,
      [property]: value,
    }));
    
    // Se estávamos em um tema pré-definido, mude para customizado
    if (activeTheme !== "Customizado") {
      setActiveTheme("Customizado");
    }
  };
  
  const applyCustomTheme = () => {
    if (onThemeChange) {
      onThemeChange(customTheme);
    }
    
    toast({
      title: "Tema personalizado aplicado",
      description: "As alterações foram aplicadas com sucesso.",
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personalização do Tema</CardTitle>
        <CardDescription>Escolha um tema pré-definido ou crie o seu</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="predefined" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="predefined">Temas</TabsTrigger>
            <TabsTrigger value="custom">Personalizado</TabsTrigger>
          </TabsList>
          
          <TabsContent value="predefined">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {predefinedThemes.map(theme => (
                <div 
                  key={theme.name}
                  className={`
                    p-4 rounded-lg border-2 cursor-pointer transition-all 
                    ${activeTheme === theme.name ? 'border-primary' : 'border-transparent hover:border-muted'}
                  `}
                  onClick={() => handleThemeSelect(theme.name)}
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">{theme.name}</h3>
                    {activeTheme === theme.name && (
                      <div className="w-3 h-3 rounded-full bg-primary" />
                    )}
                  </div>
                  
                  <div className="flex gap-2 mb-3">
                    <div 
                      className="w-10 h-10 rounded" 
                      style={{ backgroundColor: theme.primaryColor }}
                      title="Cor primária"
                    />
                    <div 
                      className="w-10 h-10 rounded border" 
                      style={{ backgroundColor: theme.secondaryColor }}
                      title="Cor secundária"
                    />
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <div className="mb-1">
                      <span className="font-medium">Fonte títulos:</span> {theme.fontPrimary}
                    </div>
                    <div>
                      <span className="font-medium">Fonte corpo:</span> {theme.fontSecondary}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="custom">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Cor Primária</Label>
                  <div className="flex gap-2 items-center">
                    <div 
                      className="w-8 h-8 rounded" 
                      style={{ backgroundColor: customTheme.primaryColor }} 
                    />
                    <Input
                      id="primaryColor"
                      type="text"
                      value={customTheme.primaryColor}
                      onChange={(e) => handleCustomThemeChange("primaryColor", e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Cor Secundária</Label>
                  <div className="flex gap-2 items-center">
                    <div 
                      className="w-8 h-8 rounded border" 
                      style={{ backgroundColor: customTheme.secondaryColor }} 
                    />
                    <Input
                      id="secondaryColor"
                      type="text"
                      value={customTheme.secondaryColor}
                      onChange={(e) => handleCustomThemeChange("secondaryColor", e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fontPrimary">Fonte para Títulos</Label>
                  <Input
                    id="fontPrimary"
                    type="text"
                    value={customTheme.fontPrimary}
                    onChange={(e) => handleCustomThemeChange("fontPrimary", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fontSecondary">Fonte para Corpo</Label>
                  <Input
                    id="fontSecondary"
                    type="text"
                    value={customTheme.fontSecondary}
                    onChange={(e) => handleCustomThemeChange("fontSecondary", e.target.value)}
                  />
                </div>
              </div>
              
              <div className="pt-2">
                <Button
                  onClick={applyCustomTheme}
                  className="w-full"
                >
                  Aplicar Tema Personalizado
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 pt-4 border-t">
          <h3 className="font-medium mb-3">Pré-visualização</h3>
          
          <div 
            className="p-4 rounded-lg border"
            style={{ 
              backgroundColor: customTheme.secondaryColor,
              color: customTheme.primaryColor,
            }}
          >
            <h4 
              className="text-xl mb-2"
              style={{ fontFamily: customTheme.fontPrimary }}
            >
              Título do Restaurante
            </h4>
            <p
              style={{ fontFamily: customTheme.fontSecondary }}
            >
              Este é um exemplo de como o tema aplicado ficará em seu site.
            </p>
            <div className="mt-4">
              <Button
                style={{ 
                  backgroundColor: customTheme.primaryColor,
                  color: customTheme.secondaryColor,
                }}
              >
                Botão de Exemplo
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemeCustomizer;
