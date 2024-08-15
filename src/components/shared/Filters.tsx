"use client";

import { useFilterIngredients } from "@/hooks/useFilterIngredients";
import { Input } from "../ui";
import CheckboxFiltersGroup from "./CheckboxFiltersGroup";
import { RangeSlider } from "./RangeSlider";
import { Title } from "./Title";
import React from "react";
import { useSet } from "react-use";
import qs from "qs";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
	className?: string;
}

interface PriceProps {
	priceFrom: number;
	priceTo: number;
}

export interface queryFilters extends PriceProps {
	sizes: string;
	pizzaTypes: string;
	ingredients: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
	const searchParams = useSearchParams() as unknown as Map<keyof queryFilters, string>;
	const router = useRouter();
	const { ingredients, loading, onAddId, selectedIngredients } = useFilterIngredients();
	
	const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(new Set<string>(searchParams.get("pizzaTypes") ? searchParams.get("pizzaTypes")?.split(",") : []));

	const [sizes, { toggle: toggleSize }] = useSet(
		new Set<string>(searchParams.get("sizes") ? searchParams.get("sizes")?.split(",") : [])
	);

	const [{ priceFrom, priceTo }, setPrice] = React.useState<PriceProps>({
		priceFrom: Number(searchParams.get("priceFrom")) || 0,
		priceTo: Number(searchParams.get("priceTo")) || 1000,
	});

	const items = ingredients.map(({ id, name }) => ({ text: name, value: String(id) }));

	const onChangePriceRange = (rangeName: "priceFrom" | "priceTo", value: number) => {
		setPrice((prev) => ({ ...prev, [rangeName]: value }));
	};

	React.useEffect(() => {
		const filters = {
			priceFrom: priceFrom === 0 ? undefined : priceFrom,
			priceTo: priceTo === 1000 ? undefined : priceTo,
			sizes: Array.from(sizes),
			ingredients: Array.from(selectedIngredients),
			pizzaTypes: Array.from(pizzaTypes),
		};

		const query = qs.stringify(filters, {
			arrayFormat: "comma",
		});

		router.push(`?${query}`, { scroll: false });
	}, [priceFrom, priceTo, sizes, selectedIngredients, pizzaTypes, router]);

	return (
		<div className={className}>
			<Title
				text="Фильтрация"
				size="sm"
				className="mb-5 font-bold"
			/>
			<div className="flex flex-col gap-4">
				{/* Type of dough */}
				<CheckboxFiltersGroup
					name="pizzaTypes"
					className="mb-5"
					title="Тип теста"
					onClickCheckbox={togglePizzaTypes}
					selectedValues={pizzaTypes}
					items={[
						{ text: "Традиционное", value: "1" },
						{ text: "Тонкое", value: "2" },
					]}
				/>

				{/* Sizes */}
				<CheckboxFiltersGroup
					name="sizes"
					className="mb-5"
					title="Размеры"
					onClickCheckbox={toggleSize}
					selectedValues={sizes}
					items={[
						{ text: "20 см", value: "20" },
						{ text: "30 см", value: "30" },
						{ text: "40 см", value: "40" },
					]}
				/>
			</div>
			{/* Price range */}
			<div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
				<p className="font-bold mb-3">Цена от и до:</p>
				<div className="flex gap-3 mb-5">
					<Input
						type="number"
						placeholder="0"
						min={0}
						max={1000}
						value={String(priceFrom)}
						onChange={(e) => onChangePriceRange("priceFrom", Number(e.target.value))}
					/>
					<Input
						type="number"
						placeholder="1000"
						min={100}
						max={1000}
						value={String(priceTo)}
						onChange={(e) => onChangePriceRange("priceTo", Number(e.target.value))}
					/>
				</div>
				<RangeSlider
					min={0}
					max={1000}
					step={10}
					value={[priceFrom, priceTo]}
					onValueChange={([from, to]) => setPrice({ priceFrom: from, priceTo: to })}
				/>
			</div>
			{/* Ingredients */}
			<CheckboxFiltersGroup
				title="Ингредиенты"
				className={"mt-5"}
				limit={6}
				defaultItems={items.slice(0, 6)}
				items={items}
				loading={loading}
				onClickCheckbox={onAddId}
				selectedValues={selectedIngredients}
				name="ingredients"
			/>
		</div>
	);
};
