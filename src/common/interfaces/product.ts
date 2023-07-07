export interface IProduct {
  idMeal: string;
  strMeal: string;
  category: string;
  strMealThumb: string;
  price: number;
}

export interface IProductCart {
  idMeal: string;
  price: number;
  priceTotal: number;
  quantity: number;
  strMeal: string;
  category: string;
}

export interface ICart {
  products: IProductCart[];
}
