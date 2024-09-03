import { CartDTO } from "../services/dto/cart.dto";
import { calcCartItemTotalPrice } from "./calcCartItemTotalPrice";

export type CartStateItem = {
	id: number;
	quantity: number;
	name: string;
	imageUrl: string;
	price: number;
	pizzaSize?: number | null;
  type?: number | null;
	ingredients: Array<{ name: string; price: number }>;
  disabled?: boolean;
};

interface ReturnProps { 
  items: CartStateItem[],
  totalAmount: number,
}

export const getCartDetails = (data: CartDTO): ReturnProps => {

  const items = data.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productItem.product.name,
    imageUrl: item.productItem.product.imageUrl,
    disabled: false,
    price: calcCartItemTotalPrice(item),
    pizzaSize: item.productItem.size,
    type: item.productItem.pizzaType,
    ingredients: item.ingredients.map((ingredient) => ({
      name: ingredient.name,
      price: ingredient.price
    }))
  })) as CartStateItem[]

  return {
    items,
    totalAmount: data.totalAmount
  }
}