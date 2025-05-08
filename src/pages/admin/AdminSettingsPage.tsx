
import ThemeCustomizer from "@/components/ThemeCustomizer";
import AdminLayout from "./AdminLayout";

const AdminSettingsPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
          <p className="text-muted-foreground">
            Personalize a aparência do sistema e configure preferências do restaurante.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <ThemeCustomizer />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettingsPage;
