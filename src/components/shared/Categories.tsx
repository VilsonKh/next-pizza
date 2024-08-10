'use client'
import { cn } from "@/lib/utils";
import React from "react";
import { categories } from "./Categories.data";
import { useCategoryStore } from "../../../store/category";

interface Props {
	className?: string;
}

export const Categories: React.FC<Props> = ({ className }) => {
	const categoryActiveId = useCategoryStore((state) => state.activeId);
	return (
		<div className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}>
			{categories.map(({name, id}, index) => (
				<a
					key={index}
					href={`#${name}`}
					className={cn(
						"flex items-center font-bold h-11 rounded-2xl px-5",
						categoryActiveId === id && "bg-white shadow-md shadow-gray-200 text-primary"
					)}
				>
					<button>{name}</button>
				</a>
			))}
		</div>
	);
};
