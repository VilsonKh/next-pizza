import React from "react";
import { useCartStore } from "../store/cart";
import { CreateCartItemValues } from "../services/dto/cart.dto";
import { CartStateItem } from "../lib/getCartDetails";

type ReturnProps = {
	totalAmount: number;
	items: CartStateItem[];
	loading: boolean;
	updateItemQuantity: (id: number, quantity: number) => void;
	removeCartItem: (id: number) => void;
	addCartItem: (values: CreateCartItemValues) => void;
	onClickCountButton: (id: number, quantity: number, type: "plus" | "minus") => void;
	initialLoading: boolean;
};

export const useCart = (): ReturnProps => {
	const cartState = useCartStore((state) => state);

	const [initialLoading, setInitialLoading] = React.useState<boolean>(true);


	React.useEffect(() => {
		const loadingInitialData = async () => {
			await cartState.fetchCartItems();
			setInitialLoading(false)
		}

		loadingInitialData();
	}, []);

	return {initialLoading, ...cartState};
};
