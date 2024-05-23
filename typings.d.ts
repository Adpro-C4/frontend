export interface CustomerDetails {
    fullname: string;
    username: string;
    userId: string | null;
    phoneNumber: string;
    email: string;
  }
  
export interface CartItem {
    id: number;
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }
  
export interface Order {
    userId: string;
    timestamp: string;
    shippingMethod: string;
    resi: string;
    customerDetails: CustomerDetails;
    address: string;
    cartItems: CartItem[];
    price: string;
    id: string;
    totalPrice: number;
  }
  
export interface OrderResponse {
    data: {
      orders: Order[];
    };
  }