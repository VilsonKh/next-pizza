import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import React from "react";

interface PriceProps {
	priceFrom?: any;
	priceTo?: any;
}

interface QueryFilters extends PriceProps {
	pizzaTypes: string;
	sizes: string;
	ingredients: string;
}

export interface Filters {
	sizes: Set<string>;
	pizzaTypes: Set<string>;
	selectedIngredients: Set<string>;
	priceFrom: number;
	priceTo: number;
}

interface ReturnProps extends Filters {
	setPrices: (rangeName: keyof PriceProps, value: number) => void;
	setPizzaTypes: (value: string) => void;
	setIngredients: (value: string) => void;
	setSizes: (value: string) => void;
	setPricesRange: (value: Object) => void;
}

export const useFilters = (): ReturnProps => {
	const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

	const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
		new Set<string>(
			searchParams.get("ingredients") ? searchParams.get("ingredients")?.split(",") : []
		)
	);

	const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
		new Set<string>(
			searchParams.get("pizzaTypes") ? searchParams.get("pizzaTypes")?.split(",") : []
		)
	);

	const [sizes, { toggle: toggleSize }] = useSet(
		new Set<string>(searchParams.get("sizes") ? searchParams.get("sizes")?.split(",") : [])
	);

	const [{ priceFrom, priceTo }, setPrices] = React.useState<PriceProps>({
		priceFrom: Number(searchParams.get("priceFrom")) || 0,
		priceTo: Number(searchParams.get("priceTo")) || 1000,
	});

	const onChangePriceRange = (rangeName: "priceFrom" | "priceTo", value: number) => {
		setPrices((prev) => ({ ...prev, [rangeName]: value }));
	};

	return React.useMemo(
		() => ({
			sizes,
			pizzaTypes,
			selectedIngredients,
			priceFrom,
			priceTo,
			setPrices: onChangePriceRange,
			setPizzaTypes: togglePizzaTypes,
			setIngredients: toggleIngredients,
			setSizes: toggleSize,
			setPricesRange: setPrices,
		}),
		[sizes, pizzaTypes, selectedIngredients, priceFrom, priceTo]
	);
};
