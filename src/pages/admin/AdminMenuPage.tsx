
import AdminMenuManager from "@/components/AdminMenuManager";
import AdminLayout from "./AdminLayout";

const AdminMenuPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gerenciar Menu</h1>
          <p className="text-muted-foreground">
            Adicione, edite ou remova itens do cardápio e defina o Menu do Dia.
          </p>
        </div>
        
        <AdminMenuManager />
      </div>
    </AdminLayout>
  );
};

export default AdminMenuPage;
