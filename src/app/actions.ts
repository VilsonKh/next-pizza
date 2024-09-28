"use server";

import { prisma } from "@/prisma/prisma-client";
import { PayOrderTemplate } from "@/shared/components/shared/EmailTemplates/PayOrder";
import { TCheckoutFormValues } from "@/shared/constants/Schemas/CheckoutFormSchema";
import { sendEmail } from "@/shared/lib/SendEmail";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";

export async function createOrder(data: TCheckoutFormValues) {
	try {
		const cookieStore = cookies();
		const cartToken = cookieStore.get("cartToken")?.value;

		if (!cartToken) {
			throw new Error("Cart token not found");
		}
		//находит корзиру по токену
		const userCart = await prisma.cart.findFirst({
			include: {
				user: true,
				items: {
					include: {
						ingredients: true,
						productItem: {
							include: {
								product: true,
							},
						},
					},
				},
			},
			where: {
				token: cartToken,
			},
		});

		if (!userCart) {
			throw new Error("Cart not found");
		}

		if (userCart?.totalAmount === 0) {
			throw new Error("Cart is empty");
		}
		//создает заказ
		const order = await prisma.order.create({
			data: {
				token: cartToken,
				fullName: data.firstName + " " + data.lastName,
				email: data.email,
				phone: data.phone,
				address: data.address,
				comment: data.comment || "",
				totalAmount: userCart.totalAmount,
				status: OrderStatus.PENDING,
				items: JSON.stringify(userCart.items),
			},
		});

		//очищает итоговую стоимость
		await prisma.cart.update({
			where: {
				id: userCart.id,
			},
			data: {
				totalAmount: 0,
			},
		});

		//удаляет все продукты из корзиры
		await prisma.cartItem.deleteMany({
			where: {
				cartId: userCart.id,
			},
		});

		// TODO: сделать создание ссылки оплаты

		//

		await sendEmail(
			data.email,
			"Оплатите заказ # " + order.id,
			PayOrderTemplate({
				orderId: order.id,
				totalAmount: order.totalAmount,
				paymentUrl: "https://resend.com/docs/send-with-nextjs",
			})
		);
	} catch (error) {
		console.log('[CreateOrder] Server erroor: ', error);
	}
}
