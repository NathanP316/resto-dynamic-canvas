
import AdminReservationManager from "@/components/AdminReservationManager";
import AdminLayout from "./AdminLayout";

const AdminReservationsPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reservas</h1>
          <p className="text-muted-foreground">
            Gerencie reservas, confirme solicitações e visualize a agenda de reservas.
          </p>
        </div>
        
        <AdminReservationManager />
      </div>
    </AdminLayout>
  );
};

export default AdminReservationsPage;
