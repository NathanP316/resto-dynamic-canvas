
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ReservationPage from "./pages/ReservationPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminMenuPage from "./pages/admin/AdminMenuPage";
import AdminReservationsPage from "./pages/admin/AdminReservationsPage";
import AdminClientsPage from "./pages/admin/AdminClientsPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/reservas" element={<ReservationPage />} />
          
          {/* Rotas Administrativas */}
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/menu" element={<AdminMenuPage />} />
          <Route path="/admin/reservas" element={<AdminReservationsPage />} />
          <Route path="/admin/clientes" element={<AdminClientsPage />} />
          <Route path="/admin/configuracoes" element={<AdminSettingsPage />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
