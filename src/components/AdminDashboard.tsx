
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockMenuItems, mockReservations, mockRestaurantSettings } from "@/data/mockData";
import { BarChart, Calendar, Check, Users, Utensils } from "lucide-react";

const AdminDashboard = () => {
  // Dados resumidos
  const totalReservations = mockReservations.length;
  const pendingReservations = mockReservations.filter(r => r.status === 'pending').length;
  const confirmedReservations = mockReservations.filter(r => r.status === 'confirmed').length;
  const menuItems = mockMenuItems.length;
  const specialItems = mockMenuItems.filter(item => item.isSpecial).length;
  const availableItems = mockMenuItems.filter(item => item.available).length;
  
  // Calculando a capacidade ocupada para hoje
  const today = new Date().toISOString().split('T')[0];
  const reservationsToday = mockReservations.filter(
    r => r.date === today && ['pending', 'confirmed'].includes(r.status)
  );
  
  const seatsOccupiedToday = reservationsToday.reduce(
    (total, reservation) => total + reservation.adults + reservation.children,
    0
  );
  
  const occupancyRate = Math.round((seatsOccupiedToday / mockRestaurantSettings.totalCapacity) * 100);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card de Reservas */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium">Reservas</CardTitle>
              <CardDescription>Total de reservas</CardDescription>
            </div>
            <Calendar className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReservations}</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="text-primary">{pendingReservations}</span> pendentes, 
              <span className="text-green-500"> {confirmedReservations}</span> confirmadas
            </div>
          </CardContent>
        </Card>
        
        {/* Card de Capacidade */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium">Ocupação</CardTitle>
              <CardDescription>Vagas preenchidas hoje</CardDescription>
            </div>
            <Users className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{occupancyRate}%</div>
            <div className="text-xs text-muted-foreground mt-1">
              {seatsOccupiedToday} de {mockRestaurantSettings.totalCapacity} lugares
            </div>
            <div className="w-full bg-muted h-2 rounded-full mt-2">
              <div 
                className="bg-primary h-2 rounded-full" 
                style={{ width: `${occupancyRate}%` }}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Card de Menu */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium">Menu</CardTitle>
              <CardDescription>Itens no cardápio</CardDescription>
            </div>
            <Utensils className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{menuItems}</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="text-primary">{specialItems}</span> especiais, 
              <span className="text-green-500"> {availableItems}</span> disponíveis
            </div>
          </CardContent>
        </Card>
        
        {/* Card de Desempenho */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium">Desempenho</CardTitle>
              <CardDescription>Reservas esta semana</CardDescription>
            </div>
            <BarChart className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12%</div>
            <div className="text-xs text-green-500 mt-1">
              <Check className="w-3 h-3 inline" /> Acima da semana anterior
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Atividade Recente */}
        <Card>
          <CardHeader>
            <CardTitle>Reservas Recentes</CardTitle>
            <CardDescription>Últimas reservas recebidas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockReservations.slice(0, 5).map((reservation) => (
                <div key={reservation.id} className="flex justify-between items-center border-b pb-3">
                  <div>
                    <p className="font-medium">{reservation.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {reservation.date} - {reservation.time}
                    </p>
                  </div>
                  <div className="flex space-x-1">
                    <span className="text-sm">{reservation.adults + reservation.children} pessoas</span>
                    <span 
                      className={`inline-block w-2 h-2 rounded-full self-center ${
                        reservation.status === 'confirmed' 
                          ? 'bg-green-500' 
                          : reservation.status === 'pending' 
                          ? 'bg-yellow-500' 
                          : 'bg-red-500'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Estatísticas */}
        <Card>
          <CardHeader>
            <CardTitle>Estatísticas do Menu</CardTitle>
            <CardDescription>Categorias mais populares</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Exemplo simples de gráfico de barras */}
            <div className="space-y-4">
              {Array.from(new Set(mockMenuItems.map(item => item.category))).map((category) => {
                const count = mockMenuItems.filter(item => item.category === category).length;
                const percentage = Math.round((count / mockMenuItems.length) * 100);
                
                return (
                  <div key={category} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{category}</span>
                      <span className="text-sm text-muted-foreground">{count} itens</span>
                    </div>
                    <div className="w-full bg-muted h-2 rounded-full">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
