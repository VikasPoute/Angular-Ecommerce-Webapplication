export interface SignUp {
  name: string;
  email: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface AddProduct {
  productId: any;
  name: string;
  price: number;
  color: string;
  category: string;
  image: string;
  description: string;
  id: number;
  quantity: undefined | number;
}
export interface Cart {
  name: string;
  price: number;
  color: string;
  category: string;
  image: string;
  description: string;
  id: number | undefined;
  quantity: undefined | number;
  userId: number;
  productId: number;
}

export interface priceSummary {
  price: number;
  discount: number;
  tax: number;
  delivery: number;
  total: number;
}

export interface order {
  email: string;
  address: string;
  contact: string;
  totalPrice: number;
  userId: string;
  id: number | undefined;
}
export class ResetForm {
  name: string | undefined;
  price: number | undefined;
  color: string | undefined;
  category: string | undefined;
  image: string | undefined;
  decription: string | undefined;
}
