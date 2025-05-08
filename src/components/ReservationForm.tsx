
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { addReservation, getAvailableTables } from "@/data/mockData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const formSchema = z.object({
  name: z.string().min(3, "Nome é obrigatório (mínimo 3 caracteres)"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(8, "Telefone inválido"),
  date: z.string().refine(val => {
    const selectedDate = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  }, { message: "Data deve ser hoje ou futura" }),
  time: z.string().min(1, "Horário é obrigatório"),
  tables: z.number().min(1, "Selecione pelo menos 1 mesa"),
  adults: z.number().min(1, "Selecione pelo menos 1 adulto"),
  children: z.number().min(0, "Valor inválido"),
  comments: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ReservationForm = () => {
  const { toast } = useToast();
  const [availableTables, setAvailableTables] = useState<number | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: format(new Date(), "yyyy-MM-dd"),
      time: "",
      tables: 1,
      adults: 2,
      children: 0,
      comments: "",
    },
  });
  
  const watchDate = form.watch("date");
  const watchTime = form.watch("time");
  
  // Atualiza as mesas disponíveis quando a data ou hora mudam
  const checkAvailability = () => {
    if (watchDate && watchTime) {
      const available = getAvailableTables(watchDate, watchTime);
      setAvailableTables(available);
      
      // Se o número de mesas selecionadas for maior que o disponível, atualiza
      if (form.getValues("tables") > available) {
        form.setValue("tables", available);
      }
    }
  };
  
  const onSubmit = (values: FormValues) => {
    try {
      // Fix the type issue by ensuring all required fields are provided
      const reservationData = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        date: values.date,
        time: values.time,
        tables: values.tables,
        adults: values.adults,
        children: values.children,
        comments: values.comments || ""
      };
      
      // Adicionando a reserva aos dados mockados
      const newReservation = addReservation(reservationData);
      
      toast({
        title: "Reserva solicitada com sucesso!",
        description: `Recebemos seu pedido de reserva para ${format(new Date(values.date), "dd 'de' MMMM", { locale: ptBR })} às ${values.time}.`,
      });
      
      // Resetar formulário
      form.reset();
      setAvailableTables(null);
      
    } catch (error) {
      toast({
        title: "Erro ao fazer reserva",
        description: "Ocorreu um erro ao processar sua solicitação. Tente novamente.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Faça sua Reserva</CardTitle>
        <CardDescription>Preencha o formulário para reservar sua mesa</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="seu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="(00) 00000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} onChange={(e) => {
                        field.onChange(e);
                        setTimeout(checkAvailability, 100);
                      }} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hora</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} onChange={(e) => {
                        field.onChange(e);
                        setTimeout(checkAvailability, 100);
                      }} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {availableTables !== null && (
              <div className="bg-muted p-3 rounded-md text-sm">
                <p className="font-medium">
                  {availableTables > 0 
                    ? `${availableTables} ${availableTables === 1 ? 'mesa disponível' : 'mesas disponíveis'}`
                    : 'Sem mesas disponíveis neste horário'}
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="tables"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mesas</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        min={1}
                        max={availableTables || 10}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="adults"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adultos</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        min={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="children"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Crianças</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        min={0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="comments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comentários adicionais</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Observações, restrições alimentares, etc..."
                      {...field} 
                      className="resize-none"
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <CardFooter className="px-0 pt-4 flex justify-end">
              <Button 
                type="submit" 
                disabled={availableTables === 0 || form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Enviando..." : "Enviar Reserva"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ReservationForm;
