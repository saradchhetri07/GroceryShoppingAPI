export interface Grocery {
  id: string;
  name: string;
  price: number;
  inventoryLevel: number;
}


export type UpdateGroceryData = Partial<Omit<Grocery, 'id'>>;