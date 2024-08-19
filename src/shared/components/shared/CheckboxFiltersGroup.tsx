"use client";
import React from "react";
import { FilterCheckbox, FilterCheckboxProps } from "./FilterCheckbox";
import { Input, Skeleton } from "../ui";

type Item = FilterCheckboxProps;

interface Props {
	title: string;
	items: Item[];
	defaultItems?: Item[];
	limit?: number;
	loading?: boolean;
	searchInputPlaceholder?: string;
	className?: string;
	onClickCheckbox?: (id: string) => void;
	defaultValue?: string[];
	selectedValues?: Set<string>;
	name?: string;
}

const CheckboxFiltersGroup: React.FC<Props> = ({
	title,
	items,
	defaultItems,
	limit = 6,
	loading,
	searchInputPlaceholder = "Поиск...",
	className,
	onClickCheckbox,
	defaultValue,
	selectedValues,
	name,
}) => {
	const [showAll, setShowAll] = React.useState(false);
	const [searchValue, setSearchValue] = React.useState("");

	const list = showAll
		? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase()))
		: (defaultItems || items).slice(0, limit);

	const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	if (loading) {
		return (
			<div className={className}>
				<p className="font-bold mb-3">{title}</p>

				{Array.from({ length: limit }).map((_, index) => {
					return (
						<Skeleton
							key={index}
							className="h-6 mb-4 rounded-[8px]"
						/>
					);
				})}

				<Skeleton className="w-28 h-6 mb-4 rounded-[8px]" />
			</div>
		);
	}

	return (
		<div className={className}>
			<p className="font-bold mb-3">{title}</p>

			{showAll && (
				<div className="mb-5">
					<Input
						placeholder={searchInputPlaceholder}
						className="bg-gray-50 border-none"
						onChange={onChangeSearchInput}
					/>
				</div>
			)}

			<div className="flex flex-col max-h-96 pr-2 overflow-auto scrollbar gap-4">
				{list.map((item, index) => (
					<FilterCheckbox
						key={index}
						text={item.text}
						value={item.value}
						endAdornment={item.endAdornment}
						checked={selectedValues?.has(item.value)}
						onCheckedChange={() => onClickCheckbox?.(item.value)}
						name={name}
					/>
				))}
			</div>

			{items.length > limit && (
				<div className={showAll ? "border-t border-t-neutral-100 mt-4" : "mt-4"}>
					<button
						onClick={() => setShowAll(!showAll)}
						className="text-primary mt-13"
					>
						{showAll ? "Скрыть" : "+ Показать все"}
					</button>
				</div>
			)}
		</div>
	);
};

export default CheckboxFiltersGroup;
