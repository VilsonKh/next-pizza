'use client'

import { ProductWithRelations } from "@/app/@types/prisma";
import { useCartStore } from "@/shared/store/cart";
import React from "react";
import toast from "react-hot-toast";
import { ChoosePizzaForm } from "./ChoosePizzaForm";
import ChooseProductForm from "./ChooseProductForm";

interface Props {
	product: ProductWithRelations;
  onNavigationBack?: VoidFunction;
}

export const ChooseItemForm: React.FC<Props> = ({ product, onNavigationBack }) => {
	const firstItem = product.items[0];
	const isPizzaForm = Boolean(product.items[0].pizzaType);
	const [addCartItem, loading] = useCartStore((state) => [state.addCartItem, state.loading]);

	const handleAddToCart = async (item: { productItemId: number; ingredients?: number[] }) => {
		try {
			await addCartItem(item);
			toast.success(`${product.name} добавлен в корзину`);
      onNavigationBack?.();
		} catch (error) {
			toast.error(`Не удалось добавить ${product.name}`);
			console.error(error);
		}
	};

	const onAddProduct = () => {
		handleAddToCart({ productItemId: firstItem.id });
	};

	const onAddPizza = (productItemId: number, ingredients: number[]) => {
		handleAddToCart({ productItemId, ingredients });
	};

	if (isPizzaForm) {
		return (
			<ChoosePizzaForm
				imageUrl={product.imageUrl}
				name={product.name}
				ingredients={product.ingredients}
				items={product.items}
				onSubmit={onAddPizza}
				loading={loading}
			/>
		);
	} else {
		return (
			<ChooseProductForm
				imageUrl={product.imageUrl}
				name={product.name}
				onSubmit={onAddProduct}
				price={firstItem.price}
				loading={loading}
			/>
		);
	}
};
