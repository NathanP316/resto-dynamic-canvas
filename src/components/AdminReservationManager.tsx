
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import { mockReservations, updateReservationStatus } from "@/data/mockData";
import { Reservation } from "@/types";
import { Calendar, Check, Trash2, X } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";

const AdminReservationManager = () => {
  const { toast } = useToast();
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [filterDate, setFilterDate] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<Reservation["status"] | "all">("all");
  
  // Filtrando reservas
  const filteredReservations = reservations.filter(reservation => {
    const matchesDate = filterDate ? reservation.date === filterDate : true;
    const matchesStatus = filterStatus !== "all" ? reservation.status === filterStatus : true;
    return matchesDate && matchesStatus;
  });
  
  const handleConfirm = (id: string) => {
    updateReservationStatus(id, "confirmed");
    setReservations(prevReservations =>
      prevReservations.map(reservation =>
        reservation.id === id
          ? { ...reservation, status: "confirmed" }
          : reservation
      )
    );
    
    toast({
      title: "Reserva confirmada",
      description: "A reserva foi confirmada com sucesso.",
    });
  };
  
  const handleCancel = (id: string) => {
    updateReservationStatus(id, "cancelled");
    setReservations(prevReservations =>
      prevReservations.map(reservation =>
        reservation.id === id
          ? { ...reservation, status: "cancelled" }
          : reservation
      )
    );
    
    toast({
      title: "Reserva cancelada",
      description: "A reserva foi cancelada com sucesso.",
    });
  };
  
  const handleDelete = (id: string) => {
    setReservations(prevReservations =>
      prevReservations.filter(reservation => reservation.id !== id)
    );
    
    toast({
      title: "Reserva removida",
      description: "A reserva foi removida do sistema.",
    });
  };
  
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "dd 'de' MMMM", { locale: ptBR });
    } catch (error) {
      return dateString;
    }
  };
  
  const getStatusBadge = (status: Reservation["status"]) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmada</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pendente</Badge>;
      case "cancelled":
        return <Badge className="bg-destructive">Cancelada</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Calendar size={18} />
          Gerenciar Reservas
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Filtros */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <label htmlFor="filter-date" className="text-sm font-medium">
              Filtrar por data:
            </label>
            <input
              id="filter-date"
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <label htmlFor="filter-status" className="text-sm font-medium">
              Status:
            </label>
            <select
              id="filter-status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
            >
              <option value="all">Todos</option>
              <option value="pending">Pendentes</option>
              <option value="confirmed">Confirmadas</option>
              <option value="cancelled">Canceladas</option>
            </select>
          </div>
        </div>
        
        {/* Lista de Reservas */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2 font-medium">Cliente</th>
                <th className="text-left py-3 px-2 font-medium">Contato</th>
                <th className="text-left py-3 px-2 font-medium">Data</th>
                <th className="text-left py-3 px-2 font-medium">Hora</th>
                <th className="text-left py-3 px-2 font-medium">Pessoas</th>
                <th className="text-left py-3 px-2 font-medium">Status</th>
                <th className="text-right py-3 px-2 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.length > 0 ? (
                filteredReservations.map((reservation) => (
                  <tr key={reservation.id} className="border-b">
                    <td className="py-3 px-2">
                      <div className="font-medium">{reservation.name}</div>
                      {reservation.comments && (
                        <div className="text-xs text-muted-foreground max-w-xs line-clamp-1">
                          Obs: {reservation.comments}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-2">
                      <div>{reservation.phone}</div>
                      <div className="text-xs text-muted-foreground">{reservation.email}</div>
                    </td>
                    <td className="py-3 px-2">{formatDate(reservation.date)}</td>
                    <td className="py-3 px-2">{reservation.time}</td>
                    <td className="py-3 px-2">
                      {reservation.adults + reservation.children} 
                      {reservation.children > 0 && 
                        <span className="text-xs text-muted-foreground ml-1">
                          ({reservation.children} crianças)
                        </span>
                      }
                    </td>
                    <td className="py-3 px-2">
                      {getStatusBadge(reservation.status)}
                    </td>
                    <td className="py-3 px-2 text-right">
                      <div className="flex justify-end space-x-2">
                        {reservation.status === "pending" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 px-2 text-green-500"
                            onClick={() => handleConfirm(reservation.id)}
                          >
                            <Check size={16} className="mr-1" />
                            Confirmar
                          </Button>
                        )}
                        {reservation.status !== "cancelled" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 px-2 text-red-500"
                            onClick={() => handleCancel(reservation.id)}
                          >
                            <X size={16} className="mr-1" />
                            Cancelar
                          </Button>
                        )}
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => handleDelete(reservation.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-muted-foreground">
                    Nenhuma reserva encontrada para os filtros selecionados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminReservationManager;
