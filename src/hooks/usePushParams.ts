import React from "react";

import { useRouter } from "next/navigation";
import QueryString from "qs";
import type { Filters } from "./useFilters";

export const usePushParams = (filters: Filters) => {
	const router = useRouter();
	React.useEffect(() => {
		const params = {
			priceFrom: filters.priceFrom === 0 ? undefined : filters.priceFrom,
			priceTo: filters.priceTo === 1000 ? undefined : filters.priceTo,
			sizes: Array.from(filters.sizes),
			ingredients: Array.from(filters.selectedIngredients),
			pizzaTypes: Array.from(filters.pizzaTypes),
		};

		const query = QueryString.stringify(params, {
			arrayFormat: "comma",
		});

		router.push(`?${query}`, { scroll: false });
	}, [
		filters,
		router,
	]);
};
