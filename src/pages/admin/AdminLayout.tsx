
import { ReactNode } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-background/80 backdrop-blur-sm border-b p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Painel Administrativo</h1>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Bem-vindo, Administrador</span>
            <Button variant="outline" size="sm" asChild>
              <Link to="/">Voltar ao Site</Link>
            </Button>
          </div>
        </header>
        
        <main className="flex-1 p-6">
          {children}
        </main>
        
        <footer className="border-t py-4 px-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Bella Cucina - Painel Administrativo
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
