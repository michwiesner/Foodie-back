export interface ICart {
  products: {
    idMeal: string;
    price: number;
    priceTotal: number;
    quantity: number;
    strMeal: string;
  }[];
  total: number;
}
