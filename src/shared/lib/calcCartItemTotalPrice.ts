import { CartItemDTO } from "../services/dto/cart.dto";

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
  const ingredientsSum = item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0)

  return (item.productItem.price + ingredientsSum) * item.quantity
}