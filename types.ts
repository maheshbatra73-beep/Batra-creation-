export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  minOrderQuantity: number;
}

export interface User {
  name: string;
  email: string;
  shopName: string;
  shopAddress?: string;
  shopImage?: string; // Base64
}

export interface ShippingDetails {
  fullName: string;
  shopName: string;
  addressLine1: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

export type PaymentMethod = 'UPI' | 'NetBanking';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  shippingDetails: ShippingDetails;
  paymentMethod: PaymentMethod;
}

export interface CartItem extends Product {
  quantity: number;
}

export type ViewState = 'HOME' | 'PRODUCTS' | 'ORDERS' | 'CONTACT' | 'AUTH' | 'SHOP_ANALYSIS' | 'CART' | 'CHECKOUT';

export interface AnalysisResult {
  recommendation: string;
  suggestedProductIds: string[];
}