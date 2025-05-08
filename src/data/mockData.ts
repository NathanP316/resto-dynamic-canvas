
import { MenuItem, MenuOfTheDay, Reservation, RestaurantSettings } from "../types";

export const mockMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Risoto de Funghi",
    description: "Risoto cremoso com mix de cogumelos frescos e parmesão.",
    price: 42.90,
    category: "Principais",
    image: "https://images.unsplash.com/photo-1673845529651-5d0dfde3334f?w=800&auto=format&fit=crop",
    isSpecial: true,
    available: true,
    allergens: ["leite", "glúten"],
  },
  {
    id: "2",
    name: "Filé Mignon ao Molho de Vinho",
    description: "Filé mignon grelhado ao ponto, coberto com molho de vinho tinto e ervas finas.",
    price: 68.90,
    category: "Principais",
    image: "https://images.unsplash.com/photo-1565299715199-866c917206bb?w=800&auto=format&fit=crop",
    isSpecial: true,
    available: true,
  },
  {
    id: "3",
    name: "Salada Caprese",
    description: "Mix de folhas verdes, tomate, mussarela de búfala e molho pesto.",
    price: 32.50,
    category: "Entradas",
    image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800&auto=format&fit=crop",
    isSpecial: false,
    available: true,
    allergens: ["leite"],
  },
  {
    id: "4",
    name: "Tiramisù",
    description: "Clássico italiano com biscoitos de champagne, café, queijo mascarpone e cacau.",
    price: 28.90,
    category: "Sobremesas",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&auto=format&fit=crop",
    isSpecial: false,
    available: true,
    allergens: ["leite", "ovos", "glúten"],
  },
  {
    id: "5",
    name: "Costelinha Barbecue",
    description: "Costelinha suína assada lentamente com molho barbecue da casa.",
    price: 56.90,
    category: "Principais",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop",
    isSpecial: true,
    available: true,
  },
  {
    id: "6",
    name: "Camarão na Moranga",
    description: "Camarão selado com creme de abóbora, servido em uma moranga assada.",
    price: 78.90,
    category: "Principais",
    image: "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=800&auto=format&fit=crop",
    isSpecial: true,
    available: false,
    allergens: ["crustáceos", "leite"],
  },
];

export const mockMenuOfTheDay: MenuOfTheDay = {
  id: "menu-1",
  date: new Date().toISOString(),
  validUntil: new Date(new Date().setHours(23, 59, 59, 999)).toISOString(),
  items: mockMenuItems.filter(item => item.isSpecial && item.available),
};

export const mockReservations: Reservation[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 98765-4321",
    date: "2025-05-10",
    time: "20:00",
    tables: 1,
    adults: 2,
    children: 0,
    status: "confirmed",
  },
  {
    id: "2",
    name: "Maria Pereira",
    email: "maria.p@email.com",
    phone: "(11) 91234-5678",
    date: "2025-05-10",
    time: "19:30",
    tables: 2,
    adults: 5,
    children: 1,
    status: "confirmed",
    comments: "Aniversário, favor preparar mesa decorada.",
  },
  {
    id: "3",
    name: "Carlos Santos",
    email: "carlos.s@email.com",
    phone: "(11) 99876-5432",
    date: new Date().toISOString().split('T')[0],
    time: "21:00",
    tables: 1,
    adults: 4,
    children: 0,
    status: "pending",
  },
];

export const mockRestaurantSettings: RestaurantSettings = {
  name: "Bella Cucina",
  logo: "/logo.png",
  primaryColor: "#D35400",
  secondaryColor: "#F5F5DC",
  address: "Rua das Oliveiras, 123 - Centro",
  totalCapacity: 80,
  tablesCount: 20,
  openingHours: {
    "0": { open: "18:00", close: "23:00" }, // Domingo
    "1": { open: "18:00", close: "23:00" }, // Segunda
    "2": { open: "18:00", close: "23:00" }, // Terça
    "3": { open: "18:00", close: "23:00" }, // Quarta
    "4": { open: "18:00", close: "23:00" }, // Quinta
    "5": { open: "18:00", close: "00:00" }, // Sexta
    "6": { open: "12:00", close: "00:00" }, // Sábado
  },
};

// Calculando as mesas disponíveis a partir das reservas
export const getAvailableTables = (date: string, time: string): number => {
  const filteredReservations = mockReservations.filter(
    r => r.date === date && r.time === time && r.status !== 'cancelled'
  );
  
  const reservedTables = filteredReservations.reduce(
    (total, reservation) => total + reservation.tables, 
    0
  );
  
  return mockRestaurantSettings.tablesCount - reservedTables;
};

// Função para adicionar nova reserva
export const addReservation = (reservation: Omit<Reservation, 'id' | 'status'>): Reservation => {
  const newReservation: Reservation = {
    ...reservation,
    id: `reservation-${mockReservations.length + 1}`,
    status: 'pending',
  };
  
  mockReservations.push(newReservation);
  return newReservation;
};

// Função para atualizar status da reserva
export const updateReservationStatus = (id: string, status: Reservation['status']): boolean => {
  const reservation = mockReservations.find(r => r.id === id);
  if (reservation) {
    reservation.status = status;
    return true;
  }
  return false;
};
