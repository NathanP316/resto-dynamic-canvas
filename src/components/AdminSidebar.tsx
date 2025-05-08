
import { Button } from "@/components/ui/button";
import { Calendar, Home, Menu, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const AdminSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const sidebarItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <Home size={20} />,
    },
    {
      name: "Menu",
      path: "/admin/menu",
      icon: <Menu size={20} />,
    },
    {
      name: "Reservas",
      path: "/admin/reservas",
      icon: <Calendar size={20} />,
    },
    {
      name: "Configurações",
      path: "/admin/configuracoes",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <div className="w-64 bg-sidebar text-sidebar-foreground flex flex-col h-screen sticky top-0 border-r border-sidebar-border">
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="text-xl font-semibold">Admin Panel</h2>
        <p className="text-sm text-sidebar-foreground/70">Bella Cucina</p>
      </div>
      
      <div className="flex-1 py-6 flex flex-col">
        <nav className="space-y-1 px-3">
          {sidebarItems.map(item => (
            <Button
              key={item.path}
              variant="ghost"
              asChild
              className={cn(
                "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                currentPath === item.path && "bg-sidebar-accent text-sidebar-accent-foreground"
              )}
            >
              <Link to={item.path} className="flex items-center gap-3 px-3 py-2">
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </Button>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-sidebar-border">
        <Button variant="outline" className="w-full" asChild>
          <Link to="/">Ver Site</Link>
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
