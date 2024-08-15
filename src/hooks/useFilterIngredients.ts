import { Ingredient } from "@prisma/client";
import { Api } from "../../services/api-client";
import React from "react";
import { useSet } from "react-use";
import { useSearchParams } from "next/navigation";
import type { queryFilters } from "@/components/shared/Filters";

type IngredientItem = Pick<Ingredient, "id" | "name">;

interface ReturnProps {
	ingredients: IngredientItem[];
	loading: boolean;
	selectedIngredients: Set<string>;
	onAddId: (id: string) => void;
}

export const useFilterIngredients = (): ReturnProps => {
	const searchParams = useSearchParams() as unknown as Map<keyof queryFilters, string>;

	const [ingredients, setIngredients] = React.useState<IngredientItem[]>([]);
	const [loading, setLoading] = React.useState<boolean>(true);

	const [selectedIngredients, { toggle }] = use                                             Set(new Set<string>(searchParams.get("ingredients") ? searchParams.get("ingredients")?.split(",") : []));

  console.log(selectedIngredients)

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

	return { ingredients, loading, selectedIngredients, onAddId: toggle };
};
