
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { mockMenuItems } from "@/data/mockData";
import { MenuItem } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Euro, Image, Pencil, Plus, Trash2, Upload } from "lucide-react";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const menuItemSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  description: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
  price: z.number().min(0.01, "Preço deve ser maior que zero"),
  category: z.string().min(1, "Selecione uma categoria"),
  image: z.string().url("Insira uma URL válida"),
  isSpecial: z.boolean(),
  available: z.boolean(),
  allergens: z.string().optional(),
});

type FormValues = z.infer<typeof menuItemSchema>;

const AdminMenuManager = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<MenuItem[]>(mockMenuItems);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      image: "",
      isSpecial: false,
      available: true,
      allergens: "",
    },
  });
  
  const categories = Array.from(new Set(items.map(item => item.category)));
  
  const handleEditItem = (item: MenuItem) => {
    setEditingItemId(item.id);
    form.reset({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image,
      isSpecial: item.isSpecial,
      available: item.available,
      allergens: item.allergens ? item.allergens.join(", ") : "",
    });
  };
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    if (!file.type.match('image/jpeg|image/png|image/jpg')) {
      toast({
        title: "Formato inválido",
        description: "Por favor, selecione uma imagem no formato PNG ou JPEG/JPG.",
        variant: "destructive",
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      form.setValue("image", result);
      toast({
        title: "Imagem carregada",
        description: `${file.name} foi carregada com sucesso.`,
      });
    };
    reader.readAsDataURL(file);
  };
  
  const handleTriggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const handleAddOrUpdateItem = (values: FormValues) => {
    const allergensArray = values.allergens
      ? values.allergens.split(",").map(a => a.trim()).filter(a => a.length > 0)
      : [];
    
    if (editingItemId) {
      // Atualizar item existente
      setItems(prevItems => 
        prevItems.map(item => 
          item.id === editingItemId 
            ? {
                ...item,
                name: values.name,
                description: values.description,
                price: values.price,
                category: values.category,
                image: values.image,
                isSpecial: values.isSpecial,
                available: values.available,
                allergens: allergensArray,
              }
            : item
        )
      );
      
      toast({
        title: "Item atualizado",
        description: `${values.name} foi atualizado com sucesso.`,
      });
    } else {
      // Adicionar novo item
      const newItem: MenuItem = {
        id: `item-${items.length + 1}`,
        name: values.name,
        description: values.description,
        price: values.price,
        category: values.category,
        image: values.image,
        isSpecial: values.isSpecial,
        available: values.available,
        allergens: allergensArray,
      };
      
      setItems(prevItems => [...prevItems, newItem]);
      
      toast({
        title: "Item adicionado",
        description: `${values.name} foi adicionado ao menu.`,
      });
    }
    
    // Resetar formulário e estado de edição
    form.reset({
      name: "",
      description: "",
      price: 0,
      category: "",
      image: "",
      isSpecial: false,
      available: true,
      allergens: "",
    });
    setEditingItemId(null);
  };
  
  const handleDeleteItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
    
    if (editingItemId === id) {
      form.reset();
      setEditingItemId(null);
    }
    
    toast({
      title: "Item removido",
      description: "O item foi removido do menu.",
    });
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Menu do Restaurante</CardTitle>
            <CardDescription>
              Gerencie os itens disponíveis no cardápio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-2 font-medium">Nome</th>
                    <th className="text-left py-4 px-2 font-medium">Categoria</th>
                    <th className="text-left py-4 px-2 font-medium">Preço</th>
                    <th className="text-center py-4 px-2 font-medium">Especial</th>
                    <th className="text-center py-4 px-2 font-medium">Disponível</th>
                    <th className="text-center py-4 px-2 font-medium">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-3 px-2">{item.name}</td>
                      <td className="py-3 px-2">{item.category}</td>
                      <td className="py-3 px-2 flex items-center">
                        <Euro size={16} className="mr-1" />
                        {formatPrice(item.price)}
                      </td>
                      <td className="py-3 px-2 text-center">
                        {item.isSpecial ? <Check size={16} className="mx-auto text-primary" /> : null}
                      </td>
                      <td className="py-3 px-2 text-center">
                        {item.available ? <Check size={16} className="mx-auto text-primary" /> : null}
                      </td>
                      <td className="py-3 px-2 text-center">
                        <div className="flex justify-center space-x-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleEditItem(item)}
                          >
                            <Pencil size={16} />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDeleteItem(item.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card>
          <CardHeader>
            <CardTitle>
              {editingItemId ? "Editar Item" : "Novo Item"}
            </CardTitle>
            <CardDescription>
              {editingItemId ? "Modificar informações do item" : "Adicionar item ao menu"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddOrUpdateItem)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do prato" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Descrição do prato" 
                          {...field} 
                          className="resize-none"
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preço (€)</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <Euro size={16} className="mr-2 text-muted-foreground" />
                            <Input 
                              type="number" 
                              step="0.01" 
                              min="0" 
                              placeholder="0.00" 
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categoria</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecionar" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                            <SelectItem value="Nova Categoria">Nova Categoria</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Imagem</FormLabel>
                      <FormControl>
                        <div className="space-y-3">
                          <Input placeholder="https://..." {...field} />
                          
                          <div className="flex items-center gap-3">
                            <Button 
                              type="button" 
                              variant="outline" 
                              className="w-full"
                              onClick={handleTriggerFileInput}
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Carregar Imagem
                            </Button>
                            <input
                              ref={fileInputRef}
                              type="file"
                              className="hidden"
                              accept="image/png,image/jpeg,image/jpg"
                              onChange={handleFileUpload}
                            />
                          </div>
                          
                          {field.value && (
                            <div className="relative mt-2 h-32 bg-muted rounded-md overflow-hidden">
                              <img 
                                src={field.value} 
                                alt="Preview" 
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormDescription>
                        URL ou carregue uma imagem JPG/PNG
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="allergens"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alergênicos</FormLabel>
                      <FormControl>
                        <Input placeholder="leite, glúten, etc (separados por vírgula)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <FormField
                    control={form.control}
                    name="isSpecial"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Especial do Dia</FormLabel>
                          <FormDescription>
                            Destacar no menu do dia
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="available"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Disponível</FormLabel>
                          <FormDescription>
                            Item disponível para pedidos
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      form.reset();
                      setEditingItemId(null);
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">
                    {editingItemId ? "Atualizar" : "Adicionar"} Item
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminMenuManager;
