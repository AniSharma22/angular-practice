export type product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
    creationAt: string;
    updatedAt: string;
  };
  images: string[];
  creationAt: string;
  updatedAt: string;
};

export type item = {
  title: string;
  price: number;
  description: string;
  categoryId?: number;
  images?: string[];
};

export enum Role {
  user,
  admin,
}
