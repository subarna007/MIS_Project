export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  category: 'Running' | 'Basketball' | 'Lifestyle' | 'Training';
  images: string[];
  sizes: number[];
  colors: string[];
  rating: number;
  reviews: number;
  featured?: boolean;
  newArrival?: boolean;
  sale?: boolean;
  discountPrice?: number;
}

export interface CartItem extends Product {
  selectedSize: number;
  selectedColor: string;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: 'card' | 'cod';
}
