import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { findOrCreateCart } from "@/shared/lib/findOrCreateCart";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";
import { updateCartTotalAmount } from "@/shared/lib/updateCartTotalAmount";

export async function GET(req: NextRequest) {
	try {
		const token = req.cookies.get("cartToken")?.value;

		if (!token) {
			console.log("no token");
			return NextResponse.json({ totalAmount: 0, items: [] });
		}

		const userCart = await prisma.cart.findFirst({
			where: {
				OR: [{ token }],
			},
			include: {
				items: {
					orderBy: {
						createdAt: "desc",
					},
					include: {
						productItem: {
							include: {
								product: true,
							},
						},
						ingredients: true,
					},
				},
			},
		});

		return NextResponse.json(userCart);
	} catch (error) {
		console.log(error);
	}
}

export async function POST(req: NextRequest) {
	try {
		let token = req.cookies.get("cartToken")?.value;
		if (!token) {
			token = crypto.randomUUID();
		}

		const userCart = await findOrCreateCart(token);

		const data = (await req.json()) as CreateCartItemValues;
		console.log("route", data);

		const findCartItem = await prisma.cartItem.findFirst({
			where: {
				cartId: userCart.id,
				productItemId: data.productItemId,
				ingredients: data?.ingredients && data.ingredients.length
					? { every: { id: { in: data.ingredients } } }
					: undefined,
			},
		});

		if (findCartItem) {
			await prisma.cartItem.update({
				where: {
					id: findCartItem.id,
				},
				data: {
					quantity: findCartItem.quantity + 1,
				},
			});
		} else {
			await prisma.cartItem.create({
				data: {
					cartId: userCart.id,
					productItemId: data.productItemId,
					quantity: 1,
					ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
				},
			});
		}

		const updatedUserCart = await updateCartTotalAmount(token);

		const resp = NextResponse.json(updatedUserCart);
		resp.cookies.set("cartToken", token);
		return resp;
	} catch (error) {
		console.log("[CART POST]", error);
	}
}
