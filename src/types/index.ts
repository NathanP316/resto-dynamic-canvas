
export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isSpecial: boolean;
  available: boolean;
  allergens?: string[];
};

export type MenuOfTheDay = {
  id: string;
  date: string;
  validUntil: string;
  items: MenuItem[];
};

export type Reservation = {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  tables: number;
  adults: number;
  children: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  comments?: string;
};

export type RestaurantSettings = {
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  address: string;
  totalCapacity: number;
  tablesCount: number;
  openingHours: {
    [key: string]: { // day of the week
      open: string;
      close: string;
    };
  };
};
