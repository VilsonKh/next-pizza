"use client";

import { useFetchIngredients } from "@/shared/hooks/useFetchIngredients";
import { Input } from "../ui";
import CheckboxFiltersGroup from "./CheckboxFiltersGroup";
import { RangeSlider } from "./RangeSlider";
import { Title } from "./Title";
import React from "react";
import { useFilters } from "@/shared/hooks/useFilters";
import { usePushParams } from "@/shared/hooks/usePushParams";

interface Props {
	className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
	const { ingredients, loading } = useFetchIngredients();

	const filters = useFilters();

	usePushParams(filters);

	const items = ingredients.map(({ id, name }) => ({ text: name, value: String(id) }));

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
					onClickCheckbox={filters.setPizzaTypes}
					selectedValues={filters.pizzaTypes}
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
					onClickCheckbox={filters.setSizes}
					selectedValues={filters.sizes}
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
						value={String(filters.priceFrom)}
						onChange={(e) => filters.setPrices("priceFrom", Number(e.target.value))}
					/>
					<Input
						type="number"
						placeholder="1000"
						min={100}
						max={1000}
						value={String(filters.priceTo)}
						onChange={(e) => filters.setPrices("priceTo", Number(e.target.value))}
					/>
				</div>
				{/* TODO добавить trottleLock */}
				<RangeSlider
					min={0}
					max={1000}
					step={10}
					value={[filters.priceFrom, filters.priceTo]}
					onValueChange={([from, to]) =>
						filters.setPricesRange({ priceFrom: from, priceTo: to })
					}
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
				onClickCheckbox={filters.setIngredients}
				selectedValues={filters.selectedIngredients}
				name="ingredients"
			/>
		</div>
	);
};
