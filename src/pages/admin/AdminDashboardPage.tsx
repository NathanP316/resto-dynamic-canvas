
import AdminDashboard from "@/components/AdminDashboard";
import AdminLayout from "./AdminLayout";

const AdminDashboardPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral do restaurante, reservas e métricas importantes.
          </p>
        </div>
        
        <AdminDashboard />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
