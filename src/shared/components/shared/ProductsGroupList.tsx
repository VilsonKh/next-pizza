'use client';
import React from "react";
import { Title } from "./Title";
import { cn } from "@/shared/lib/utils";
import { ProductCard } from "./ProductCard";
import { useIntersection } from "react-use";
import { useCategoryStore } from "../../store/category";
import { ProductWithRelations } from "@/app/@types/prisma";

interface Props {
	title: string;
	items: ProductWithRelations[];
	className?: string;
	listClassName?: string;
	categoryId: number;
}

export const ProductsGroupList: React.FC<Props> = ({
	title,
	items,
	listClassName,
	categoryId,
	className,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId)
	const intersectionRef = React.useRef(null);
	const intersection = useIntersection(intersectionRef, {
		threshold: 0.4,
	});

	React.useEffect(() => {
		if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
		}
	}, [intersection?.isIntersecting, categoryId, setActiveCategoryId]);

	return (
		<div className={className} id={title} ref={intersectionRef}>
			<Title
				text={title}
				size="lg"
				className="font-extrabold mb-5"
			/>

			<div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
				{items.map((product, i) => (
					<ProductCard
						key={product.id}
						id={product.id}
						name={product.name}
						price={product.items[0].price}
						imageUrl={product.imageUrl}
						ingredients={product.ingredients}
					/>
				))}
			</div>
		</div>
	);
};
