import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
	query?: string;
	sortBy?: string;
	sizes?: string;
	pizzaTypes?: string;
	ingredients?: string;
	priceFrom?: string;
	priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findPizzas = async (params: GetSearchParams) => {
	const sizesArray = params.sizes?.split(",").map(Number);
	const pizzaTypesArray = params.pizzaTypes?.split(",").map(Number);
	const ingredientsArray = params.ingredients?.split(",").map(Number);

	const minPrice = Number(params.priceFrom ?? DEFAULT_MIN_PRICE);
	const maxPrice = Number(params.priceTo ?? DEFAULT_MAX_PRICE);

	const categories = await prisma.category.findMany({
		include: {
			products: {
				orderBy: { id: "desc" },
				where: {
					ingredients: ingredientsArray
						? { some: { id: { in: ingredientsArray } } }
						: undefined,
					items: {
						some: {
							size: { in: sizesArray },
							pizzaType: { in: pizzaTypesArray },
							price: {
								gte: minPrice,
								lte: maxPrice,
							},
						},
					},
				},
				include: {
					items: {
						where: {
							price: {
								gte: minPrice,
								lte: maxPrice,
							},
						},
						orderBy: {
							price: "asc",
						},
					},
					ingredients: true,
				},
			},
		},
	});

	return categories;
};
