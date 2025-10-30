export interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category: {
    _id: string;
    name: string;
  };
  image: string;
  createdAt: string;
  updatedAt: string;
}
