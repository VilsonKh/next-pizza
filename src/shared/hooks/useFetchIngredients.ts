import type { Ingredient } from "@prisma/client";
import React from "react";
import { Api } from "../services/api-client";


type IngredientItem = Pick<Ingredient, "id" | "name">;

export const useFetchIngredients = () => {

  const [ingredients, setIngredients] = React.useState<IngredientItem[]>([]);
	const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
		async function getIngredients() {
			try {
				setLoading(true);
				const ingredients = await Api.ingredients.getAll();
				setIngredients(ingredients.map(({ id, name }) => ({ id, name })));
			} catch (e) {
				console.log(e);
			} finally {
				setLoading(false);
			}
		}

		getIngredients();
	}, []);

  return { ingredients, loading };

}