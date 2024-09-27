import React from "react";
import { WhiteBlock } from "../WhiteBlock";
import { CheckoutCartItem } from "./CheckoutCartItem";
import { getCartItemsDetails } from "@/shared/lib/getCartItemsDetails";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { CartStateItem } from "@/shared/lib/getCartDetails";
import { CheckoutItemSkeleton } from "./CheckoutItemSkeleton";

interface Props {
	className?: string;
	items: CartStateItem[];
	onClickCountButton: (id: number, quantity: number, type: "plus" | "minus") => void;
	removeCartItem: (id: number) => void;
	loading?: boolean;
}

export const CheckoutCart: React.FC<Props> = ({
	className,
	items,
	onClickCountButton,
	removeCartItem,
	loading,
}) => {
	return (
		<WhiteBlock title="1. Корзина">
			<div className="flex flex-col gap-5">
				{loading
					? [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />)
					: items.map((item) => (
							<CheckoutCartItem
								key={item.id}
								id={item.id}
								imageUrl={item.imageUrl}
								details={getCartItemsDetails(
									item.ingredients,
									item.type as PizzaType,
									item.pizzaSize as PizzaSize
								)}
								name={item.name}
								price={item.price}
								quantity={item.quantity}
								disabled={item.disabled}
								onClickCountButton={(type) =>
									onClickCountButton(item.id, item.quantity, type)
								}
								onClickRemove={() => removeCartItem(item.id)}
							/>
					  ))}
			</div>
		</WhiteBlock>
	);
};
