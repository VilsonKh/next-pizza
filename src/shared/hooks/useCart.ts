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
}

export const useCart = (): ReturnProps => {
	const cartState = useCartStore(
		(state) => state
	);


  React.useEffect(() => {
		cartState.fetchCartItems();
	}, []);

  return cartState
}