import { create } from "zustand";
import { Api } from "../services/api-client";
import { CartStateItem, getCartDetails } from "../lib/getCartDetails";
import { CreateCartItemValues } from "../services/dto/cart.dto";

export interface CartState {
	loading: boolean;
	error: boolean;
	totalAmount: number;
	items: CartStateItem[];

	// Получение товаров из корзины
	fetchCartItems: () => Promise<void>;
	// Запрос на обновление количества товара
	updateItemQuantity: (id: number, quantity: number) => Promise<void>;
	// Запрос на добавление в корзину
	// TODO: Типизировать any
	addCartItem: (values: any) => Promise<void>;
	// Запрос на удаление из корзины
	removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
	items: [],
	error: false,
	loading: true,
	totalAmount: 0,
	fetchCartItems: async () => {
		try {
			set({ loading: true, error: false });
			const data = await Api.cart.getCart();
			set(getCartDetails(data));
		} catch (error) {
			console.error(error);
			set({ error: true });
		} finally {
			set({ loading: false });
		}
	},
	removeCartItem: async (id: number) => {
		try {
			set((state) => ({
				loading: true,
				error: false,
				items: state.items.map((item) =>
					item.id === id ? { ...item, disabled: true } : item
				),
			}));
			const data = await Api.cart.deleteCartItem(id);
			set(getCartDetails(data));
		} catch (error) {
			console.error(error);
			set({ error: true });
		} finally {
			set((state) => ({
				items: state.items.map((item) => ({ ...item, disabled: false })),
				loading: false,
			}));
		}
	},
	updateItemQuantity: async (id: number, quantity: number) => {
		try {
			set({ loading: true, error: false });
			const data = await Api.cart.updateItemQuantity(id, quantity);
			set(getCartDetails(data));
		} catch (error) {
			console.error(error);
			set({ error: true });
		} finally {
			set({ loading: false });
		}
	},
	addCartItem: async (values: CreateCartItemValues) => {
		console.log("addCartItem", values);
		try {
			set({ loading: true, error: false });
			const data = await Api.cart.addCartItem(values);
			set(getCartDetails(data));
		} catch (error) {
			console.error(error);
			set({ error: true });
		} finally {
			set({ loading: false });
		}
	},
}));
