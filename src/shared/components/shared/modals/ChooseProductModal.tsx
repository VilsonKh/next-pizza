"use client";

import { Dialog } from "@/shared/components/ui";
import { DialogContent } from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import ChooseProductForm from "../ChooseProductForm";
import { ProductWithRelations } from "@/app/@types/prisma";
import { ChoosePizzaForm } from "../ChoosePizzaForm";
import { useCartStore } from "@/shared/store/cart";
import toast from "react-hot-toast";

interface Props {
	className?: string;
	product: ProductWithRelations;
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
	const router = useRouter();
	const firstItem = product.items[0];
	const isPizzaForm = Boolean(product.items[0].pizzaType);
	const [addCartItem, loading] = useCartStore((state) => [state.addCartItem, state.loading]);

	const handleAddToCart = async (item: { productItemId: number; ingredients?: number[] }) => {
		try {
			await addCartItem(item);
			toast.success(`${product.name} добавлен в корзину`);
			router.back();
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

	return (
		<Dialog
			open={Boolean(product)}
			onOpenChange={() => router.back()}
		>
			<DialogContent
				className={cn(
					"p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
					className
				)}
			>
				{isPizzaForm ? (
					<ChoosePizzaForm
						imageUrl={product.imageUrl}
						name={product.name}
						ingredients={product.ingredients}
						items={product.items}
						onSubmit={onAddPizza}
						loading={loading}
					/>
				) : (
					<ChooseProductForm
						imageUrl={product.imageUrl}
						name={product.name}
						onSubmit={onAddProduct}
						price={firstItem.price}
						loading={loading}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
};
