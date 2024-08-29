import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";

/**
 * Calculates the total price of a pizza, taking into account the selected pizza type, size, and ingredients.
 *
 * @param {ProductItem[]} items - an array of pizza items with their prices and details
 * @param {PizzaType} type - the selected pizza type
 * @param {PizzaSize} size - the selected pizza size
 * @param {Ingredient[]} ingredients - an array of ingredients with their prices
 * @param {Set<number>} selectedIngredients - a set of selected ingredient ids
 * @return {number} the total price of the pizza
 */
export const calcTotalPizzaPrice = (
	items: ProductItem[],
	type: PizzaType,
	size: PizzaSize,
	ingredients: Ingredient[],
	selectedIngredients: Set<number>
) => {
	const pizzaPrice =
		items.find((item) => item.pizzaType === type && item.size === size)?.price || 0;
	const totalIngredientsPrice = ingredients
		.filter((ingredient) => selectedIngredients.has(ingredient.id))
		.reduce((acc, ingredient) => acc + ingredient.price, 0);
	const totalPrice = pizzaPrice + totalIngredientsPrice;

	return totalPrice;
};
