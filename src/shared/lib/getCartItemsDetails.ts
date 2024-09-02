import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";
import { CartStateItem } from "./getCartDetails";

export const getCartItemsDetails = (
	ingredients: CartStateItem['ingredients'],
	pizzaType: PizzaType,
	pizzaSize: PizzaSize,
) => {
	const details = [];
	if (pizzaSize && pizzaType) {
		const typeName = mapPizzaType[pizzaType];
		details.push(`${typeName} ${pizzaSize} см`);
	}

	console.log("getCartItemsDetails",ingredients)

	if (ingredients) {
		details.push(...ingredients.map((ingredient) => ingredient.name));
	}
  
  return details.join(", ")
};
