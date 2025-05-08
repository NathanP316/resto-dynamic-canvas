
import { useState } from "react";
import AdminLayout from "./AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, UserPlus } from "lucide-react";

// Mock client data
const mockClients = [
  { id: "1", name: "João Silva", email: "joao@exemplo.com", phone: "(11) 99999-8888", visits: 8, lastVisit: "2025-04-28" },
  { id: "2", name: "Maria Santos", email: "maria@exemplo.com", phone: "(11) 97777-6666", visits: 5, lastVisit: "2025-05-01" },
  { id: "3", name: "Pedro Alves", email: "pedro@exemplo.com", phone: "(11) 96666-5555", visits: 12, lastVisit: "2025-05-05" },
  { id: "4", name: "Ana Pereira", email: "ana@exemplo.com", phone: "(11) 95555-4444", visits: 3, lastVisit: "2025-04-15" },
  { id: "5", name: "Carlos Mendes", email: "carlos@exemplo.com", phone: "(11) 94444-3333", visits: 7, lastVisit: "2025-05-07" },
];

const AdminClientsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState(mockClients);
  
  const filteredClients = clients.filter(
    (client) => 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
          <p className="text-muted-foreground">
            Gerencie os clientes do seu restaurante
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar clientes..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="ml-2">
            <UserPlus className="mr-2 h-4 w-4" />
            Novo Cliente
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Lista de Clientes</CardTitle>
            <CardDescription>
              Total: {clients.length} clientes registrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-2 font-medium">Nome</th>
                    <th className="text-left py-4 px-2 font-medium">Email</th>
                    <th className="text-left py-4 px-2 font-medium">Telefone</th>
                    <th className="text-center py-4 px-2 font-medium">Visitas</th>
                    <th className="text-left py-4 px-2 font-medium">Última Visita</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((client) => (
                    <tr key={client.id} className="border-b hover:bg-muted/50 cursor-pointer">
                      <td className="py-3 px-2">{client.name}</td>
                      <td className="py-3 px-2">{client.email}</td>
                      <td className="py-3 px-2">{client.phone}</td>
                      <td className="py-3 px-2 text-center">{client.visits}</td>
                      <td className="py-3 px-2">
                        {new Date(client.lastVisit).toLocaleDateString('pt-BR')}
                      </td>
                    </tr>
                  ))}
                  {filteredClients.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-muted-foreground">
                        Nenhum cliente encontrado
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminClientsPage;
